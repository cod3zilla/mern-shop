import React,{useEffect, useState} from 'react'
import {Row, Col, NavLink, ListGroup, Image, Card} from 'react-bootstrap'
import { PayPalButton } from "react-paypal-button-v2"
import {Link} from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderAction'
import {ORDER_PAY_RESET} from '../constants/orderConstant'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import Loading from '../components/Loading'
import Message from '../components/Message'


const OrderPage = ({match}) => {
    
    const [sdkReady, setSdkReady]=useState(false)
    const orderId=match.params.id
    const dispatch = useDispatch()
    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,loading, error}=orderDetails    
    
    const orderPay=useSelector(state=>state.orderPay)
    const {loading:loadingPay, success:successPay}=orderPay   

    useEffect(()=>{
    const addPaypalScript= async ()=>{
        const { data:clientId } = await axios.get('/config/paypal')
        
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true;
      script.onload = () => {
        setSdkReady(true)
        
      };
      document.body.appendChild(script);    
    }
    if(!order||successPay){
        dispatch(getOrderDetails(orderId))
        dispatch({type:ORDER_PAY_RESET})
    }else if(!order.isPaid){
        if(!window.paypal){
            addPaypalScript()
        }else{
            setSdkReady(true)
        }
    }    
},[dispatch,orderId, order, successPay, loadingPay])

const handlePaymentSuccess=(PaymentResult)=>{
    
    dispatch(payOrder(orderId, PaymentResult))
}    
    return loading? <Loading/> 
    :error?<Message variant="danger" message={error} />: (
        <>
          <h2>Order: {order._id}</h2>  
          <Row>
              <Col md={8}>
              <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2> 
                            <p><strong>{order.user.name}</strong></p> 
                            <p><strong>{order.user.email}</strong></p>                        
                            <p><strong>Adress: </strong>
                            {order.shippingAdress.adress}, {order.shippingAdress.city},  {order.shippingAdress.postalcode},  {order.shippingAdress.country}</p>
                            {order.isDelivered? (<Message variant="success" message={order.paidAt} />) : ( <Message variant="danger" message="Not Delivered" /> )}
                    </ListGroup.Item>            
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                            <p><strong>{order.paymentMethod}</strong></p>
                            {order.isPaid? (<Message variant="success" message={order.paidAt} />) : ( <Message variant="danger" message="Not Paid" /> )}
                    </ListGroup.Item>
                </ListGroup>
                    <ListGroup variant="flush">
                        <ListGroup.Item><h2>Order Items</h2></ListGroup.Item>
                         {order.orderItems.length===0 
                        ?(<h3>your Order list is empty!</h3>)
                        :(<ListGroup.Item>
                            {order.orderItems.map((item,index)=>(
                          <ListGroup.Item key={index}>
                              <Row>
                                  <Col md={1}>
                                      <Image src={item.image} alt={item.title} fluid/>
                                  </Col>
                                  <Col>
                                    <NavLink as={Link} to={`/products/product/${item.product}`}>{item.title}</NavLink>
                                  </Col>                                 
                                </Row>
                            </ListGroup.Item>  
                        ))}
                        </ListGroup.Item>)}
                        
                    </ListGroup>
              </Col>
              <Col md={4}>
              <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>$ {order.itemPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>$ {order.shippingPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Tax</Col>
                                <Col>$ {order.taxPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total</Col>
                                <Col>$ {order.totalPrice}</Col>
                                
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        {error&&<Message variant="danger" message={error}/>}
                        </ListGroup.Item>                        
                    </ListGroup>
                    </Card>
                    {/* <ListGroup.Item>
                    <PayPalButton 
                        amount={order.totalPrice}
                        onSuccess={handlePaymentSuccess}
                        />
                    </ListGroup.Item> */}
                
                {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loading />}
                  {!sdkReady ? (
                    <Loading />
                  ) : (
                    <PayPalButton
                      amount={Number(order.totalPrice)}                      
                      onSuccess={handlePaymentSuccess}
                    ></PayPalButton>
                  )}
                </ListGroup.Item>
              )}
                    
                </Col>
          </Row>
        </>
    )
}

export default OrderPage

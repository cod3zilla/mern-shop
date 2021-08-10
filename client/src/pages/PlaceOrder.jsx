import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {createOrders} from '../actions/orderAction'
import {Row, Col, Button,ListGroup,Image,Card} from 'react-bootstrap'

const PlaceOrder = ({history}) => {

    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cart)      
    const {adress,city,postalcode,country}=cart.shippingAdress

    const createOrder=useSelector(state=>state.createOrder)
    const {order, success, error}=createOrder
    //function for decimal
    const addDecimal=(num)=>{
        return (Math.round(num * 100 / 100).toFixed(2))
    }
     //calculation logic for the Order summary
    cart.itemPrice=addDecimal(cart.cartItems.reduce((acc,item)=> acc + Number(item.price )* Number(item.qty),0)) 
    cart.shippingPrice=addDecimal(cart.cartItems >100 ? 0 : 5)
    cart.taxPrice=addDecimal(0.15 * cart.itemPrice)
    cart.totalPrice=addDecimal(Number(cart.itemPrice)+Number(cart.shippingPrice)+ Number(cart.taxPrice))
    

    function handleClick(){
        dispatch( createOrders({
            orderItems:cart.cartItems,
            shippingAdress:cart.shippingAdress,
            paymentMethod:cart.paymentMethod,
            itemPrice:cart.itemPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice
        }))
        if(success){
            history.push(`/order/${order._id}`)
        }
    }
    useEffect(()=>{
        if(success){
            history.push(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    },[history,success])
    
    return (
        <>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                        <h2>Shipping</h2>
                            <p><strong>Adress</strong>
                            {adress}, {city},  {postalcode},  {country}</p>
                        </ListGroup.Item>            
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                            <p><strong>{cart.paymentMethod}</strong></p>
                    </ListGroup.Item>
                    </ListGroup>
                    <ListGroup variant="flush">
                        <ListGroup.Item><h2>Order Items</h2></ListGroup.Item>
                        {cart.cartItems.length===0 
                        ?(<h3>your Order list is empty!</h3>)
                        :(<ListGroup.Item>
                            {cart.cartItems.map((item,index)=>(
                          <ListGroup.Item key={index}>
                              <Row>
                                  <Col md={1}>
                                      <Image src={item.image} alt={item.title} fluid/>
                                  </Col>
                                  <Col>
                                  <Link to={`/products/product/${item.product}`}>{item.title}</Link>
                                  </Col>
                                  <Col md={4}>
                                      {item.qty} X $ {item.price} = $ {item.qty * item.price}
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
                                <Col>$ {cart.itemPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>$ {cart.shippingPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Tax</Col>
                                <Col>$ {cart.taxPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total</Col>
                                <Col>$ {cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        {error&&<h5>{error}</h5>}
                        </ListGroup.Item>
                        <Button 
                        variant="success"
                        type="button"
                        onClick={handleClick}
                        disabled={cart.cartItems===0}
                        >Checkout</Button>
                    </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrder

import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,Form,Button,Card,Image,ListGroup,ListGroupItem,NavLink} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { addToCart,removeFromCart } from '../actions/cartAction'


const Cart = ({match,location,history}) => {
    const productId=match.params.id
    const qty=location.search? Number(location.search.split("=")[1]) :1;
    
    const dispatch=useDispatch()
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,qty,productId])

    const cart=useSelector((state)=>state.cart)
    const {cartItems}=cart
    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id))
    }
    const handleCheckout=()=>{
        history.push('/login?redirect=shipping')
    }
    
    return (
        <>
          <Row>
              <Col md={8} >
                  <h2>Shopping Cart</h2>
                  {cartItems.length===0?<h5>your cart is empty!! <NavLink as={Link} to="/">Go back</NavLink>
                  
                  </h5>:(
                    <ListGroup variant="flush">
                        {cartItems.map((item,index)=>(
                            <Row key={index}>
                            <Col md={2} >
                                <Image src={item.image}fluid rounded/>
                            </Col>
                            <Col md={3}><Link to={`/product/${item.product}`}>{item.title}</Link></Col>
                            <Col md={2}>{item.price}</Col>
                            <Col md={2}><Form.Control
                                    as="select"
                                    value={item.qty}
                                    onChange={(e)=>dispatch(addToCart(item.product, Number(e.target.value)))}
                                    >
                                        {[...Array(item.countInStock).keys()].map((num)=>(
                                            <option
                                            style={{color:'black'}} 
                                            key={num+1}
                                            value={num+1}
                                            >
                                                {num+1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                <Button type="button" onClick={()=>removeFromCartHandler(item.product)}><i className="fas fa-trash"></i></Button>
                                </Col>
                        </Row>
                        ))
                      }
                          
                    </ListGroup>
                  )}
                </Col> 
                <Col md={4} className="mt-4">
                <Card>
                <ListGroup variant="flush">
                <ListGroupItem>
                    <h2>Subtotal ( {cartItems.reduce((acc,item)=> acc + item.qty,0)} ) Items </h2></ListGroupItem>
                    <ListGroupItem>$ 
                     {cartItems.reduce((accum, item)=>accum + item.qty * item.price, 0).toFixed(2)}</ListGroupItem>    
                </ListGroup>    
                </Card> 
                <Card>
                
                    
                   
                </Card> 
                <Button type="button"
                onClick={handleCheckout}
                disabled={cartItems.length===0}>Proceed Checkout</Button>     
                </Col>             
            </Row>  
        </>
    )
}

export default Cart

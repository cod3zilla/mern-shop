import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsAction } from '../actions/productsAction'
import { Row,Col,Button,Image,ListGroupItem, Form } from 'react-bootstrap'
import Ratings from '../components/Ratings'
import Loading from '../components/Loading'
import Message from '../components/Message'


const ProductDetails = ({match,history}) => {
    const dispatch=useDispatch()
    const productDetails=useSelector(state=>state.productDetails)
    const {loading,error,product}=productDetails
    useEffect(()=>{
        dispatch(productDetailsAction(match.params.id))
    },[match,dispatch])

    const [qty, setQty]=useState(1)
    function handleAddToCart(){
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            {loading
            ?(<Loading/>)
            :error ?(<Message variant="danger" message={error}/>)
            :(
                <Row>
                    <Col md={6} className="mt-3">
                        <Image style={{width:'75%'}} fluid src={product.image} />
                    </Col>    
                    <Col  md={3}>
                        <ListGroupItem className="my-3 text-light">
                            <h3>{product.title}</h3>
                            <Ratings rating={product.rating}/>                    
                        </ListGroupItem>
                        <ListGroupItem className="text-light">
                                {product.description}
                        </ListGroupItem>
                        <ListGroupItem className="text-light">Price: {product.price} $
                        </ListGroupItem>
                    </Col>    
                    <Col>
                        <ListGroupItem className="my-5 text-light">Status: {product.countInStock} In Stock</ListGroupItem>
                        
                        {product.countInStock > 0 && (
                            <ListGroupItem>
                                <Row>
                                    <Col>QTY</Col>
                                    <Form.Control
                                    as="select"
                                    value={qty}
                                    onChange={(e)=>setQty(Number(e.target.value))}
                                    >
                                        {[...Array(product.countInStock).keys()].map((num)=>(
                                            <option
                                            style={{color:'black'}} 
                                            key={num+1}
                                            value={num+1}
                                            >
                                                {num+1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Row>
                            </ListGroupItem>
                        )}
                        <ListGroupItem>
                            <Button type="button" onClick={handleAddToCart}>Add to Cart</Button>
                        </ListGroupItem>
                    </Col>    
                </Row> 
            )
            }           
            
        </div>
    )
}

export default ProductDetails

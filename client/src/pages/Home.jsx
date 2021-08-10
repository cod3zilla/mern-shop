import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { productsAction } from '../actions/productsAction'
import { Row,Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loading from '../components/Loading'
import Message from '../components/Message'

const Home = () => {
    const dispatch=useDispatch()
    const productList=useSelector(state=>state.productList)
    const {loading,error,products}=productList
    
    useEffect(()=>{
        dispatch(productsAction())
    },[dispatch])
        
    
    return (
        <>
        {loading ?(<Loading/>)
        :error ? (<Message variant="danger" message={error}/>) 
        : (
            <Row>
            {products.map(product =>(
                <Col sm={3} key={product._id}>
                <Product product={product} />
                </Col>
            ))}                          
        </Row>
        )   
    }
          
        </>
    )
}

export default Home

import React,{useState} from 'react'
import {Button,Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {savePaymentMethod} from '../actions/cartAction'

const Payment = ({history}) => {
    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cart)
       
    const [payMethod, setPayMethod]=useState('paypal')
    const {shippingAdress}=cart
    if(!shippingAdress){
        history.push('/shipping')
    }
    
    function handleSubmit(e){
    e.preventDefault()
    dispatch(savePaymentMethod(payMethod))
    history.push('/checkout')
    }
    return (
        <>
           
             
            <h1>Payment Method</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label as="legend">
                    Select a Payment Method  
                    </Form.Label> 
                    <Form.Check 
                    type="checkbox" 
                    label="Paypal"
                    id="paypal"
                    value={payMethod}
                    name="paymethod"                
                    onChange={e=>setPayMethod(e.target.value)}
                    checked /> 
                    
                </Form.Group>
                
                <Button type="submit">Continue</Button>
                
            </Form>   
                         
        </>
    )
}

export default Payment

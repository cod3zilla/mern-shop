import React,{useState} from 'react'
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {saveShippingAdress} from '../actions/cartAction'

const ShippingAdress = ({history}) => {
    const dispatch=useDispatch()
    const [input, setInput]=useState([])
    function handleChange(e){
        setInput({...input,[e.target.name]:e.target.value})
    }   
    
    
    function handleSubmit(e){
        e.preventDefault()
        dispatch(saveShippingAdress(input))
        history.push('/payment')
    }
    return (
        
        <Container>
            <Row>   
                <Col md={3}>
                    
                    <h2>Shipping Adress</h2>
                    {/* {error&&<h2>{error}</h2>}
                    {loading&& <h2>Loading...</h2>} */}
                    
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="adress" >
                    <Form.Label>Adress </Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="sussex road Bridge"
                    name="adress"
                    
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="city" >
                    <Form.Label>City </Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="city"
                    name="city"
                    
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="postalcode" >
                    <Form.Label>Postal-Code </Form.Label>
                    <Form.Control 
                    type="number"
                    placeholder="postalcode"
                    name="postalcode"
                    
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="country" >
                    <Form.Label>Country </Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="country"
                    name="country"
                    
                    onChange={handleChange}
                    required
                    />
                    
                </Form.Group>
                <Button type="submit">Continue</Button>
            </Form>         
        
                    </Col>
                    <Col md={9} className="px-3">
                        <h2>Suggested Products</h2>
                    </Col>
                </Row>
            </Container>
            
        
    )
}

export default ShippingAdress

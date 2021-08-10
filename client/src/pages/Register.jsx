import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import {Form, Row, Col, Button} from 'react-bootstrap'

const Register = ({location, history}) => {
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [confirmPassword, setConfirmPassword]=useState('')
    const [message, setMessage]=useState('')
    const redirect=location.search? location.search.split('=')[1]:'/'
    const dispatch=useDispatch()
    const userReg=useSelector(state=>state.userReg)
    const {loading,error,userInfo}=userReg

    useEffect(()=>{
    if(userInfo){history.push(redirect)}
},[history,userInfo,redirect])

const handleSubmit= (e)=>{
    e.preventDefault()
    if(password!==confirmPassword){
        setMessage('password not matched!')
    }
    dispatch(register(name, email, password))
    }
    
    return (
        <>
        <FormContainer>
            <h2>Register</h2>
            {error&&<h2>{error}</h2>}
            {loading&& <h2>Loading...</h2>}
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" >
                    <Form.Label>Name </Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="your name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="email" >
                    <Form.Label>Email </Form.Label>
                    <Form.Control 
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password" >
                    <Form.Label>Password </Form.Label>
                    <Form.Control 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="confirmpassword" >
                    <Form.Label>Re-enter Password </Form.Label>
                    <Form.Control 
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    {message&&<h5>{message}</h5>}
                </Form.Group>
                <Button type="submit">Register</Button>
            </Form>
            <Row>
                <Col>
               Already Registered User?
                <Link to={redirect? `login?redirect=${redirect}`:'/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
            
        </>
    )
}

export default Register

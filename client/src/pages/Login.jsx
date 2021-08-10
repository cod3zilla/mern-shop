import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import {Form, Row, Col, Button} from 'react-bootstrap'

const Login = ({location, history}) => {
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const redirect=location.search? location.search.split('=')[1]:'/'
    const dispatch=useDispatch()
    const userLog=useSelector(state=>state.userLog)
    const {loading,error,userInfo}=userLog
useEffect(()=>{
    if(userInfo){history.push(redirect)}
},[history,userInfo,redirect])

const handleSubmit= (e)=>{
    e.preventDefault()
    dispatch(login(email, password))
    }
    console.log(password)
    return (
        <>
        <FormContainer>
            <h2>Sign In</h2>
            {error&&<h2>{error}</h2>}
            {loading&& <h2>Loading...</h2>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" >
                    <Form.Label>Email </Form.Label>
                    <Form.Control 
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    ></Form.Control>

                </Form.Group>
                <Form.Group controlId="password" >
                    <Form.Label>Password </Form.Label>
                    <Form.Control 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit">Login</Button>
            </Form>
            <Row>
                <Col>
                New User ?
                <Link to={redirect? `register?redirect=${redirect}`:'/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
            
        </>
    )
}

export default Login

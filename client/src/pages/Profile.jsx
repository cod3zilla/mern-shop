import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserProfile, userUpdateProfile} from '../actions/userAction'
import {Form, Row, Col, Button,Container} from 'react-bootstrap'
import Message from '../components/Message'
import Loading from '../components/Loading'


const Profile = ({history}) => {

    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [confirmPassword, setConfirmPassword]=useState('')
    const [message, setMessage]=useState('')
    // order list
    
    //profile update
    const dispatch=useDispatch()
    const userProfile=useSelector((state)=>state.userProfile)
    const{loading, error, user}=userProfile    
    
    const userLog=useSelector(state=>state.userLog)
    const {userInfo}=userLog

    const userUpdate=useSelector(state=>state.userUpdate)
    const {success}=userUpdate
    console.log(success)
    
    useEffect(()=>{
    if(!userInfo){
        history.push('/login')
    }else{
       if(!user.name){
           dispatch(getUserProfile('profile'))
           setMessage('profile update successful!')
       }else{
           setName(user.name)
           setEmail(user.email)
       }
    }    
},[history,user,userInfo,dispatch])

const handleSubmit= (e)=>{
    e.preventDefault()
    dispatch(userUpdateProfile({id:user._id,name, email, password}))
    }
    return (
        <>
            <Container>
                <Row>
                    <Col md={3}>
                    
                    <h2>Edit Profile</h2>
                    {error&& <Message variant="danger" message={error} />}
                    {loading&& <Loading/>}
                    {success&& <Message variant="success" message={message}/>}
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
                    
                </Form.Group>
                <Button type="submit">Update</Button>
            </Form>         
        
                    </Col>
                    <Col md={9}>
                        <h2>My Orders</h2>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile

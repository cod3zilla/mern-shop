import React from 'react'
import { Navbar,Container,Nav,NavDropdown,NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../actions/userAction'

const Header = () => {
    const userLog=useSelector(state=>state.userLog)
    const {userInfo}=userLog
    const dispatch=useDispatch()
    function handleLogout(){
            dispatch(logout())
    }
    return (
        <>
           <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
            <Container>
                <NavLink as={Link} to="/"><Navbar.Brand>E-shop</Navbar.Brand></NavLink>              
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavLink as={Link} to="/cart">Cart</NavLink>
                <Nav className="mr-auto ml-auto">
                
                {userInfo?(
                    <NavDropdown title={userInfo.name}>                        
                    <NavDropdown.Item> 
                        <NavLink as={Link} to="/profile">Profile</NavLink>                       
                        
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>logout</NavDropdown.Item>
                </NavDropdown>
                ):(
                    <NavLink as={Link} to="/login"><i className="fas fa-user">&nbsp; Signin</i></NavLink>
                )}  
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar> 
        </>
    )
}

export default Header

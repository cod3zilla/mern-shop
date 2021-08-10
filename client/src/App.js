import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './index.css'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ShippingAdress from './pages/ShippingAdress'
import Payment from './pages/Payment'
import PlaceOrder from './pages/PlaceOrder'
import OrderPage from './pages/OrderPage'


function App() {
    
    return (
        <Router>
            <Header/>
            
            <Container>
               <Route path="/" exact component={Home}/>
               <Route path="/register" component={Register}/>
               <Route path="/profile" component={Profile}/>
               <Route path="/login" component={Login}/>
               <Route path="/product/:id" component={ProductDetails}/>
               <Route path="/cart/:id?" component={Cart}/>
               <Route path="/shipping" component={ShippingAdress}/>
               <Route path="/payment" component={Payment}/>
               <Route path="/checkout" component={PlaceOrder}/>
               <Route path="/order/:id" component={OrderPage}/>
            </Container>
                       
            
            <Footer/>
        </Router>
    )
}

export default App

import axios from 'axios'
import {CART_ADD_ITEMS,
    CART_REMOVE_ITEMS,
    CART_SHIPPING_ADDRESS,
    CART_PAYMENT_METHOD
} from '../constants/cartConstant'

export const addToCart=(id, qty)=> async (dispatch, getState)=>{
    const {data}= await axios(`/products/product/${id}`)
    dispatch({
        type:CART_ADD_ITEMS,
        payload:{
            product:data._id,
            title:data.title,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
        }
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart=(id)=>(dispatch, getState)=>{
    dispatch({
        type:CART_REMOVE_ITEMS,
        payload:id
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAdress=(data)=>(dispatch)=>{
    dispatch({
        type:CART_SHIPPING_ADDRESS,
        payload:data
    })
    localStorage.setItem('shippingAdress',JSON.stringify(data))
}

export const savePaymentMethod=(data)=>dispatch=>{
    dispatch({
        type:CART_PAYMENT_METHOD,
        payload:data
    })
    localStorage.setItem('paymentMethod',JSON.stringify(data))
}
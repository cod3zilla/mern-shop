import {
        CART_ADD_ITEMS,
        CART_REMOVE_ITEMS,
        CART_SHIPPING_ADDRESS,
        CART_PAYMENT_METHOD
    } from '../constants/cartConstant'

export const cartReducer=(state={cartItems:[]},action)=>{
    switch (action.type) {
        case CART_ADD_ITEMS:            
             const item=action.payload
             const existItem=state.cartItems.find((p)=>p.product===item.product)
            if(existItem){
                return {
                    ...state,
                    cartItems:state.cartItems.map(p=>p.product===existItem.product?item : p)
                }
                }else{
                return {
                    ...state, cartItems:[...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEMS:
            return {
                ...state,
                cartItems:state.cartItems.filter((p)=>p.product !== action.payload)
            } 
        case CART_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAdress:action.payload
            } 
        case CART_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod:action.payload
            }     
        default:
            return state;
    }
}
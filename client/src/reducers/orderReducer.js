import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILURE,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAILURE,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAILURE,
    ORDER_PAY_RESET,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAILURE,
    MY_ORDER_RESET
} from '../constants/orderConstant'


export const orderReducer=(state={}, action)=>{
    switch (action.type) {
        case ORDER_REQUEST:
            return {loading:true}
        case ORDER_SUCCESS:
            return {
                loading:false,
                success:true,
                order:action.payload
            }    
        case ORDER_FAILURE:
            return {loading:false, error:action.payload}            
                
        default:
            return state;
    }
}

export const orderDetailReducer=(state={orderItems:[],loading:true,shippingAdress:{}}, action)=>{
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:            
            return {               
                ...state,
                loading:true
                }
        case ORDER_DETAIL_SUCCESS:
            return {
                loading:false,
                order:action.payload
            }
        case ORDER_DETAIL_FAILURE:    
            return {
                loading:false,
                error:action.payload
            }
    
        default:
            return state;
    }
}

export const orderPayReducer=(state={}, action)=>{
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading:true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading:false,                
                success:true
            }
        case ORDER_PAY_FAILURE:    
            return {
                loading:false,
                error:action.payload
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state;
    }
}

export const myOrderReducer= (state={myOrder:[]}, action)=>{
    switch (action.type) {
        case MY_ORDER_REQUEST:
            return {loading:true}
        case MY_ORDER_SUCCESS:
            return {
                
                loading:false,
                myOrder:action.payload
            }
        case MY_ORDER_FAILURE:
            return {
                loading:false,
                error:action.payload
            }
        case MY_ORDER_RESET:
            return {
                myOrder:[]
            }
        default:
        return   state;
    }
}
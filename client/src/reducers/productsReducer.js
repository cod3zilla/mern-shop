import {PRODUCTS_FETCH,
        PRODUCTS_SUCCESS,
        PRODUCTS_FAILURE,
        PRODUCT_DETAILS_FETCH,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAILURE
    } from '../constants/productsConst'

export const productsReducer=(state={products:[]},action)=>{
    switch (action.type) {
        case PRODUCTS_FETCH:
            return {loading:true, products:action.payload};
        case PRODUCTS_SUCCESS:
            return {loading:false, products:action.payload};
        case PRODUCTS_FAILURE:
            return {loading:false, error:action.payload}; 
            
        default:
            return state;
    }
}
export const productDetailsReducer=(state={product:{},reviews:[]}, action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_FETCH:
            return {loading:true,product:action.payload}            
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product:action.payload} 
        case PRODUCT_DETAILS_FAILURE:
            return {loading:false,error:action.payload} 
        default:
            return state;
    }
}
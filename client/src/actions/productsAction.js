import axios from 'axios'
import {PRODUCTS_FETCH,
        PRODUCTS_SUCCESS,
        PRODUCTS_FAILURE,
        PRODUCT_DETAILS_FETCH,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAILURE
    } from '../constants/productsConst'

export const productsAction=()=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCTS_FETCH})
        const {data}=await axios.get('/products')
        dispatch({
            type:PRODUCTS_SUCCESS,
            payload:data
        })        
    } catch (error) {
        dispatch({
            type:PRODUCTS_FAILURE,
            payload:error.response && error.response.data
            ? error.response.data.message
            : error.message            
        })
    }
}
export const productDetailsAction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAILS_FETCH})
        const {data}=await axios.get(`/products/product/${id}`)
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})

    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAILURE,
            payload:error.response && error.response.data
            ? error.response.data.message
            :error.message                
        })
    }
}
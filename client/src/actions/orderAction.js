import axios from 'axios'
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
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAILURE,
    } from '../constants/orderConstant'

export const createOrders=(order)=>async (dispatch, getState)=>{
    try {
        dispatch({
            type:ORDER_REQUEST
        })
        const {userLog:{userInfo}}=getState()
        const config= {headers:{
            'Content-Type': 'application/json',
            Authorization:`Bearer ${userInfo.token}`
        }}
        const {data}= await axios.post('/order',order, config)
        dispatch({
            type:ORDER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ORDER_FAILURE,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
        
    }
}

export const getOrderDetails=(id)=>async (dispatch, getState)=>{
    try {
        dispatch({
            type:ORDER_DETAIL_REQUEST,
        })
        const {userLog:{userInfo}}=getState()
        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await axios.get(`/order/${id}`,config)

        dispatch({
            type:ORDER_DETAIL_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ORDER_DETAIL_FAILURE,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}

export const payOrder=(orderId, paymentResult)=>async (dispatch, getState)=>{
    try {
        dispatch({
            type:ORDER_PAY_REQUEST,
        })
        const {userLog:{userInfo}}=getState()
        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await axios.put(`/order/${orderId}/pay`,config)

        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ORDER_PAY_FAILURE,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}

export const getOrderList= ()=>async (dispatch,getState)=>{
    try {
        dispatch({
            type:MY_ORDER_REQUEST,            
        })
        const {userLog:{userInfo}}=getState()
        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await axios.get('order/myorder', config)

        dispatch({
            type:MY_ORDER_SUCCESS,
            myOrderList:data
        })
    } catch (error) {
        dispatch({
            type:MY_ORDER_FAILURE,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
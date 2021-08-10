import axios from 'axios'
import {USER_LOG_REQUEST,
        USER_LOG_SUCCESS,
        USER_LOG_FAILURE,
        USER_LOG_LOGOUT,
        USER_REG_REQUEST,
        USER_REG_SUCCESS,
        USER_REG_FAILURE,
        USER_PROFILE_REQUEST,
        USER_PROFILE_SUCCESS,
        USER_PROFILE_FAILURE,
        USER_UPDATE_REQUEST,
        USER_UPDATE_SUCCESS,
        USER_UPDATE_FAILURE
} from '../constants/userConstant'

export const register=(name, email, password)=> async (dispatch)=>{
    try {
        dispatch({type:USER_REG_REQUEST})
        const {data}=await axios.post('users/create',{name, email, password})

        dispatch({
            type:USER_REG_SUCCESS,
            payload:data
        })

        dispatch({
            type:USER_LOG_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:USER_REG_FAILURE,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        }) 
    }
}

export const login=(email, password)=> async(dispatch)=>{
    try {
        dispatch({type:USER_LOG_REQUEST})
        const config={headers:{'Content-Type':'application/json'}}
        const {data}= await axios.post('/users/login',{email, password},config)
        
        dispatch({
            type:USER_LOG_SUCCESS,
            payload:data
        })
    localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:USER_LOG_FAILURE,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}

export const getUserProfile=(id)=> async (dispatch, getState)=>{
    try {
        dispatch({
            type:USER_PROFILE_REQUEST
        })
        const {userLog:{userInfo}}=getState()
        const config= {headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${userInfo.token}`}}
        const {data}= await axios.get(`/users/profile/`, config)

        dispatch({
            type:USER_PROFILE_SUCCESS,
            payload:data
        })

        
    } catch (error) {
        dispatch({
            type:USER_PROFILE_FAILURE,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}


export const logout=()=>dispatch=>{
    localStorage.removeItem("userInfo")
    dispatch({type:USER_LOG_LOGOUT})
}

export const userUpdateProfile=(user)=> async (dispatch, getState)=>{
    try {
        dispatch({type:USER_UPDATE_REQUEST})
        const {userLog:{userInfo}}=getState()
        const config= {headers:{
            'Content-Type': 'application/json',
            Authorization:`Bearer ${userInfo.token}`
        }}
        const {data}= await axios.put('/users/profile', user, config)
        
        dispatch({
            type:USER_UPDATE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:USER_UPDATE_FAILURE,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
import {
    USER_LOG_REQUEST, 
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

export const userLoginReducer=(state={}, action)=>{
    switch (action.type) {
        case USER_LOG_REQUEST:
            return {loading:true}
        case USER_LOG_SUCCESS:
            return {
                loading:false,
                userInfo:action.payload
            }
        case USER_LOG_FAILURE:
            return {loading:false, error:action.payload}
        case USER_LOG_LOGOUT:
            return {}    
    
        default:
            return state;
    }
}

export const userRegReducer=(state={},action)=>{
    switch (action.type) {
        case USER_REG_REQUEST:
            return {
                loading:true
            }
        case USER_REG_SUCCESS:
            return {
                loading:false,
                userInfo:action.payload
            }
        case USER_REG_FAILURE:    
            return{
                error:action.payload
            }
    
        default:
            return state;
    }
}


export const userProfileReducer=(state={user:{}},action)=>{
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return {
                ...state,
                loading:true
            }
        
        case USER_PROFILE_SUCCESS:
            return {
                loading:false,
                user:action.payload
            }
        case USER_PROFILE_FAILURE:
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}

export const userUpdateReducer=(state={}, action)=>{
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {loading:true}
        case USER_UPDATE_SUCCESS:
            return {
                loading:false,
                success:true,
                userInfo:action.payload
            }    
        case USER_UPDATE_FAILURE:
            return {
                loading:false,
                error:action.payload
            }    
    
        default:
           return state;
    }
}


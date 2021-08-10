import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {productsReducer, productDetailsReducer} from './reducers/productsReducer'
import {userRegReducer, userLoginReducer, userProfileReducer,userUpdateReducer} from './reducers/userReducer'
import {cartReducer} from './reducers/cartReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import {orderReducer,orderDetailReducer,orderPayReducer, myOrderReducer} from './reducers/orderReducer'


const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

const cartItemFromStorage=localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]

const shippingAdressFromStorage=localStorage.getItem('shippingAdress')? JSON.parse(localStorage.getItem('shippingAdress')):{}
const cartPaymentMethodFromStorage=localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')):{}

const reducer=combineReducers({
    productList:productsReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userReg:userRegReducer,
    userLog:userLoginReducer,
    userProfile:userProfileReducer,
    userUpdate:userUpdateReducer,
    createOrder:orderReducer,
    orderDetails:orderDetailReducer,
    orderPay:orderPayReducer,
    myOrderList:myOrderReducer
})
const initialState={
    cart:{
        cartItems:cartItemFromStorage,
        shippingAdress:shippingAdressFromStorage,
        paymentMethod:cartPaymentMethodFromStorage
    },
    //userReg:{userReg:userRegFromStorage},
    userLog:{userInfo:userInfoFromStorage},
}
const middleware=[thunk]
const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store;
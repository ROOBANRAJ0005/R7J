
import { combineReducers, configureStore} from '@reduxjs/toolkit'
import productsReducer from './slices/ProductsSlice'
import productReducer from './slices/ProductSlice'
import authReducer from './slices/AuthSlice'
import cartReducer from './slices/CartSlice'
import orderReducer from './slices/OrderSlice'
import adminReducer from './slices/AdminSlice'
import userReducer from './slices/UserSlice'

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer,
    authState:authReducer,
    cartState: cartReducer,
    orderState: orderReducer,
    adminState: adminReducer,
    userState: userReducer
})

const store = configureStore({
   reducer,
  devTools: true,
     

});
export default store;
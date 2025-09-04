import axios from "axios";
import { createOrderFail, createOrderRequest, createOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess } from "../slices/OrderSlice"
import { orderCompleted } from "../slices/CartSlice";

export const createOrder = (order) => async(dispatch) =>{
    try{
        dispatch(createOrderRequest());
        const { data } = await axios.post(`/api/v1/order/create`,order);
        dispatch(createOrderSuccess(data));
        dispatch(orderCompleted())
    }
    catch(error){
       dispatch(createOrderFail(error.response?.data?.message||error.message));
    }
}

export const userOrder = () => async(dispatch) =>{
    try{
        dispatch(userOrdersRequest());
        const { data } = await axios.get(`/api/v1/order/myorder`);
        dispatch(userOrdersSuccess(data.orders));

    }
    catch(error){
       dispatch(userOrdersFail(error.response?.data?.message||error.message));
    }
}

export const orderDetailAction = (id) => async(dispatch)=>{
    try{
        dispatch(orderDetailRequest());
        const { data } = await axios.get(`/api/v1/order/singleOrder/${id}`);
        console.log(data);
        dispatch(orderDetailSuccess(data));
    }
    catch(error){
        dispatch(orderDetailFail(error.response?.data?.message || error.message));
    }
}

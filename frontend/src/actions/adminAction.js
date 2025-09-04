import axios from "axios";
import { 
        adminOrdersFail, 
        adminOrdersRequest, 
        adminOrdersSuccess, 
        adminProductsFail, 
        adminProductsRequest, 
        adminProductsSuccess, 
        deleteAdminOrderFail, 
        deleteAdminOrderRequest, 
        deleteAdminOrderSuccess, 
        deleteProductFail, 
        deleteProductRequest, 
        deleteProductSuccess, 
        deleteReviewFail, 
        deleteReviewRequest, 
        deleteReviewSuccess, 
        getAdminProductFail, 
        getAdminProductRequest, 
        getAdminProductSuccess, 
        getAdminSingleOrderFail, 
        getAdminSingleOrderRequest, 
        getAdminSingleOrderSuccess, 
        newProductFail, 
        newProductRequest, 
        newProductSuccess,
        reviewsFail,
        reviewsRequest,
        reviewsSuccess,
        updateAdminOrderFail,
        updateAdminOrderRequest,
        updateAdminOrderSuccess,
        updateProductFail,
        updateProductRequest,
        updateProductSuccess
     } from "../slices/AdminSlice"
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, usersFail, usersRequest, usersSuccess, userSuccess } from "../slices/UserSlice";

export const getAdminProducts = ()=> async(dispatch) =>{
    try{
        dispatch(adminProductsRequest());
        const { data } = await axios.get('/api/v1/admin/products');
        dispatch(adminProductsSuccess(data));
    }
    catch(error){
        dispatch(adminProductsFail(error.response?.data?.message || error.message));
    }
}

export const adminOrdersAction = () => async(dispatch) => {
    try {
       dispatch(adminOrdersRequest())
       const {data} = await axios.get(`/api/v1/admin/orders`)
       dispatch(adminOrdersSuccess(data))
    } catch (error) {
        dispatch(adminOrdersFail(error.response?.data?.message || error.message))
    }
}



export const getUsers = () => async(dispatch)=>{
    try{
        dispatch(usersRequest());
        const { data } = await axios.get('/api/v1/admin/users');
        dispatch(usersSuccess(data.users));
    }
    catch(error){
        dispatch(usersFail(error.response?.data?.message || error.message));
    }
}

export const createNewProduct = (productData) =>async(dispatch)=>{
    try{
        dispatch(newProductRequest());
        const { data } = await axios.post(`/api/v1/admin/products/new`,productData);
        dispatch(newProductSuccess(data));
    }
    catch(error){
        dispatch(newProductFail(error.response?.data?.message || error.message));
    }
}

export const deleteProduct = (id) =>async(dispatch)=>{
    try{
       dispatch(deleteProductRequest());
       await axios.delete(`/api/v1/admin/product/${id}`);
       dispatch(deleteProductSuccess());
    }
    catch(error){
        dispatch(deleteProductFail(error.response?.data?.message || error.message));
    }
}

export const updateProduct = (productId,formData) => async(dispatch) =>{
    try{
        dispatch(updateProductRequest());
        const { data } = await axios.put(`/api/v1/admin/product/${productId}`,formData);
        dispatch(updateProductSuccess(data));
    }
    catch(error){
        dispatch(updateProductFail(error.response?.data?.message || error.message));
    }
}

export const getAdminProduct = (id) => async(dispatch) => {
     try{
            dispatch(getAdminProductRequest());
            const {data} = await axios.get(`/api/v1/admin/product/${id}`);
            dispatch(getAdminProductSuccess(data.product));
     }
     catch(error){
            dispatch(getAdminProductFail(error.response?.data?.message||error.message));
     }
}


export const deleteAdminOrder = (id) => async(dispatch)=>{
    try{
        dispatch(deleteAdminOrderRequest());
        await axios.delete(`/api/v1/admin/deleteOrder/${id}`);
        dispatch(deleteAdminOrderSuccess());
    }
    catch(error){
        dispatch(deleteAdminOrderFail(error.response?.data?.message || error.message));
    }
}

export const UpdateAdminOrder = (id,orderData) => async(dispatch)=>{
    try{
        dispatch(updateAdminOrderRequest());
        await axios.put(`/api/v1/admin/updateOrder/${id}`,orderData);
        dispatch(updateAdminOrderSuccess());
    }
    catch(error){
        dispatch(updateAdminOrderFail(error.response?.data?.message || error.message));
    }
}

export const getAdminOrder = (id) => async(dispatch) => {
     try{
            dispatch(getAdminSingleOrderRequest());
            const {data} = await axios.get(`/api/v1/admin/order/${id}`);
            dispatch(getAdminSingleOrderSuccess(data));
     }
     catch(error){
            dispatch(getAdminSingleOrderFail(error.response?.data?.message||error.message));
     }
}

export const getUser = (id) => async(dispatch)=>{
    try{
        dispatch(userRequest());
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data));
    }
    catch(error){
        dispatch(userFail(error.response?.data?.message || error.message));
    }
}

export const updateUser = (id,formData) => async(dispatch)=>{
    try{
        dispatch(updateUserRequest());
        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }
        await axios.put(`/api/v1/admin/update/user/${id}`,formData,config);
        dispatch(updateUserSuccess());
    }
    catch(error){
        dispatch(updateUserFail(error.response?.data?.message || error.message));
    }
}

export const deleteUser = (id) => async(dispatch)=>{
    try{
        dispatch(deleteUserRequest());
        await axios.delete(`/api/v1/admin/delete/user/${id}`);
        dispatch(deleteUserSuccess());
    }
    catch(error){
        dispatch(deleteUserFail(error.response?.data?.message || error.message));
    }
}

export const getReviews =  id => async (dispatch) => {

    try {  
        dispatch(reviewsRequest()) 
        const { data }  =  await axios.get(`/api/v1/admin/reviews`,{params: {id}});
        dispatch(reviewsSuccess(data))
        console.log('reviews',data)
    } catch (error) {
        //handle error
        dispatch(reviewsFail(error.response.data.message))
    }
    
}

export const deleteReview =  (productId, id) => async (dispatch) => {

    try {  
        dispatch(deleteReviewRequest()) 
        await axios.delete(`/api/v1/admin/delete/review`,{params: {productId, id}});
        dispatch(deleteReviewSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteReviewFail(error.response.data.message))
    }
    
}







import axios from "axios";
import { productFailed, productRequest, productSuccess, createReviewRequest, createReviewSuccess, createReviewFail } from "../slices/ProductSlice"


export const getProductDetails = id=> async(dispatch) => {
     try{
            dispatch(productRequest());
            const {data} = await axios.get(`/api/v1/product/${id}`);
            dispatch(productSuccess(data.product));
     }
     catch(error){
            dispatch(productFailed(error.response?.data?.message||error.message));
     }
}
export const createReviews = (formData) => async(dispatch)=>{
       try{
              dispatch(createReviewRequest());
              const config ={
                     headers:{
                            'Content-type':'application/json'
                     }
              }

              const { data } = await axios.post(`/api/v1/product/create/review`,formData,config);
              dispatch(createReviewSuccess(data));
              
       }
       catch(error){
               dispatch(createReviewFail(error.response?.data?.message||error.message));
       }
}

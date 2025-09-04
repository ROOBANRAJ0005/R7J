import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],  // Initialize products as empty array
        loading: false,
        error: null,
        isReviewSubmitted: false
    },
    reducers: {
        productRequest(state, action) {
            return {
                ...state,  // Spread the existing state
                loading: true,
                error: null  // Clear any previous errors
            }
        },
        productSuccess(state, action) {
            return {
                ...state,  // Spread the existing state
                loading: false,
                product: action.payload,
                error: null  // Clear any previous errors
            }    
        },
        productFailed(state, action) {
            return {
                ...state,  // Spread the existing state
                loading: false,
                error: action.payload
            }
        },
        createReviewRequest(state,action){
            return{
                ...state,
                loading: true,
                isReviewSubmitted:false
            }
        },
        createReviewSuccess(state, action){
            return {
                ...state,
                loading: false,
                isReviewSubmitted: true,
            }
        },
        createReviewFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
            }
        },
        clearErrorProduct(state, action) {
           return{ ...state,
            error: null
           }
        },
         clearProduct(state, action) {
            return{ ...state,
                product : {}
            }
        },
    }
});

const {actions,reducer} = productSlice;

 export const {
     productRequest,
     productSuccess,
     productFailed,
     createReviewRequest,
     createReviewSuccess,
     createReviewFail,
     clearReviewSubmitted,
     clearErrorProduct,
     clearProduct
} = actions;
 export default reducer;

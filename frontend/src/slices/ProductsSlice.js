import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],  // Initialize products as empty array
        loading: false,
        error: null
    },
    reducers: {
        productsRequest(state, action) {
            return {
                ...state,  // Spread the existing state
                loading: true,
                error: null  // Clear any previous errors
            }
        },
       productsSuccess(state, action) {
        return {
            ...state,
            loading: false,
            products: action.payload.products,              // <-- only products array here
            productsCount: action.payload.productsCount,    // <-- add these
            resPerPage: action.payload.resPerPage,
            filteredProductsCount: action.payload.filteredProductsCount,
            error: null
             };
        }
,
        productsFailed(state, action) {
            return {
                ...state,  // Spread the existing state
                loading: false,
                error: action.payload
            }
        }
    }
});

const {actions,reducer} = productsSlice;

 export const {productsRequest,productsSuccess,productsFailed} = actions;
 export default reducer;

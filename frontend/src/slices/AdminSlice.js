import { createSlice } from "@reduxjs/toolkit"

const adminSlice = createSlice({
    name: 'admin',
    initialState:{
        products:[],
        loading:false,
        error: null,
        adminOrders:[],
        isProductCreated: false,
        isProductDeleted: false,
        isProductUpdated: false,
        orders: [],
        isOrderDeleted: false,
        order: {},
        isReviewDeleted: false,
        reviews : []
    }, 
    reducers:{
        adminProductsRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        adminProductsSuccess(state, action){
            return {
                loading: false,
                products: action.payload.products
            }
        },
        adminProductsFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        clearErrorAdmin(state, action){
            return {
                ...state,
                error:  null
            }
        },
        adminOrdersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        adminOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminOrders: action.payload.orders
            }
        },
        adminOrdersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        newProductRequest(state,action){
            return{
                loading: true,
            isProductCreated : false  
            }    
        },
        newProductSuccess(state,action){
            return{
                loading: false,
                isProductCreated: true,
                product: action.payload
            }
        },
        newProductFail(state,action){
            return{
                loading: false,
                error: action.payload,
                isProductCreated: false,
            }
        },
        clearProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false
            }
        },
        deleteProductRequest(state,action){
            return{
                ...state,
                loading: true,
                isProductDeleted: false
            }
        },
        deleteProductSuccess(state,action){
            return{
                ...state,
                loading:false,
                isProductDeleted: true,
            }
        },
        deleteProductFail(state,action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        },
        clearProductDeleted(state,action){
            return{
                isProductDeleted: false
            }
        },
           updateProductRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        updateProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated: true
            }
        },
        updateProductFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
            }
        },
        clearProductUpdated(state, action) {
            return {
                ...state,
                isProductUpdated: false
            }
        },

        getAdminProductRequest(state,action){
            return{
                ...state,
                loading: true
            }
        },
        getAdminProductSuccess(state,action){
            return{
                ...state,
                loading: false,
                product: action.payload
            }
        },
        getAdminProductFail(state,action){
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteAdminOrderRequest(state,action){
            return{
                ...state,
                loading: true,
                isOrderDeleted: false
            }
        },
         deleteAdminOrderSuccess(state,action){
            return{
                ...state,
                loading: false,
                isOrderDeleted: true
            }
        },
        deleteAdminOrderFail(state,action){
            return{
                ...state,
                loading: false,
                error: action.payload,
                isOrderDeleted: false
            }
        },
        clearAdminDeleteOrder(state,action){
            return{
                isOrderDeleted: false
            }
        },
        updateAdminOrderRequest(state,action){
            return{
                ...state,
                loading: true,
                isOrderUpdated: false,
            }
        },
        updateAdminOrderSuccess(state,action){
            return{
                ...state,
                loading: false,
                isOrderUpdated: true,

            }
        },
        updateAdminOrderFail(state,action){
            return{
                ...state,
                loading: false,
                isOrderUpdated: false,
                error: action.payload
            }
        },
        clearAdminUpdateOrder(state,action){
            return{
                isOrderUpdated: false,
            }
        },
        getAdminSingleOrderRequest(state,action){
            return{
                ...state,
                loading: true
            }
        },
        getAdminSingleOrderSuccess(state,action){
            return{
                ...state,
                loading: false,
                order: action.payload.order
            }
        },
        getAdminSingleOrderFail(state,action){
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        },
         reviewsRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        reviewsSuccess(state, action){
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews
            }
        },
        reviewsFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        deleteReviewRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteReviewSuccess(state, action){
            return {
                ...state,
                loading: false,
                isReviewDeleted: true
            }
        },
        deleteReviewFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
            }
        },
        clearReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false
            }
        },

        
    }
});



const {actions,reducer} = adminSlice;

export const {
    adminProductsRequest,
    adminProductsSuccess,
    adminProductsFail,
    clearErrorAdmin,
    adminOrdersRequest,
    adminOrdersSuccess,
    adminOrdersFail,
    newProductRequest,
    newProductSuccess,
    newProductFail,
    clearProductCreated,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    clearProductDeleted,
    updateProductRequest,
    updateProductSuccess,
    updateProductFail,
    clearProductUpdated,
    getAdminProductRequest,
    getAdminProductSuccess,
    getAdminProductFail,
    getAdminOrderRequest,
    getAdminOrderSuccess,
    getAdminOrderFail,
    deleteAdminOrderSuccess,
    deleteAdminOrderRequest,
    deleteAdminOrderFail,
    updateAdminOrderRequest,
    updateAdminOrderSuccess,
    updateAdminOrderFail,
    clearAdminDeleteOrder,
    clearAdminUpdateOrder,
    getAdminSingleOrderRequest,
    getAdminSingleOrderSuccess,
    getAdminSingleOrderFail,
    reviewsRequest,
    reviewsSuccess,
    reviewsFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail,
    clearReviewDeleted

} = actions;

export default reducer;
    
        




      
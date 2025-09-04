import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'users',
    initialState:{
        users:[],
        user:{},
        isUserUpdated: false,
        isUserDeleted: false,
        loading:false,
        error: null
    },

    reducers: {
            usersRequest(state, action){
                return {
                    ...state,
                    loading: true
                }
            },
            usersSuccess(state, action){
                return {
                    ...state,
                    loading: false,
                    users: action.payload
                }
            },
            usersFail(state, action){
                return {
                    ...state,
                    loading: false,
                    error:  action.payload
                }
            },
            userRequest(state, action){
                return {
                    ...state,
                    loading: true
                }
            },
            userSuccess(state, action){
                return {
                    ...state,
                    loading: false,
                    user: action.payload.user
                }
            },
            userFail(state, action){
                return {
                    ...state,
                    loading: false,
                    error:  action.payload
                }
            },
            updateUserRequest(state, action){
                return {
                    ...state,
                    loading: true,
                    isUserUpdated: false
                }
            },
            updateUserSuccess(state, action){
                return {
                    ...state,
                    loading: false,
                    isUserUpdated: true
                }
            },
             updateUserFail(state, action){
                return {
                    ...state,
                    loading: false,
                    error:  action.payload,
                    isUserUpdated: false
                }
            },
            clearUpdateUser(state,action){
                return{
                    ...state,
                    isUserUpdated: false
                }
            },
            deleteUserRequest(state, action){
                return {
                    ...state,
                    loading: true,
                    isUserDeleted: false
                }
            },
            deleteUserSuccess(state, action){
                return {
                    ...state,
                    loading: false,
                    isUserDeleted: true
                }
            },
             deleteUserFail(state, action){
                return {
                    ...state,
                    loading: false,
                    error:  action.payload,
                    isUserDeleted: false
                }
            },
            clearDeleteUser(state,action){
                return{
                    isUserDeleted: false
                }
            },
            clearUserError(state,action){
                return{
                    error: null
                }
            }
            
            
    }
    });

    const {actions, reducer} = userSlice;

    export const {
        usersRequest,
        usersSuccess,
        usersFail,
        userRequest,
        userSuccess,
        userFail,
        updateUserRequest,
        updateUserSuccess,
        updateUserFail,
        deleteUserRequest,
        deleteUserSuccess,
        deleteUserFail,
        clearUpdateUser,
        clearDeleteUser,
        clearUserError
    } = actions

    export default reducer;
import { 
      loginFailed,
      loginRequest,
      loginSuccess, 
      registerFailed, 
      registerSuccess,
      clearAuthAction,
      registerRequest, 
      loadUserRequest, 
      loadUserSuccess,
      loadUserFailed,
      logoutUserSuccess,
      logoutUserFailed,
      updateProfileRequest,
      updateProfileSuccess,
      updateProfileFailed,
      clearUpdateProfileAction,
      updatePasswordRequest,
      updatePasswordSuccess,
      updatePasswordFail,
      forgotPasswordSuccess,
      forgotPasswordFail,
      forgotPasswordRequest,
      resetPasswordRequest,
      resetPasswordSuccess,
      resetPasswordFail
    } from "../slices/AuthSlice"
import axios from 'axios'

export const login = (email,password) => async(dispatch)=>{
    try{
        dispatch(loginRequest());
        const { data } = await axios.post(`/api/v1/login`,{email,password});
        dispatch(loginSuccess({
            user: data.user
        }));
    }
    catch(error){
        dispatch(loginFailed(error.response?.data?.message || "loginfailed"));
    }
    
}

export const clearAuthError = () => async(dispatch) => {
    dispatch(clearAuthAction())
}

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.post(`/api/v1/register`,userData, config);
        dispatch(registerSuccess(data.user))
    } catch (error) {
        const errorMessage =error?.response?.data?.message ||
                             error?.message ||
                            "Something went wrong during registration";
                            
      dispatch(registerFailed(errorMessage));
    }

}

export const loadUser = ()=> async(dispatch)=>{
    try{
         dispatch(loadUserRequest());
         const { data } = await axios.get('/api/v1/myprofile');
         dispatch(loadUserSuccess(data.user))

    }
    catch(error){
         const errorMessage =error?.response?.data?.message ||
                             error?.message ||
                            "Something went wrong during load user";
                            
          dispatch(loadUserFailed(errorMessage));
    }
}

export const logoutUser = ()=>async(dispatch)=>{
    try{
        await axios.get(`/api/v1/logout`)
        dispatch(logoutUserSuccess());
    }
    catch(error){
         const errorMessage =error?.response?.data?.message ||
                             error?.message ||
                            "Something went wrong during logout user";
                            
      dispatch(logoutUserFailed(errorMessage));
    }
}

export const updateProfile = (formData) => async(dispatch)=>{
    try{
        dispatch(updateProfileRequest());
        const config = {
            headers:{
                "Content-type" : "multipart/form-data",
            }
        };
        const { data } = await axios.put(`/api/v1/update`,formData,config);
        dispatch(updateProfileSuccess(data));
    }
    catch(error){
         const errorMessage =error?.response?.data?.message ||
                             error?.message ||
                            "Something went wrong during update profile";
        dispatch(updateProfileFailed(errorMessage));
    }
}

export const clearUpdateProfile = () => async(dispatch) => {
    dispatch(clearUpdateProfileAction())
}

export const updatePassword = (formData)=> async(dispatch)=>{
    try{
        dispatch(updatePasswordRequest());
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        await axios.put(`/api/v1/changepassword`,formData,config);
        dispatch(updatePasswordSuccess()); 
    }
    catch(error){
        const errorMessage =error?.response?.data?.message ||
                             error?.message ||
                            "Something went wrong during update profile";
        dispatch(updatePasswordFail(errorMessage));
    }
}

export const forgotPassword = (formData)=> async(dispatch)=>{
    try{
        dispatch(forgotPasswordRequest());
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        await axios.post(`/api/v1/forgot/password`,formData,config);
        dispatch(forgotPasswordSuccess());
    }
    catch(error){
         const errorMessage =error?.response?.data?.message ||
                             error?.message ||
                            "Something went wrong during update profile";
        
        dispatch(forgotPasswordFail(errorMessage));
    }
}

export const resetPassword = (formData,token)=> async(dispatch)=>{
    try{
        dispatch(resetPasswordRequest());
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        await axios.post(`/api/v1/reset/password/${token}`,formData,config);
        dispatch(resetPasswordSuccess());
    }
    catch(error){
         const errorMessage =error?.response?.data?.message ||
                             error?.message ||
                            "Something went wrong during update profile";
        
        dispatch(resetPasswordFail(errorMessage));
    }
}
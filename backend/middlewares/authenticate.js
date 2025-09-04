const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
   
    const {token} = req.cookies; // error cookie

    if(!token){
       return  next(new ErrorHandler('Login first to handle the resourcess',401));
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id);
    
        if (!req.user) {
            return next(new ErrorHandler('User not found', 404));
        }
    
        next();
    }
    catch (error) {
        return next(new ErrorHandler('Invalid or expired token', 401));
    }

   
    
})

exports.authorizedRoles = (...roles) =>{
   return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,401));
        }
        next();
    }
}
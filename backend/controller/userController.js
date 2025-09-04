const catchAsyncError = require('../middlewares/catchAsyncError');
const userModel = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const sendEmail = require('../utils/email')
const crypto = require('crypto');
const { userInfo } = require('os');

// 
exports.registerUser = catchAsyncError(async (req, res, next) => {
  try {
    const { name, password, email } = req.body;
    let avatar;
      let BASE_URL = process.env.BACKEND_URL;

    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    
    if (req.file) {
      avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`;
    }

    const user = await userModel.create({
      name,
      email,
      password,
      avatar
    });

    sendToken(user, 201, res);
  } catch (err) {
    // Handle Mongoose validation errors
    let message = err.message;

    if (err.name === 'ValidationError') {
      message = Object.values(err.errors).map((e) => e.message).join(', ');
    }

    if (err.code === 11000) {
      message = 'Email already exists';
    }

    return res.status(500).json({
      success: false,
      message
    });
  }
});


exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email && !password){
        return next(new ErrorHandler('Please enter your email and password',400)); 
    }

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('invalid username or password',400));
    }

    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('invalid username or password',400));
    }
    sendToken(user,201,res);

})

exports.logout = catchAsyncError((req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now())
    }).status(200)
    .json({
        success:true,
        message:'logged Out'
    })
});

exports.forgot = catchAsyncError(async(req,res,next)=>{
    const user = await userModel.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler('user is not found',404));
    }
    
    const resetToken = await user.getResetToken();
    await user.save({validateBeforeSave:false});

     let BASE_URL = process.env.FRONTEND_URL;
        if(process.env.NODE_ENV === "production"){
            BASE_URL = `${req.protocol}://${req.get('host')}`
        }


    //Create reset url
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

    const message =  `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`;
 
    try{
        sendEmail({
            email:user.email,
            subject:'password recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
    }
    catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(err.message,500));
    }
})

exports.resetPassword = catchAsyncError(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await userModel.findOne({
        resetPasswordToken
    });

    if(!user){
        return next(new ErrorHandler('password reset token is expired or invalid'));
    }

    if(req.body.password !== req.body.password){
        return next(new ErrorHandler('Password does not match, please enter correct confirm password'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave:false});

    sendToken(user,201,res);
});

exports.getUser = catchAsyncError(async(req,res,next)=>{
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})

exports.changePassword = catchAsyncError(async(req,res,next)=>{
    const user = await userModel.findById(req.user.id).select('+password');
    
    if( !await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('Old password is incorrect, please enter a correct password'));
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
        success:true
    })
});

exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    let newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    
    let avatar;
      let BASE_URL = process.env.BACKEND_URL;

    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    
    if (req.file) {
      avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`; 
      newUserData = {...newUserData,avatar};
    }
   
    const user = await userModel.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators:true
    });

    res.status(200).json({
        success:true,
        user
    })
})
// admin 

exports.getAllUser = catchAsyncError(async(req,res,next)=>{
    const users = await userModel.find();

    res.status(200).json({
        success:true,
        users
    })
})

exports.getOneUser = catchAsyncError(async(req,res,next)=>{
    const user = await userModel.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    });
});

exports.updateUser = catchAsyncError(async(req,res,next)=>{
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await userModel.findByIdAndUpdate(req.params.id,newUser,{
        new: true,
        runValidators:true
    });

    res.status(200).json({
        success: true,
        user
    })
})

exports.deleteUser = catchAsyncError(async(req,res,next)=>{
    const user = await userModel.findByIdAndDelete(req.params.id);
    if(!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }
    res.status(200).json({
        success: true
    })
})

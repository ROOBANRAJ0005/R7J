const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const {orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo} = req.body;

        const order = await orderModel.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user.id
        });

        res.status(200).json({
            success:true,
            order
        });
});

exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
    const order =await orderModel.findById(req.params.id).populate('user','name email');


    if(!order){
        return next(new ErrorHandler(`Order not found this order id:${req.params.id}`,404));
    }

    res.status(200).json({
        success:true,
        order
    })
})

exports.myOrders = catchAsyncError(async (req,res,next)=>{

    const orders = await orderModel.find({user: req.user.id});
    res.status(200).json({
        success:true,
        orders
    })
});

// admin 

exports.orders = catchAsyncError(async(req,res,next)=>{
    const orders = await orderModel.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
});

exports.updateOrder = catchAsyncError(async(req,res,next)=>{
    const order = await orderModel.findById(req.params.id);
    
    if(order.orderStatus == 'delivered'){
        return next(new ErrorHandler('Order has be already delivered!',400));
    }

    order.orderItems.forEach(async orderItem=>{
        await updateStock(orderItem.product,orderItem.quantity)
    });

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();
    
    res.status(200).json({
        success:true
    })
})

async function updateStock(productId,quantity){
    const product = await productModel.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave:false});
}

exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await orderModel.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler(`Order is not found this id ${req.params.id}!`,404));
    }

    await order.deleteOne();

    res.status(200).json({
        success:true
    });
});

exports.getAdminOrder = catchAsyncError(async(req,res,next)=>{
    const order =await orderModel.findById(req.params.id).populate('user','name email');


    if(!order){
        return next(new ErrorHandler(`Order not found this order id:${req.params.id}`,404));
    }

    res.status(200).json({
        success:true,
        order
    })
})

const ProductModel = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');

// exports.getProducts = catchAsyncError(async (req, res, next) => {
//     const resPerPage = 4;

//     // Total products (before filter/search)
//     const totalProductsCount = await ProductModel.countDocuments();

//     // Build query with search, filter, sort
//     let apiFeatures = new APIFeatures(ProductModel.find(), req.query)
//         .search()
//         .filter()
//         .sort();

//     // Count filtered products (without pagination)
//     const filteredProductsCount = await ProductModel.countDocuments(
//         apiFeatures.query.getFilter()
//     );

//     // Apply pagination
//     apiFeatures = apiFeatures.paginate(resPerPage);
//     const products = await apiFeatures.query;

//     // ✅ Make sure response is sent only once
//     if (!res.headersSent) {
//         return res.status(200).json({
//             success: true,
//             count: filteredProductsCount,
//             totalProductsCount,
//             resPerPage,
//             products,
//         });
//     }
// });
exports.getProducts = catchAsyncError(async (req, res, next) => {
    const resPerPage = 4;

    // Total products (before filter/search)
    const totalProductsCount = await ProductModel.countDocuments();

    // Build query with search, filter, sort
    let apiFeatures = new APIFeatures(ProductModel.find(), req.query)
        .search()
        .filter()
        .sort();

    // Count filtered products
    const filteredProductsCount = await ProductModel.countDocuments(
        apiFeatures.query.getFilter()
    );

    // Apply pagination
    apiFeatures = apiFeatures.paginate(resPerPage);
    const products = await apiFeatures.query;

    // ✅ Only one response
    res.status(200).json({
        success: true,
        count: filteredProductsCount,
        totalProductsCount,
        resPerPage,
        products,
    });
});

// exports.getProducts = catchAsyncError(async (req, res, next)=>{
//     const resPerPage = 3;
    
//     let buildQuery = () => {
//         return new APIFeatures(ProductModel.find(), req.query).search().filter()
//     }
    
//     const filteredProductsCount = await buildQuery().query.countDocuments({})
//     const totalProductsCount = await ProductModel.countDocuments({});
//     let productsCount = totalProductsCount;

//     if(filteredProductsCount !== totalProductsCount) {
//         productsCount = filteredProductsCount;
//     }
    
//     const products = await buildQuery().paginate(resPerPage).query;

//     res.status(200).json({
//         success : true,
//         count: productsCount,
//         resPerPage,
//         products
//     })
// })



exports.newProduct = catchAsyncError(async(req,res,next) =>{

    let images = []
    let BASE_URL = process.env.BACKEND_URL;

    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    
    if(req.files.length > 0){
        req.files.forEach((file)=>{
            let url = `${BASE_URL}/uploads/product/${file.originalname}`;
            images.push({image: url});
        });
    }
    req.body.images = images;
    req.body.user = req.user.id;

    const newproduct = await ProductModel.create(req.body);
    res.status(201).json({
        success:true,
        newproduct
    })
});

exports.getSingleProduct = catchAsyncError(async(req,res,next) =>{
    const product = await ProductModel.findById(req.params.id);
        if(!product){
           return next(new ErrorHandler('Product is not found',404));
         }
    res.status(200).json({
        success:true,
        product
    })
})

exports.updataProduct = async(req,res,next)=>{
    let product = await ProductModel.findById(req.params.id);

    if(!product){
        next(new ErrorHandler(404,'Product is not found'));
        }

     let images = []
     let BASE_URL = process.env.BACKEND_URL;
     if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    

      //if images not cleared we keep existing images
    if(req.body.imagesCleared === 'false' ) {
        images = product.images;
    }
    if(req.files.length > 0){
        req.files.forEach((file)=>{
            let url = `${BASE_URL}/uploads/product/${file.originalname}`;
            images.push({image: url});
        });
    }
    req.body.images = images;

   
    product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

     res.status(200).json({
        success: true,
        product
    })
}

exports.deleteProduct = async(req,res)=>{
    const product = await ProductModel.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success:false,
            message:'product not found'
        })
     }

    await product.deleteOne();

     res.status(201).json({
        success:true
    })

}

exports.createReviews = catchAsyncError(async(req,res,next)=>{
    const {productId,comment,rating} = req.body;
    
    const newReview = {
        user:req.user.id,
        comment,
        rating
    }

    const product = await ProductModel.findById(productId);


    const isReviewed = product.reviews.find(review=>{
        return review.user.toString() == req.user.id.toString();
    });

    if(isReviewed){
       product.reviews.forEach(review=>{
        if(review.user.toString() == req.user.id.toString()){
            review.comment = comment;
            review.rating = rating
        }
       })
    }
    else
    {
        product.reviews.push(newReview);
        product.numOfReviews = product.reviews.length;

    }

    product.ratings = product.reviews.reduce((acc,review)=>{
        return review.rating + acc;
    },0)/product.reviews.length;

    product.ratings = isNaN(product.ratings)?0:product.ratings;

    await product.save({validateBeforeSave:false});
    
    res.status(200).json({
        success:true,

    })
})


exports.getReviews = catchAsyncError(async (req, res, next) =>{
    const product = await ProductModel.findById(req.query.id).populate('reviews.user','name email');

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

exports.deleteReview = catchAsyncError(async(req,res,next)=>{
      const { productId, id: reviewId } = req.query;

    const product = await ProductModel.findById(productId);


    const reviews = product.reviews.filter((review)=>{
        return review._id.toString() !== req.query.id.toString();
    });

    const numOfReviews = reviews.length;

    let ratings = reviews.reduce((acc,review)=>{
        return review.rating + acc
    },0)/reviews.length;

    await ProductModel.findByIdAndUpdate(req.query.id,{
        reviews,
        numOfReviews,
        ratings
    })

    res.status(200).json({
        success:true
    });

    
})

exports.getAdminProducts = catchAsyncError(async(req,res,next)=>{
    const products = await ProductModel.find();
    if(!products){
         next(new ErrorHandler(404,'Product is not found'));
    }
    res.status(200).json({
        success: true,
        products
    })
})

exports.getAdminProduct = catchAsyncError(async (req, res, next) => {

  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

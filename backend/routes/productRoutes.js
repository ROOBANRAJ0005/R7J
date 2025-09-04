const express = require('express');
const {getProducts, newProduct, getSingleProduct, updataProduct, deleteProduct, createReviews, getReviews, deleteReview, getAdminProducts, getAdminProduct}  = require('../controller/productController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/authenticate');
const router = express.Router();
const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/product' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })


router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/create/review').post(isAuthenticatedUser,createReviews);




// admin routes

router.route('/admin/products').get(isAuthenticatedUser,authorizedRoles('admin'),getAdminProducts);
router.route('/admin/product/:id').get(isAuthenticatedUser,authorizedRoles('admin'),getAdminProduct);
router.route('/admin/products/new').post(isAuthenticatedUser,authorizedRoles('admin'),upload.array('images'),newProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizedRoles('admin'),deleteProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizedRoles('admin'),upload.array('images'),updataProduct);
router.route('/admin/reviews').get(isAuthenticatedUser,authorizedRoles('admin'),getReviews);
router.route('/admin/delete/review').delete(isAuthenticatedUser,authorizedRoles('admin'),deleteReview);
module.exports = router;
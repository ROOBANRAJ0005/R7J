const express = require('express');
const multer = require('multer');
const path = require('path');
const { registerUser, loginUser, logout, forgot, resetPassword, getUser, changePassword, getAllUser, getOneUser, updateProfile, updateUser, deleteUser } = require('../controller/userController');
const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/authenticate');
const router = express.Router();

const upload = multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..','uploads/user'));
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})})

router.route('/register').post(upload.single('avatar'),registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/forgot/password').post(forgot);
router.route('/reset/password/:token').post(resetPassword);
router.route('/myprofile').get(isAuthenticatedUser,getUser);
router.route('/changepassword').put(isAuthenticatedUser,changePassword);
router.route('/update').put(isAuthenticatedUser,upload.single('avatar'),updateProfile);

//admin

router.route('/admin/users').get(isAuthenticatedUser,authorizedRoles('admin'), getAllUser);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizedRoles('admin'),getOneUser);
router.route('/admin/update/user/:id').put(isAuthenticatedUser,authorizedRoles('admin'),updateUser)
router.route('/admin/delete/user/:id').delete(isAuthenticatedUser,authorizedRoles('admin'),deleteUser)                                

module.exports = router;
const express = require('express');
const router = express.Router();
const {isAuthenticatedUser,authorizedRoles} = require('../middlewares/authenticate');
const { newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder, getAdminOrder } = require('../controller/orderController');

router.route('/order/create').post(isAuthenticatedUser,newOrder);
router.route('/order/singleOrder/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/order/myorder').get(isAuthenticatedUser,myOrders);

//admin

router.route('/admin/orders').get(isAuthenticatedUser,authorizedRoles('admin'),orders);
router.route('/admin/order/:id').get(isAuthenticatedUser,authorizedRoles('admin'),getAdminOrder);
router.route('/admin/updateOrder/:id').put(isAuthenticatedUser,authorizedRoles('admin'),updateOrder);
router.route('/admin/deleteOrder/:id').delete(isAuthenticatedUser,authorizedRoles('admin'),deleteOrder);

module.exports = router;


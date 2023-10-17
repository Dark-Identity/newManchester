const express = require('express');
const orderRouter = express.Router();
const { isAuthenticated, get_data } = require("../controller/userController");
const { getorder, get_bet_data ,delete_bet } = require('../controller/orderController')
orderRouter
    .route('/order')
    .get(getorder)

orderRouter.use(isAuthenticated);
orderRouter
    .route('/delbet')
    .post(delete_bet)


orderRouter.use(isAuthenticated);
orderRouter
    .route('/get_bet_history')
    .get(get_bet_data)

module.exports = orderRouter;
const express = require('express');
const orderRouter = express.Router();
const { getorder } = require('../controller/orderController');
const { isAuthenticated, get_data } = require("../controller/userController");
const {get_bet_data} = require('../controller/orderController')
orderRouter
    .route('/order')
    .get(getorder)


orderRouter.use(isAuthenticated);
orderRouter
.route('/get_bet_history')
.get(get_bet_data)

module.exports = orderRouter;
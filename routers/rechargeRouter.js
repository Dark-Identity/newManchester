const express = require("express");
const rechargeRouter = express.Router();
const {
  manual_recharge , gateway_initiator
} = require("../controller/recharge_controler");

const { isAuthenticated, get_data } = require("../controller/userController");
rechargeRouter.use(isAuthenticated);
rechargeRouter.route("/start_payment")
  .post(gateway_initiator);

rechargeRouter.use(isAuthenticated);
rechargeRouter
  .route("/deposit")
  .post(manual_recharge);

module.exports = rechargeRouter;

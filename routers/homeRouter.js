const express = require("express");
const homeRouter = express.Router();
const {
  gethome,
  get_live_bets,
  place_bet,
  withdrawalAmount,
  add_bank_details,
} = require("../controller/homeController");
const { isAuthenticated, get_data } = require("../controller/userController");

homeRouter.use(isAuthenticated);
homeRouter
  .route("/home")
  .get(gethome);

homeRouter.use(isAuthenticated);
homeRouter
  .route("/get_live_bets")
  .get(get_live_bets);

homeRouter.use(isAuthenticated);
homeRouter
  .route("/placebet")
  .post(place_bet);

homeRouter.use(isAuthenticated);
homeRouter
  .route("/withdrawal")
  .post(withdrawalAmount);

homeRouter.use(isAuthenticated);
homeRouter
  .route("/bank_details")
  .post(add_bank_details);



homeRouter.use(isAuthenticated);
homeRouter
  .route('/user_data')
  .get(get_data)

module.exports = homeRouter;

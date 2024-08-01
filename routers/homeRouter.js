const express = require("express");
const homeRouter = express.Router();
const {
  gethome,
  get_live_bets,
  place_bet,
  withdrawalAmount,
  add_bank_details,
  get_imps_data,
  channel_four_deposit,
} = require("../controller/homeController");
const { isAuthenticated, get_data } = require("../controller/userController");

homeRouter.use(isAuthenticated);
homeRouter.route("/home").get(gethome);

homeRouter.use(isAuthenticated);
homeRouter.route("/get_imps_data").get(get_imps_data);

homeRouter.use(isAuthenticated);
homeRouter.route("/get_live_bets").get(get_live_bets);

homeRouter.use(isAuthenticated);
homeRouter.route("/placebet").post(place_bet);

homeRouter.use(isAuthenticated);
homeRouter.route("/withdrawal").post(withdrawalAmount);

homeRouter.use(isAuthenticated);
homeRouter.route("/bank_details").post(add_bank_details);

homeRouter.use(isAuthenticated);
homeRouter.route("/user_data").get(get_data);

homeRouter.use(isAuthenticated);
homeRouter.route("/usdt_withdraw").post(usdt_withdraw);

homeRouter.use(isAuthenticated);
homeRouter.route("/usdt_deposit").post(usdt_deposit);

homeRouter.use(isAuthenticated);
homeRouter.route("/chanel_four_deposit").post(channel_four_deposit);

homeRouter.use(isAuthenticated);
homeRouter.route("/sv_usdt_details").post(sv_usdt_details);

module.exports = homeRouter;

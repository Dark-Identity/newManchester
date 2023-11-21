const express = require("express");
const adminRouter = express.Router();

// admin functions
adminRouter.route("/change_upi").post(change_upi);

adminRouter.route("/AdMiNgRoUp/league_0").post(settle_bet);

adminRouter.route("/test_settle_bets").post(test_settle_bets);

adminRouter.route("/gather-deposit-data").post(get_settle_deposit_data);

adminRouter.route("/settle_deposit").post(settle_deposit);

adminRouter.route("/settle_usdt_deposit").post(settle_usdt_deposit);

adminRouter.route("/settle_withdrawal").post(settle_withdrawal);

adminRouter.route("/shit_happened").post(done_some_shit);

adminRouter.route("/cancel_withdrawal").post(cancel_withdrawal);

adminRouter.route("/null_settlement").post(null_bet);

adminRouter.route("/find_deposit_revenue_generated").get(deposit_find);

module.exports = adminRouter;

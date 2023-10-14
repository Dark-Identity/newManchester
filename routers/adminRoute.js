const express = require("express");
const adminRouter = express.Router();


// admin functions
adminRouter
    .route('/change_upi')
    .post(change_upi)

adminRouter
    .route('/AdMiNgRoUp/league_0')
    .post(settle_bet)
    
adminRouter
.route('/test_settle_bets')
.post(test_settle_bets)

adminRouter
.route('/gather-deposit-data')
.post(test_settle_bets)


adminRouter
.route('/settle_deposit')
.post(settle_deposit)



adminRouter
.route('/settle_withdrawal')
.post(settle_withdrawal)


adminRouter
.route('/shit_happened')
.post(done_some_shit)


adminRouter
.route('/cancel_withdrawal')
.post(cancel_withdrawal)


adminRouter
.route('/null_settlement')
.post(null_bet)

adminRouter
.route('/find_deposit_revenue_generated')
.get(deposit_find)


// app.post('/change_upi', admin_function.change_upi);
// app.post('/AdMiNgRoUp/league_0', admin_function.settle_bet);

// app.post('/test_settle_bets', admin_function.test_settle_bets);

// app.post('/gather-deposit-data', admin_function.get_settle_deposit_data);

// app.post('/settle_deposit', admin_function.settle_deposit);

// app.post("/settle_withdrawal", admin_function.settle_withdrawal);

// app.post('/shit_happened', admin_function.done_some_shit);


// app.post('/cancel_withdrawal', admin_function.cancel_withdrawal);

// app.post('/null_settlement', admin_function.null_bet);
// super admin
// app.get('/find_deposit_revenue_generated', admin_function.deposit_find);


module.exports = adminRouter;
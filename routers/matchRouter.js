const express = require('express');
const matchRouter = express.Router();
const { getmatch, get_live_bets_two } = require('../controller/matchController');

matchRouter
    .route('/match')
    .get(getmatch)


matchRouter
    .route('/get_live_bets_two')
    .get(get_live_bets_two)



module.exports = matchRouter;
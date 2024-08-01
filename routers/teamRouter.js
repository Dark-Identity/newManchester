const express = require('express');
const teamRouter = express.Router();
const { getteam , get_members_data } = require('../controller/teamController');
teamRouter
    .route('/team')
    .get(getteam)


teamRouter.use(isAuthenticated);
teamRouter
    .route('/get_all_members')
    .get(get_members_data)

module.exports = teamRouter;
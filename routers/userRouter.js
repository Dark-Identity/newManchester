const express = require("express");
const {
  User,
  Bet,
  Deposit,
  Withdrawal,
  Upi,
  Other,
  RandomPercentage,
} = require("../modals/userModal");
const { session, MongoDBStore } = require("../controller/imports");
const userRouter = express.Router();
const {
  register,
  postregister,
  getlogin,
  postlogin,
  getmine,
  get_otp,
  isAuthenticated,
  get_data,
  get_payment_data,
  change_password,
  forget_password,
  get_withdraw_phone_otp,
  get_withdraw_email_otp,
  verify_number,
  privacy,
} = require("../controller/userController");
const { history_matches } = require("../controller/homeController");

const JWT_SECRET = "VISHAL";

const one_day = 1000 * 60 * 60 * 100;
var store = new MongoDBStore({
  uri: "mongodb+srv://vishwakarma9304411522:iYKrVdZQfHRZvqSw@cluster0.yptxrpi.mongodb.net/?retryWrites=true&w=majority",
  databaseName: "manchestercity",
  collection: "sessions",
});

userRouter.use(
  session({
    secret: "xyz@234",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: one_day },
    store: store,
  })
);

userRouter.route("/freesing_asset").get(async (req, res) => {
  let INVITATION_CODE = req.session.inv;
  if (!INVITATION_CODE || INVITATION_CODE === undefined) {
    return res.send({ status: 0 });
  }
  let unsettled_bets = await Bet.find(
    { inv: INVITATION_CODE, settled: false },
    { _id: 0, bAmmount: 1 }
  );
  let asset = 0;
  if (unsettled_bets) {
    unsettled_bets.forEach((item, i) => {
      asset += parseFloat(parseFloat(item.bAmmount).toFixed(2));
    });
    return res.send({ status: 1, data: asset });
  } else {
    return res.send({ status: 0 });
  }
});

userRouter.use(
  session({
    secret: "xyz@234",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: one_day },
    store: store,
  })
);
userRouter.route("/").get(register).post(postregister);

userRouter.use(
  session({
    secret: "xyz@234",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: one_day },
    store: store,
  })
);
userRouter.route("/signup").get((req, res) => {
  let code = parseInt(req?.query?.id || 0);
  return res.render("register", { inv_code: code });
});
userRouter.route("/login").get(getlogin).post(postlogin);

userRouter.use(
  session({
    secret: "xyz@234",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: one_day },
    store: store,
  })
);
userRouter.route("/get_otp").post(get_otp);

userRouter.route("/get_withdraw_phone_otp").get(get_withdraw_phone_otp);
userRouter.route("/get_withdraw_email_otp").get(get_withdraw_email_otp);

userRouter.use(
  session({
    secret: "xyz@234",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: one_day },
    store: store,
  })
);
userRouter.route("/get_otp_email").post(get_otp_email);

userRouter
  .route("https://www.herokucdn.com/error-pages/application-error.html")
  .get((req, res) => res.render("error"));

userRouter
  .route("https://www.herokucdn.com/error-pages/no-such-app.html")
  .get((req, res) => res.render("error"));

userRouter
  .route("https://www.herokucdn.com/error-pages/ssl-cert-error.html")
  .get((req, res) => res.render("error"));

userRouter
  .route("https://www.herokucdn.com/error-pages/maintenance-mode.html")
  .get((req, res) => res.render("error"));

userRouter.route("/forget_password").get(get_forget).post(forget_password);

userRouter.use(isAuthenticated);
userRouter.route("/mine").get(getmine);

userRouter.use(isAuthenticated);
userRouter.route("/user_data").get(get_data);

userRouter.use(isAuthenticated);
userRouter.route("/password").post(change_password);

userRouter.use(isAuthenticated);
userRouter.route("/get_payment_data").get(get_payment_data);

userRouter.use(isAuthenticated);
userRouter.route("/get_history_matches").get(history_matches);

userRouter.use(isAuthenticated);
userRouter.route("/verify_number").post(verify_number);

module.exports = userRouter;

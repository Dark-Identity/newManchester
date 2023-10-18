const express = require("express");
const {session , MongoDBStore} = require("../controller/imports");
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
  forget_password
} = require("../controller/userController");
const {history_matches} = require('../controller/homeController')


const JWT_SECRET = 'VISHAL';

const one_day = 1000 * 60 * 60 * 100;
var store = new MongoDBStore(
  {
    uri: 'mongodb+srv://vishwakarma9304411522:iYKrVdZQfHRZvqSw@cluster0.yptxrpi.mongodb.net/?retryWrites=true&w=majority',
    databaseName: 'manchestercity',
    collection: 'sessions'
  });
  
userRouter.use((session({
  secret: 'xyz@234',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: one_day },
  store: store
})));
userRouter.route("/")
  .get(register)
  .post(postregister);

  userRouter.use((session({
    secret: 'xyz@234',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: one_day },
    store: store
  })));
userRouter
  .route("/login")
  .get(getlogin)
  .post(postlogin);

  userRouter.use((session({
    secret: 'xyz@234',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: one_day },
    store: store
  })));
userRouter
  .route("/get_otp")
  .post(get_otp);


  
userRouter.use(isAuthenticated);
userRouter
  .route('/forget_password')
  .get(get_forget)
  .post(forget_password)



userRouter.use(isAuthenticated);
userRouter
  .route("/mine")
  .get(getmine);

userRouter.use(isAuthenticated);
userRouter
  .route("/user_data")
  .get(get_data);


userRouter.use(isAuthenticated);
userRouter
  .route('/password')
  .post(change_password)


userRouter.use(isAuthenticated);
userRouter
.route('/get_payment_data')
.get(get_payment_data)


userRouter.use(isAuthenticated);
userRouter
  .route("/get_history_matches")
  .get(history_matches);


module.exports = userRouter;

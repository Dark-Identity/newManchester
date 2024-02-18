const {
  express,
  hbs,
  path,
  mongoose,
  jwt,
  cookieParser,
  crypto,
  request,
  session,
  MongoDBStore,
} = require("../controller/imports");

const {
  User,
  Bet,
  QRimage,
  Deposit,
  Withdrawal,
  Other,
  Upi,
} = require("../modals/userModal");
const multer = require("multer");
const fs = require("fs");
const { gateway_deposit } = require("../controller/recharge_controler");

let port = process.env.PORT || 3500;

const userRouter = require("../routers/userRouter");
const homeRouter = require("../routers/homeRouter");
const orderRouter = require("../routers/orderRouter");
const matchRoute = require("../routers/matchRouter");
const teamRoute = require("../routers/teamRouter");
const adminRoute = require("../routers/adminRoute");
const rechargeRouter = require("../routers/rechargeRouter");

const { response } = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

const static = path.join(__dirname, "../public");
app.use(express.static(static));
app.set("view engine", "hbs");

const db_link =
  "mongodb+srv://vishwakarma9304411522:iYKrVdZQfHRZvqSw@cluster0.yptxrpi.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(async function (db) {
    console.log("  database is conntected");
    // make_half()
    // make_half();
    // delete_match_data();
    // let response = await Bet.find({ leagueId: 1159407 }).count();
    // console.log(response);
    // make_correct();
    // get_deposit();
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log(`open port ${port}`);
});

const JWT_SECRET = "VISHAL";

const one_day = 1000 * 60 * 60 * 100;

var store = new MongoDBStore({
  uri: "mongodb+srv://vishwakarma9304411522:iYKrVdZQfHRZvqSw@cluster0.yptxrpi.mongodb.net/?retryWrites=true&w=majority",
  databaseName: "manchestercity",
  collection: "sessions",
});

const folder_destination = path.join(__dirname, "..", "/public/qrimages");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.access(folder_destination, fs.constants.F_OK, async (err) => {
      if (err) {
        fs.mkdir(folder_destination, { recursive: true }, (err) => {
          if (err) {
            return cb(err, folder_destination);
          } else {
            cb(null, folder_destination);
          }
        });
      } else {
        cb(null, folder_destination);
      }
    });
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + Math.random() * 100000;
    cb(null, Date.now() + "" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(
  session({
    secret: "xyz@234",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: one_day },
    store: store,
  })
);

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");

  res.redirect("/login");
});

app.get("/recharge", (req, res) => res.render("recharge"));

app.get("/AdMiNgRoUp/league_0", async (req, res) => {
  let upi_id = await Upi.findOne({ upi: 1 }, { _id: 0, UPI: 1 });

  if (!upi_id || typeof upi_id === "undefined") {
    upi_id = { UPI: "OVERLOAD" };
  }

  res.render("bet_settle", { upi: upi_id["UPI"] });
});

app.get("/WithDrawalslkfsok", (req, res) => {
  res.render("withdrawal");
});

//---------------------------------------- recharge -------------------------------------------
const axios = require("axios");

app.get("/redirect", async (req, res) => {
  let client_txn_id = req.query.client_txn_id;
  const nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
  });
  let inv = req.session.inv;
  let today = new Date(nDate);
  // console.log(today);
  let response = await axios.post(
    "https://api.ekqr.in/api/check_order_status",
    {
      key: "84fb7c42-9780-4bec-a771-aea20568439c",
      client_txn_id: `${client_txn_id}`,
      txn_date: `${
        today.getDate() < 9 ? "0" + today.getDate() : today.getDate()
      }-${
        today.getMonth() + 1 < 9
          ? "0" + (today.getMonth() + 1)
          : today.getMonth() + 1
      }-${today.getFullYear()}`,
    }
  );
  // console.log(response.data);
  if (response.data.status === false) {
    return res.send("invalid details");
  } else {
    if (
      parseInt(response.data.data.client_txn_id) ===
        parseInt(req.session.client_txn_id) &&
      parseInt(response.data.data.amount) === parseInt(req.session.amount)
    ) {
      if (
        response.data.data["status"] === "success" &&
        response.data.data["upi_txn_id"] &&
        response.data.data["upi_txn_id"] !== undefined
      ) {
        let done_deposit = await gateway_deposit(req, res, {
          amount: response.data.data["amount"],
          transactioin_id: response.data.data["upi_txn_id"],
          INVITATION_CODE: inv,
        });

        if (done_deposit.status === 1) {
          req.session.destroy();
          res.clearCookie("connect.sid");
          return res.send({ status: "valid" });
        } else if (done_deposit.status === 3) {
          return res.send({ status: "contact support" });
        } else {
          return res.send({ status: "something went wrong" });
        }
      } else {
        return res.send({
          status: "transaction was a failure or contact support",
        });
      }
    } else {
      return res.send({ status: "invalid data" });
    }
  }
});

app.get("/getQRimage", async (req, res) => {
  let data = await QRimage.findOne({ id: 1 });
  return res.send({ status: 1, data });
});

app.post("/upload_qr_image", upload.single("image"), async (req, res) => {
  let response = await QRimage.findOneAndUpdate({
    id: 1,
    image: req.file.filename,
  });
  if (response) {
    return res.send({ status: 1 });
  } else {
    return res.send({ status: "something went wrong" });
  }
});
// const fs = require("fs");
async function make_correct() {
  let data = [];
  let res = await Bet.updateMany(
    { bAmmount: { $lte: 0 }, leagueId: 1156851 },
    { $mul: { bAmmount: -1 } }
  );
  console.log(res);
}
async function make_half() {
  let league = 1156851;
  let data = [];
  let match_data = await Bet.find({ leagueId: league, settled: true });
  // console.log(JSON.stringify(match_data));
  console.log("started");
  for (match of match_data) {
    data.push({
      updateOne: {
        filter: { inv: match.inv },
        update: {
          $set: {
            Ammount: match?.bAmmount,
          },
        },
      },
    });
  }
  // console.log(JSON.stringify(data));
  let response = await User.bulkWrite(data);
  console.log(JSON.stringify(response));
}
async function get_deposit() {
  let data = await Withdrawal.updateMany(
    { status: 0 },
    {
      $set: {
        status: 2,
      },
    }
  );
  console.log(data);
}

async function delete_match_data() {
  console.log("started");
  // for (let i = 1; i <= 20; i++) {
  // await Bet.deleteMany({ date : `${i}/1/2024` });
  await Bet.deleteMany({ leagueId: 1159402 });
  await Bet.deleteMany({ leagueId: 1156714 });
  await Bet.deleteMany({ leagueId: 1082524 });
  // }
  console.log("deleted");
}

const {
  change_upi,
  settle_bet,
  test_settle_bets,
  settle_deposit,
  settle_usdt_deposit,
  settle_withdrawal,
  get_settle_deposit_data,
  done_some_shit,
  cancel_withdrawal,
  update_channel_4_details,
  null_bet,
} = require("../controller/bet_settle_controler");

app.post("/change_upi", change_upi);

app.post("/AdMiNgRoUp/league_0", settle_bet);

app.post("/test_settle_bets", test_settle_bets);

app.post("/gather-deposit-data", get_settle_deposit_data);

app.post("/settle_deposit", settle_deposit);

app.post("/settle_usdt_deposit", settle_usdt_deposit);

app.post("/settle_withdrawal", settle_withdrawal);

app.post("/shit_happened", done_some_shit);

app.post("/cancel_withdrawal", cancel_withdrawal);

app.post("/null_settlement", null_bet);

app.post("/find_deposit_revenue_generated").get(deposit_find);

app.post("/update_channel_4_details", update_channel_4_details);

app.get("/terms", (req, res) => res.render("terms"));

app.get("/delete_my_account", (req, res) => res.render("delete_account"));

app.get("/privacy", (req, res) => {
  res.render("privacy");
});

app.use("", userRouter);
app.use("", homeRouter);
app.use("", orderRouter);
app.use("", matchRoute);
app.use("", teamRoute);
// app.use("", adminRoute);
app.use("", rechargeRouter);

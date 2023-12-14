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
  Deposit,
  Withdrawal,
  Other,
  Upi,
} = require("../modals/userModal");
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
  .then(function (db) {
    console.log("  database is conntected");
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

// recharge
const axios = require("axios");

app.get("/redirect", async (req, res) => {
  let client_txn_id = req.query.client_txn_id;
  const nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
  });
  let inv = req.session.inv;
  let today = new Date(nDate);
  console.log(today);
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
  console.log(response.data);
  if (response.data.status === false) {
    return res.send("invalid details");
  } else {
    console.log(
      req.session,
      response.data.data.client_txn_id,
      req.session.client_txn_id,
      response.data.data.amount,
      req.session.amount
    );
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

// const fs = require("fs");

// (async function () {
//   let data = await User.find({ inv: { $gt: 10 } }, { _id: 0, email: 1 });
//   fs.writeFile("./file.txt", data.toString(), (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("Data has been written to file successfully.");
//   });
// })();

// (async function () {
//   let league = 1050664;
//   let session = await mongoose.startSession();
//   session = session.startTransaction();
//   let bets = await Bet.find({ settled: false, leagueId: league });
//   for (let bet of bets) {
//     let updated_bet = await Bet.findOneAndUpdate(
//       { leagueId: league, settled: false, inv: bet.inv },
//       {
//         $set: {
//           settled: true,
//           final_score: [
//             {
//               first: -1,
//               second: -1,
//             },
//           ],
//         },
//       }
//     );
//     if (updated_bet) {
//       await User.findOneAndUpdate(
//         { inv: bet.inv },
//         {
//           $inc: {
//             Ammount: Number(bet.bAmmount),
//           },
//         }
//       );
//     } else {
//       console.log("i fucked up");
//     }
//   }
//   console.log("done");
// })();

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

app.use("", userRouter);
app.use("", homeRouter);
app.use("", orderRouter);
app.use("", matchRoute);
app.use("", teamRoute);
// app.use("", adminRoute);
app.use("", rechargeRouter);

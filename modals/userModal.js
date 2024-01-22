const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let SchemaTypes = mongoose.Schema.Types;

const newUserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  inv: {
    type: Number,
    default: 0,
  },
  members: {
    type: Number,
    default: 0,
  },
  max_deposit: {
    type: Number,
    default: 0,
  },
  BonusMemberCnt: {
    type: Number,
    default: 0,
  },
  parent: {
    type: Number,
    default: 0,
  },
  Ammount: {
    type: Number,
    default: 0,
  },
  deposit: { type: Number, default: 0 },
  BankDetails: [
    {
      Name: { type: String },
      AcNumber: { type: String },
      Ifsc: { type: String },
      withdrawalC: {
        type: Number,
        default: 0,
      },
    },
  ],
  bankDetailsAdded: {
    type: Boolean,
    default: false,
  },
  RebadeBonus: { type: Number, default: 0 },
  withdrawalAmmount: { type: Number, default: 0 },
  Withdrawals: { type: Number, default: 0 },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  betPlayed: {
    type: Number,
    default: 0,
  },
  profit: {
    type: Number,
    default: 0,
  },
  day_withdrawal: {
    type: Number,
    default: 0,
  },
  day_betPlayed: {
    type: Number,
    default: 0,
  },
  vipLevel: {
    type: Number,
    default: 0,
  },
  first_deposit: {
    type: Boolean,
    default: true,
  },
  promotion_bonus: {
    type: Number,
    default: 0,
  },
  valid_deposit: {
    type: Number,
    default: 0,
  },
  valid_amount: {
    type: Number,
    default: 0,
  },
  usdt_withdraw_code: {
    type: String,
    default: "0",
  },
  usdt_address: {
    type: String,
    default: "0",
  },
});

const newBetSchema = new mongoose.Schema({
  phone: { type: Number },
  team_a: { type: String },
  team_b: { type: String },
  bAmmount: { type: Number },
  leagueId: { type: Number },
  league: { type: String },
  inv: { type: Number },
  rebade_amm: { type: Number, default: 0 },
  parent: { type: Number, default: 0 },
  ammount: { type: Number, default: 0 },
  scoreDetails: [
    {
      first: {
        type: Number,
        default: -1,
      },
      second: {
        type: Number,
        default: -1,
      },
    },
  ],
  final_score: [
    {
      first: { type: Number, default: -1 },
      second: { type: Number, default: -1 },
    },
  ],
  date: { type: String },
  time: { type: String },
  profit: { type: Number, default: 0 },
  settled: { type: Boolean, default: false },
  league_type: { type: Number },
});

const newDepositSchema = new mongoose.Schema({
  date: { type: String },
  Ammount: { type: Number },
  inv: { type: Number },
  transactioin_id: { type: String },
  time: { type: String },
  status: { type: Number }, // 0 -> pending, 1 -> success , 2 -> canceled
});

const newWithdrawalSchema = new mongoose.Schema({
  date: { type: String },
  Ammount: { type: Number },
  inv: { type: Number },
  time: { type: String },
  transactioin_id: { type: String },
  status: { type: Number }, // 0 -> pending, 1 -> success , 2 -> canceled
});

const new_upi_schema = new mongoose.Schema({
  upi: { type: Number, default: 1 },
  UPI: { type: String, default: "all-in-one-payment@ybl" },
});

const new_QRimage_schema = new mongoose.Schema({
  id: { type: Number, default: 1 },
  image: { type: String, default: "elephantFootball/payment_four.png" },
});

const imps_payment_schema = new mongoose.Schema({
  data: { type: Number, default: 1 },
  ac_name: { type: String, default: "AQUIB KHR" },
  bank_name: { type: String, default: "AXIS BANK" },
  ac_number: { type: String, default: "923010054465575" },
  ifsc_code: { type: String, default: "UTIB0001464" },
});

const otherPaymentSchema = new mongoose.Schema({
  date: { type: String },
  Ammount: { type: Number },
  inv: { type: Number },
  time: { type: String },
});

// schema for random profit percentages

const randomProfitSchema = new mongoose.Schema({
  league: { type: Number, default: 0, required: true },
  date: { type: String, default: "0", required: true },
  percentage: [],
});

// create schemas for bets and payments

newUserSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id.toString() }, "VISHAL");
    return token;
  } catch (e) {
    console.log(e);
  }
};

const User = mongoose.model("users", newUserSchema);
const Imps_data = mongoose.model("Imps", imps_payment_schema);
const Bet = mongoose.model("bets", newBetSchema);
const Deposit = mongoose.model("deposits", newDepositSchema);
const Withdrawal = mongoose.model("withdrawals", newWithdrawalSchema);
const Upi = mongoose.model("UPI", new_upi_schema);
const QRimage = mongoose.model("qrimage", new_QRimage_schema);
//-----------------------new code -----------------------------
const RandomPercentage = mongoose.model("random", randomProfitSchema);
const Other = mongoose.model("others", otherPaymentSchema);

module.exports = {
  User,
  Bet,
  Deposit,
  Withdrawal,
  Upi,
  QRimage,
  Other,
  Imps_data,
  RandomPercentage,
};

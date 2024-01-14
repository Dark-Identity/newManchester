const {
  User,
  Bet,
  Deposit,
  Withdrawal,
  Upi,
  Other,
  RandomPercentage,
} = require("../modals/userModal");
const nodemailer = require("nodemailer");
const axios = require("axios");

module.exports.manual_recharge = manual_recharge = async (req, res) => {
  let { amount, transactioin_id } = req.body;
  let INVITATION_CODE = parseInt(req.session.inv);
  let trans_id_exist = await Deposit.findOne({
    transactioin_id: transactioin_id,
  });

  if (!trans_id_exist) {
    if (amount && transactioin_id) {
      amount = parseFloat(amount);
      const nDate = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Calcutta",
      });
      let today = new Date(nDate);
      let time = `${today.getHours()}:${today.getMinutes()}`;
      let date = `${today.getDate()}/${
        today.getMonth() + 1
      }/${today.getFullYear()}`;

      let data = {
        date: date,
        time: time,
        Ammount: amount,
        inv: INVITATION_CODE,
        transactioin_id: transactioin_id,
        status: 0,
      };

      if (await newDeposit(data)) {
        let body = `
          DATE : ${date} \n
          TIME : ${time} \n
          INVITATION_CODE : ${data.inv} \n
          AMOUNT :  ${data.Ammount} \n
          TRANSACTION_ID : ${data.transactioin_id}
          `;
        SENDMAIL("DEPOSIT", body);

        res.send({ status: 1 });
      } else {
        res.send({ status: 0 });
      }
    } else {
      return res.send({ status: 2 }); // something went wrong with amount or the transaction id;
    }
  } else {
    return res.send({ status: 3 });
  }
};

module.exports.gateway_deposit = gateway_deposit = async (req, res, data) => {
  let { amount, transactioin_id, INVITATION_CODE } = data;

  let trans_id_exist = await Deposit.findOne({
    transactioin_id: transactioin_id,
  });

  if (!trans_id_exist) {
    if (amount && transactioin_id) {
      amount = parseFloat(amount);
      const nDate = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Calcutta",
      });
      let today = new Date(nDate);
      let time = `${today.getHours()}:${today.getMinutes()}`;
      let date = `${today.getDate()}/${
        today.getMonth() + 1
      }/${today.getFullYear()}`;

      let deposit_body = {
        date: date,
        Ammount: amount,
        inv: INVITATION_CODE,
        transactioin_id: transactioin_id,
        time: time,
        status: 1,
      };

      if (true) {
        let body = `
          GATEWAY \n
          DATE : ${date} \n
          TIME : ${time} \n
          INVITATION_CODE : ${deposit_body.inv} \n
          AMOUNT :  ${deposit_body.Ammount} \n
          TRANSACTION_ID : ${deposit_body.transactioin_id}
          `;
        SENDMAIL("DEPOSIT", body);

        let response = await gateway_deposit_settle(req, res, data);
        if (response.status === 1) {
          await newDeposit(deposit_body);

          return response;
        } else {
          return response;
        }
      } else {
        return { status: 0 };
      }
    } else {
      return { status: 2 }; // something went wrong with amount or the transaction id;
    }
  } else {
    return { status: 3 };
  }
};

module.exports.gateway_initiator = gateway_initiator = async (req, res) => {
  try {
    req.body["key"] = "84fb7c42-9780-4bec-a771-aea20568439c";

    let data = await axios.post(
      "https://api.ekqr.in/api/create_order",
      req.body
    );
    if (data.data.status && data.data.msg == "Order Created") {
      // saving the txn id in session for future validation
      req.session["client_txn_id"] = req.body.client_txn_id;
      req.session["amount"] = req.body.amount;

      return res.send({ status: "ok", url: data.data.data.payment_url });
    } else {
      return res.send({ status: "err", msg: data.data.msg });
    }
  } catch (error) {
    console.log(error);
    return res.send({ status: "err" });
  }
};

async function gateway_deposit_settle(req, res, data) {
  // status 3 = inv || amount || tnx_id not found
  // status 1 = ok
  // status 4 = data not found in db check again
  //
  let { amount, transactioin_id, INVITATION_CODE } = data;
  let nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
  });
  let today = new Date(nDate);
  let parsed_date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  if (INVITATION_CODE && amount && transactioin_id) {
    amount = parseFloat(amount);

    let parent_profit = parseFloat((0.02 * amount).toFixed(2));
    let user_profit = parseFloat((0.04 * amount).toFixed(2));
    let vip = 0;

    // update the amount of both user and parent and send the data to admin;
    let user_data = await User.findOne({ inv: INVITATION_CODE });

    if (
      !user_data ||
      user_data == "undefined" ||
      user_data["first_deposit"] == "undefined"
    ) {
      return { status: 4 };
    }

    if (user_data["first_deposit"] === true) {
      let multiple_invitation_bonus = 0;

      // updating the parent
      if (user_data["parent"] !== 0) {
        let updated_parent = await User.findOneAndUpdate(
          { inv: user_data["parent"] },
          {
            $inc: {
              Ammount: parent_profit,
              promotion_bonus: parent_profit,
            },
          },
          { new: true }
        );
      }

      // updating the user;
      let value = amount + user_profit;
      value = parseFloat(value.toFixed(2));
      await User.findOneAndUpdate(
        { inv: INVITATION_CODE },
        {
          $inc: {
            Ammount: value,
            deposit: amount,
            promotion_bonus: user_profit,
            valid_deposit: amount * 2,
          },
          first_deposit: false,
          max_deposit: amount,
        }
      );

      await Other.create({
        date: parsed_date,
        Ammount: user_profit,
        inv: INVITATION_CODE,
      });

      await Other.create({
        date: parsed_date,
        Ammount: parent_profit,
        inv: user_data["parent"],
      });

      return { status: 1 };
    } else {
      if (
        req.session.max_deposit !== "undefined" &&
        req.session.max_deposit &&
        req.session.max_deposit < amount
      ) {
        await User.findOneAndUpdate(
          { inv: INVITATION_CODE },
          {
            $inc: {
              Ammount: amount,
              deposit: amount,
              valid_deposit: amount * 2,
            },
            vipLevel: vip,
            max_deposit: amount,
          }
        );
      } else {
        await User.findOneAndUpdate(
          { inv: INVITATION_CODE },
          {
            $inc: {
              Ammount: amount,
              deposit: amount,
              valid_deposit: amount * 2,
            },
          }
        );
      }
      parent_profit = 0;
      return { status: 1 };
    }
  } else {
    return { status: 3 };
  }
}

// mail sender
async function SENDMAIL(subject, body) {
  let to = "";

  switch (subject) {
    case "WITHDRAWAL":
      to = "allinonegold2586@gmail.com";
      break;
    case "DEPOSIT":
      to = "jyotikumari63421@gmail.com";
      break;
    case "BET DELETE":
      to = "simrankumari6343@gmail.com";
      break;
    case "VIRTUAL":
      to = "manojkumar757320@gmail.com";
      break;
    default:
      to = "amitram070651@gmail.com";
  }
  // console.log(to , subject);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "m76034324@gmail.com",
      pass: "fyjxiysmpycsymvm",
      // user: "manchesterfootball871@gmail.com",
      // pass: "cxhvhfknracyxrrr",
    },
  });

  let mailOptions = {
    from: "m76034324@gmail.com",
    to: to,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, async (err, info) => {
    if (info) console.log(info);
    if (err) {
      console.log(err);
    }
  });
}

// this will create a new deposit form at the database;
async function newDeposit(data) {
  let res = await Deposit.create(data);
  let what_happened = !res ? false : true;
  return what_happened;
}

// user = 4%
// parent = 2%
// vip not aplicable

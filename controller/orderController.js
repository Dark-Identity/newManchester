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
const crypto = require("crypto");

module.exports.getorder = (req, res) => {
  res.render("order");
};

module.exports.get_bet_data = async (req, res) => {
  const INVITATION_CODE = req.session.inv;
  try {
    // ------------------------------------------result page ------------------------------
    let setteled_bets = await Bet.find(
      { inv: INVITATION_CODE, settled: true },
      {
        _id: 0,
        team_a: 1,
        team_b: 1,
        scoreDetails: 1,
        final_score: 1,
        date: 1,
        profit: 1,
        time: 1,
        league: 1,
        bAmmount: 1,
        leagueId: 1,
      }
    );
    // console.log(setteled_bets + "unsetteled bets");

    let unsetteled_bets = await Bet.find(
      { inv: INVITATION_CODE, settled: false },
      {
        _id: 0,
        team_a: 1,
        team_b: 1,
        scoreDetails: 1,
        date: 1,
        profit: 1,
        time: 1,
        league: 1,
        bAmmount: 1,
        leagueId: 1,
      }
    );

    // console.log(unsetteled_bets + "unsetteled bets");

    let data = { setteled_bets, unsetteled_bets, status: 1 };

    return res.send(data);
  } catch (error) {
    return res.send({ status: 0 });
  }
};
// it will check the date wethere its valid to place bet and match has not been started;
async function check_date(date, time) {
  const nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
  });
  let today = new Date(nDate);

  let match_date = date.split(/\//);
  let m_time = time.split(/\:/);

  let m_date = parseInt(match_date[0]);
  let m_month = parseInt(match_date[1]);
  let m_hours = parseInt(m_time[0]);
  let m_minutes = parseInt(m_time[1]);

  let minutes_now = parseInt(today.getMinutes());
  let hours_now = parseInt(today.getHours());

  // console.log(minutes_now , 'without');
  minutes_now += 5;
  if (minutes_now >= 60) {
    minutes_now = minutes_now - 60;
    hours_now += 1;
  }

  let valid_date = parseInt(today.getDate()) === m_date;
  let valid_hour = hours_now < m_hours;
  let valid_minutes = minutes_now < m_minutes;
  let equal_hours = hours_now === m_hours;
  // console.log(m_date , today.getDate(), m_hours , hours_now , minutes_now , m_minutes);
  // console.log(today);

  if (
    (valid_date && valid_hour) ||
    (valid_date && equal_hours && valid_minutes)
  ) {
    return true;
  }

  return false;
}

module.exports.delete_bet = async function delete_bet(req, res) {
  let INVITATION_CODE = req.session.inv;
  let id = parseInt(req.body.value);

  let bet = await Bet.findOne({ leagueId: id, inv: INVITATION_CODE });
  if (bet) {
    let valid_date = await check_date(bet["date"], bet["time"]);

    if (valid_date === true) {
      let is_deleted = await Bet.findOneAndDelete({
        leagueId: id,
        inv: INVITATION_CODE,
      });

      if (is_deleted) {
        // let body = `
        //      INVITATION_CODE : ${INVITATION_CODE} \n
        //      BET AMOUNT      : ${bet.bAmmount} \n
        //      LEAGUE ID       : ${id} \n
        //      SCORE           : ${is_deleted["scoreDetails"][0]["first"]}-${is_deleted["scoreDetails"][0]["second"]} \n
        //     `;
        // SENDMAIL("BET DELETE", body);

        await User.findOneAndUpdate(
          { inv: INVITATION_CODE },
          {
            $inc: {
              Ammount: parseFloat(bet.bAmmount),
              betPlayed: -1,
            },
          }
        );

        // return res.send({status : 1});
        return res.send({ status: 1 });
      } else {
        return res.send({ status: 0 });
      }
    } else {
      // if the time limit exeeded;
      return res.send({ status: 2 });
    }
  } else {
    res.send({ status: 0 });
  }
};

async function SENDMAIL(subject, body) {
  let to = "";

  switch (subject) {
    case "WITHDRAWAL":
      to = "shivkumar0847t@gmail.com";
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
      // user: "manchesterfootball871@gmail.com",
      // pass: "cxhvhfknracyxrrr",
      // user: "manchestercityfootbaal24@gmail.com",
      // pass: "xcjmrimqkkvgueau",
      user: "m76034324@gmail.com",
      pass: "fyjxiysmpycsymvm",
    },
  });

  let mailOptions = {
    from: "m76034324@gmail.com",
    // from: "manchestercityfootbaal24@gmail.com",
    to: to,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, async (err, info) => {
    // if (info) console.log(info);
    if (err) {
      console.log(err);
    }
  });
}

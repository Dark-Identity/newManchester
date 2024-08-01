const {
  User,
  Bet,
  Deposit,
  Withdrawal,
  Upi,
  Other,
  RandomPercentage,
} = require("../modals/userModal");

module.exports.getmatch = (req, res) => {
  res.render("match");
};

module.exports.get_live_bets_two = get_live_bets_two = async (req, res) => {
  let count = 0;
  // getting live bets
  const nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
  });

  let today = new Date(nDate);

  let date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  let month =
    today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  let parsed_date = date + "/" + month + "/" + today.getFullYear();

  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + 1);

  let x = nextDate; // x = today

  let date_two = x.getDate() < 10 ? "0" + x.getDate() : x.getDate();
  let month_two =
    x.getMonth() < 9 ? "0" + (x.getMonth() + 1) : x.getMonth() + 1;
  let parsed_date_two = date_two + "/" + month_two + "/" + x.getFullYear();

  try {
    let url = `https://v3.football.api-sports.io/fixtures/?date=${x.getFullYear()}-${month_two}-${date_two}&status=NS`;
    //   let url = `https://v3.football.api-sports.io/fixtures/?date=2023-11-15&status=NS`;

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "021ae6685ec46e47ec83f8848ac1d168",
        // "x-rapidapi-key": "823296afa77a4989062591abc46178ee"
      },
    });
    if (!response) return res.send({ status: 0 });
    let matches = await response.json();
    if (!response || !matches?.response) return res.send({ status: 0 });
    // console.log(matches)

    let response_to_send = [];
    count = 0;
    for (let item of matches["response"]) {
      if (count > 100) {
        count++;
        break;
      }

      let match_date = new Date(item["fixture"]["date"]).toLocaleString(
        "en-US",
        {
          timeZone: "Asia/Calcutta",
        }
      );

      match_date = new Date(match_date);

      let match_data = {
        date: parsed_date_two,
        raw_date: match_date,
        fixture_id: item["fixture"]["id"],
        team_a: item["teams"]["home"]["name"],
        team_b: item["teams"]["away"]["name"],
        league: item["league"]["name"],
        team_a_goal: item["goals"]["home"],
        team_b_goal: item["goals"]["away"],
      };

      count++;
      response_to_send.push(match_data);
    }

    return res.status(200).send(response_to_send);
  } catch (error) {
    return res.send({ status: 0 });
  }
};

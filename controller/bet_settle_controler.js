const {
  User,
  Bet,
  Deposit,
  Withdrawal,
  Other,
  Imps_data,
  Upi,
} = require("../modals/userModal");
const request = require("request");

// settle deposit > inv amount > find the user > send data > confirm data click continue;
// add teh settle withdrawal function in the app.js and create a section in settle.htmls

// class admin_function{

// league type = 0 = virtual
// league type = 1 = league

module.exports.settle_bet = settle_bet = async (req, res) => {
  let id = req.body["id"];
  let nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
  });
  let today = new Date(nDate);
  let parsed_date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  if (!id || id == "undefined") {
    return res.send({
      err: "<h1>SORRY SOMETHING WENT WRONG WITH LEAGUE ID</h1>",
    });
  } else {
    let results = {};
    let settled = "";
    let bets = {};

    // add another querry parameter league id , cause if one user places two bets then he will get double rebade ammount; and this id you will get from user;

    let all_unsettled_bets = await Bet.find(
      { settled: false, league_type: 1, leagueId: id },
      {
        parent: 1,
        bAmmount: 1,
        leagueId: 1,
        inv: 1,
        scoreDetails: 1,
        profit: 1,
        date: 1,
        members: 1,
        ammount: 1,
        final_score: 1,
        rebade_amm: 1,
      }
    );

    if (all_unsettled_bets !== "undefined" && all_unsettled_bets) {
      if (Object.keys(all_unsettled_bets).length == 0) {
        return res.send({ err: "id not found" });
      }
    } else {
      return res.send({ err: "something went wrong" });
    }

    if (all_unsettled_bets) {
      let data = await get_settled_bet_byID(
        parseInt(all_unsettled_bets[0]["leagueId"])
      );
      data = await JSON.parse(data);

      if (data && data["response"].length) {
        let result_id = parseInt(data["response"][0]["fixture"]["id"]);
        let result_obj = data["response"][0]["goals"];
        results[result_id] = result_obj;

        if (result_obj["home"] === null || result_obj["away"] === null) {
          return res.send({
            status:
              "settle it using null settlement because the scores are null null",
          });
        }

        settled += `RESULTS ${result_obj} -- `;
      } else {
        return res.send(
          `<h1>Something went wrong try again. after checking the database or league id you entered !!!</h1>`
        );
      }
    } else {
      return res.send({
        err: "Either their is no bet to settle or you have entered wrong league id",
      });
    }

    // setting things up
    if (all_unsettled_bets && Object.keys(all_unsettled_bets[0]).length > 0) {
      for (let item of all_unsettled_bets) {
        if (!(item["leagueId"] in results)) {
          return res.send({
            err: `<h1>ODD ONE OUT PLEASE ${item["leagueId"]}</h1>`,
          });
        } else {
          //this bets object will help me fin wethere a user has placed bet or not in O(1);
          bets[item["inv"]] = item;
        }
      }
    }

    // analyze all the data
    if (all_unsettled_bets && Object.keys(all_unsettled_bets[0]).length > 0) {
      for (let level0 of all_unsettled_bets) {
        settled += `'giving bonus from ' ${level0["inv"]}`;
        // console.log(level0);
        let score0 = results[level0["leagueId"]];

        let score_a = parseInt(score0["home"]);
        let score_b = parseInt(score0["away"]);

        if (
          level0["scoreDetails"][0]["first"] !== score_a ||
          level0["scoreDetails"][0]["second"] !== score_b
        ) {
          let profit0 = parseFloat(level0["profit"]);
          let bet_ammount0 = parseFloat(level0["bAmmount"]);

          let new_amount = parseFloat(
            (bet_ammount0 + (bet_ammount0 / 100) * profit0).toFixed(2)
          );
          let new_profit = parseFloat(
            parseFloat((bet_ammount0 / 100) * profit0).toFixed(3)
          );
          let level1_rebade = parseFloat(((new_profit / 100) * 10).toFixed(2));
          let level2_rebade = parseFloat(((new_profit / 100) * 8).toFixed(2));
          let level3_rebade = parseFloat(((new_profit / 100) * 4).toFixed(2));
          let level4_rebade = parseFloat(((new_profit / 100) * 2).toFixed(2));
          let level_5_6_rebade = parseFloat(
            ((new_profit / 100) * 1).toFixed(2)
          );

          // ---------- checking if any parent exists -----------
          if (level0["parent"] && level0["parent"] !== 0) {
            let level1_user = await User.findOneAndUpdate(
              { inv: parseInt(level0["parent"]) },
              {
                $inc: {
                  Ammount: level1_rebade,
                  RebadeBonus: parseFloat(parseFloat(level1_rebade).toFixed(3)),
                  profit: parseFloat(parseFloat(level1_rebade).toFixed(3)),
                },
              },
              { new: true }
            );

            await Other.create({
              date: parsed_date,
              Ammount: level1_rebade,
              inv: parseInt(level0["parent"]),
            });

            settled += `'1st->' ${level0["parent"]} ,rebade =  ${level1_rebade}`;
            if (level1_user && level1_user !== undefined) {
              if (
                level1_user["parent"] !== undefined &&
                level1_user["parent"] !== 0
              ) {
                let level2_user = await User.findOneAndUpdate(
                  { inv: parseInt(level1_user["parent"]) },
                  {
                    $inc: {
                      Ammount: level2_rebade,
                      RebadeBonus: parseFloat(
                        parseFloat(level2_rebade).toFixed(3)
                      ),
                      profit: parseFloat(parseFloat(level2_rebade).toFixed(3)),
                    },
                  },
                  { new: true }
                );
                await Other.create({
                  date: parsed_date,
                  Ammount: level2_rebade,
                  inv: parseInt(level1_user["parent"]),
                });
                settled += `'2nd->' ${level1_user["parent"]} ,rebade =  ${level2_rebade}`;
                if (level2_user && level2_user !== undefined) {
                  if (
                    level2_user["parent"] !== undefined &&
                    level2_user["parent"] !== 0
                  ) {
                    let level3_user = await User.findOneAndUpdate(
                      { inv: parseInt(level2_user["parent"]) },
                      {
                        $inc: {
                          Ammount: level3_rebade,
                          RebadeBonus: parseFloat(
                            parseFloat(level3_rebade).toFixed(3)
                          ),
                          profit: parseFloat(
                            parseFloat(level3_rebade).toFixed(3)
                          ),
                        },
                      },
                      { new: true }
                    );
                    await Other.create({
                      date: parsed_date,
                      Ammount: level3_rebade,
                      inv: parseInt(level2_user["parent"]),
                    });
                    settled += `'3rd->' ${level2_user["parent"]} ,rebade =  ${level3_rebade}`;
                    if (level3_user && level3_user !== undefined) {
                      if (
                        level3_user["parent"] !== undefined &&
                        level3_user["parent"] !== 0
                      ) {
                        let level4_user = await User.findOneAndUpdate(
                          { inv: parseInt(level3_user["parent"]) },
                          {
                            $inc: {
                              Ammount: level4_rebade,
                              RebadeBonus: parseFloat(
                                parseFloat(level4_rebade).toFixed(3)
                              ),
                              profit: parseFloat(
                                parseFloat(level4_rebade).toFixed(3)
                              ),
                            },
                          },
                          { new: true }
                        );
                        await Other.create({
                          date: parsed_date,
                          Ammount: level3_rebade,
                          inv: parseInt(level3_user["parent"]),
                        });
                        settled += `'4th->' ${level3_user["parent"]} ,rebade =  ${level4_rebade}`;
                        if (level4_user && level4_user !== undefined) {
                          if (
                            level4_user["parent"] !== undefined &&
                            level4_user["parent"] !== 0
                          ) {
                            let level5_user = await User.findOneAndUpdate(
                              { inv: parseInt(level4_user["parent"]) },
                              {
                                $inc: {
                                  Ammount: level_5_6_rebade,
                                  RebadeBonus: parseFloat(
                                    parseFloat(level_5_6_rebade).toFixed(3)
                                  ),
                                  profit: parseFloat(
                                    parseFloat(level_5_6_rebade).toFixed(3)
                                  ),
                                },
                              },
                              { new: true }
                            );
                            await Other.create({
                              date: parsed_date,
                              Ammount: level_5_6_rebade,
                              inv: parseInt(level4_user["parent"]),
                            });
                            settled += `'5th->' ${level5_user["parent"]} ,rebade =  ${level_5_6_rebade}`;

                            if (level5_user && level5_user !== undefined) {
                              if (
                                level5_user["parent"] !== undefined &&
                                level5_user["parent"] !== 0
                              ) {
                                await User.findOneAndUpdate(
                                  { inv: parseInt(level5_user["parent"]) },
                                  {
                                    $inc: {
                                      Ammount: level_5_6_rebade,
                                      RebadeBonus: parseFloat(
                                        parseFloat(level_5_6_rebade).toFixed(3)
                                      ),
                                      profit: parseFloat(
                                        parseFloat(level_5_6_rebade).toFixed(3)
                                      ),
                                    },
                                  },
                                  { new: true }
                                );
                                await Other.create({
                                  date: parsed_date,
                                  Ammount: level_5_6_rebade,
                                  inv: parseInt(level5_user["parent"]),
                                });

                                settled += `'6th->' ${level5_user["parent"]} ,rebade =  ${level_5_6_rebade}`;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          // ----------------updating this user's data----------------
          await User.findOneAndUpdate(
            { inv: parseInt(level0["inv"]) },
            {
              $inc: {
                Ammount: new_amount,
                profit: new_profit,
              },
            }
          );

          await Other.create({
            date: parsed_date,
            Ammount: new_profit,
            inv: level0["inv"],
          });

          // ----------------settleing this user's bet------------------
          await Bet.findOneAndUpdate(
            { inv: level0["inv"], leagueId: level0["leagueId"] },
            {
              settled: true,
              final_score: [{ first: score_a, second: score_b }],
            }
          );
        } else if (
          level0["scoreDetails"][0]["first"] == score_a &&
          level0["scoreDetails"][0]["second"] == score_b
        ) {
          await Bet.findOneAndUpdate(
            { inv: level0["inv"], leagueId: level0["leagueId"] },
            {
              settled: true,
              final_score: [{ first: score_a, second: score_b }],
            }
          );
        }
        settled += "----------HERE ALL THE DATA OF A USER ENDS -----------";
      }
    }
    return res.send({ data: settled });
  }
};

module.exports.test_settle_bets = test_settle_bets = async (req, res) => {
  let id = req.body["id"];

  if (!id || id == "undefined") {
    return res.send({
      err: "<h1>SORRY SOMETHING WENT WRONG WITH LEAGUE ID</h1>",
    });
  } else {
    let results = { 1014210: { home: 1, away: 3 } };
    let settled = "";
    let bets = {};

    // add another querry parameter league id , cause if one user places two bets then he will get double rebade ammount; and this id you will get from user;

    let all_unsettled_bets = await Bet.find(
      { settled: false, league_type: 1, leagueId: id },
      {
        parent: 1,
        bAmmount: 1,
        leagueId: 1,
        inv: 1,
        scoreDetails: 1,
        profit: 1,
        date: 1,
        members: 1,
        ammount: 1,
        final_score: 1,
        rebade_amm: 1,
      }
    );

    if (all_unsettled_bets !== "undefined" && all_unsettled_bets) {
      if (Object.keys(all_unsettled_bets).length == 0) {
        return res.send({ err: "id not found" });
      }
    } else {
      return res.send({ err: "something went wrong" });
    }

    if (all_unsettled_bets) {
      let data = await get_settled_bet_byID(
        parseInt(all_unsettled_bets[0]["leagueId"])
      );
      data = await JSON.parse(data);

      if (data && data["response"].length) {
        let result_id = parseInt(data["response"][0]["fixture"]["id"]);
        let result_obj = data["response"][0]["goals"];
        results[result_id] = result_obj;
        settled += `RESULTS ${result_obj} -- `;
        if (result_obj["home"] === null || result_obj["away"] === null) {
          return res.send({
            status:
              "settle it using null settlement because the scores are null null",
          });
        }
      } else {
        return res.send(
          `<h1>Something went wrong try again. after checking the database or league id you entered !!!</h1>`
        );
      }
    } else {
      return res.send({
        err: "Either their is no bet to settle or you have entered wrong league id",
      });
    }

    // setting things up
    if (all_unsettled_bets && Object.keys(all_unsettled_bets[0]).length > 0) {
      for (let item of all_unsettled_bets) {
        if (!(item["leagueId"] in results)) {
          return res.send({
            err: `<h1>ODD ONE OUT PLEASE ${item["leagueId"]}</h1>`,
          });
        } else {
          //this bets object will help me fin wethere a user has placed bet or not in O(1);
          bets[item["inv"]] = item;
        }
      }
    }

    // analyze all the data
    if (all_unsettled_bets && Object.keys(all_unsettled_bets[0]).length > 0) {
      for (let level0 of all_unsettled_bets) {
        settled += `'giving bonus from ' ${level0["inv"]}`;
        // console.log(level0);
        let score0 = results[level0["leagueId"]];

        let score_a = parseInt(score0["home"]);
        let score_b = parseInt(score0["away"]);

        if (
          level0["scoreDetails"][0]["first"] !== score_a ||
          level0["scoreDetails"][0]["second"] !== score_b
        ) {
          let profit0 = parseFloat(level0["profit"]);
          let bet_ammount0 = parseFloat(level0["bAmmount"]);

          let new_amount = parseFloat(
            (bet_ammount0 + (bet_ammount0 / 100) * profit0).toFixed(2)
          );
          let new_profit = parseFloat(
            parseFloat((bet_ammount0 / 100) * profit0).toFixed(3)
          );
          let level1_rebade = parseFloat(((new_profit / 100) * 12).toFixed(2));
          let level2_rebade = parseFloat(((new_profit / 100) * 8).toFixed(2));
          let level3_rebade = parseFloat(((new_profit / 100) * 5).toFixed(2));
          let level4_rebade = parseFloat(((new_profit / 100) * 2).toFixed(2));
          let level_5_6_rebade = parseFloat(
            ((new_profit / 100) * 1).toFixed(2)
          );

          // ---------- checking if any parent exists -----------
          if (level0["parent"] && level0["parent"] !== 0) {
            let level1_user = await User.findOne({
              inv: parseInt(level0["parent"]),
            });
            settled += `'1st->' ${level0["parent"]} ,rebade =  ${level1_rebade}`;
            if (level1_user && level1_user !== undefined) {
              if (
                level1_user["parent"] !== undefined &&
                level1_user["parent"] !== 0
              ) {
                let level2_user = await User.findOne({
                  inv: parseInt(level1_user["parent"]),
                });
                settled += `'2nd->' ${level1_user["parent"]} ,rebade =  ${level2_rebade}`;
                if (level2_user && level2_user !== undefined) {
                  if (
                    level2_user["parent"] !== undefined &&
                    level2_user["parent"] !== 0
                  ) {
                    let level3_user = await User.findOne({
                      inv: parseInt(level2_user["parent"]),
                    });
                    settled += `'3rd->' ${level2_user["parent"]} ,rebade =  ${level3_rebade}`;
                    if (level3_user && level3_user !== undefined) {
                      if (
                        level3_user["parent"] !== undefined &&
                        level3_user["parent"] !== 0
                      ) {
                        let level4_user = await User.findOne({
                          inv: parseInt(level3_user["parent"]),
                        });
                        settled += `'4th->' ${level3_user["parent"]} ,rebade =  ${level4_rebade}`;
                        if (level4_user && level4_user !== undefined) {
                          if (
                            level4_user["parent"] !== undefined &&
                            level4_user["parent"] !== 0
                          ) {
                            let level5_user = await User.findOne({
                              inv: parseInt(level4_user["parent"]),
                            });

                            settled += `'5th->' ${level5_user["parent"]} ,rebade =  ${level_5_6_rebade}`;

                            if (level5_user && level5_user !== undefined) {
                              if (
                                level5_user["parent"] !== undefined &&
                                level5_user["parent"] !== 0
                              ) {
                                await User.findOne({
                                  inv: parseInt(level5_user["parent"]),
                                });

                                settled += `'6th->' ${level5_user["parent"]} ,rebade =  ${level_5_6_rebade}`;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          // ----------------settleing this user's bet------------------
          await Bet.findOneAndUpdate(
            { inv: level0["inv"], leagueId: level0["leagueId"] },
            {
              settled: false,
              final_score: [{ first: score_a, second: score_b }],
            }
          );
        } else if (
          level0["scoreDetails"][0]["first"] == score_a &&
          level0["scoreDetails"][0]["second"] == score_b
        ) {
          await Bet.findOneAndUpdate(
            { inv: level0["inv"], leagueId: level0["leagueId"] },
            {
              settled: false,
              final_score: [{ first: score_a, second: score_b }],
            }
          );
        }
        settled += "----------HERE ALL THE DATA OF A USER ENDS -----------";
      }
    }
    return res.send({ data: settled });
  }
};

module.exports.null_betss = null_bet = async (req, res) => {
  // let id = req.body['id'];
  let leagueid = req.body["league"];
  let s_first = req.body["first"];
  let s_second = req.body["second"];

  let nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
  });
  let today = new Date(nDate);
  let parsed_date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  if (
    !leagueid ||
    leagueid == "undefined" ||
    !s_first ||
    s_first == "undefined" ||
    !s_second ||
    s_second == "undefined"
  ) {
    return res.send({
      err: "<h1>SORRY SOMETHING WENT WRONG WITH LEAGUE ID</h1>",
    });
  } else {
    leagueid = parseInt(leagueid);
    s_first = parseInt(s_first);
    s_second = parseInt(s_second);

    let results = {};
    let obj = { home: s_first, away: s_second };
    results[leagueid] = obj;
    let settled = "";
    let bets = {};

    // add another querry parameter league id , cause if one user places two bets then he will get double rebade ammount; and this id you will get from user;

    let all_unsettled_bets = await Bet.find(
      { settled: false, league_type: 1, leagueId: leagueid },
      {
        parent: 1,
        bAmmount: 1,
        leagueId: 1,
        inv: 1,
        scoreDetails: 1,
        profit: 1,
        date: 1,
        members: 1,
        ammount: 1,
        final_score: 1,
        rebade_amm: 1,
      }
    );

    if (all_unsettled_bets !== "undefined" && all_unsettled_bets) {
      if (Object.keys(all_unsettled_bets).length == 0) {
        return res.send({ err: "id not found" });
      }
    } else {
      return res.send({ err: "something went wrong" });
    }

    // setting things up
    if (all_unsettled_bets && Object.keys(all_unsettled_bets[0]).length > 0) {
      for (let item of all_unsettled_bets) {
        if (!(item["leagueId"] in results)) {
          return res.send({
            err: `<h1>ODD ONE OUT PLEASE ${item["leagueId"]}</h1>`,
          });
        } else {
          //this bets object will help me fin wethere a user has placed bet or not in O(1);
          bets[item["inv"]] = item;
        }
      }
    }

    // analyze all the data
    if (all_unsettled_bets && Object.keys(all_unsettled_bets[0]).length > 0) {
      for (let level0 of all_unsettled_bets) {
        settled += `'giving bonus from ' ${level0["inv"]}`;
        let score0 = results[level0["leagueId"]];

        let score_a = parseInt(score0["home"]);
        let score_b = parseInt(score0["away"]);

        if (
          level0["scoreDetails"][0]["first"] !== score_a ||
          level0["scoreDetails"][0]["second"] !== score_b
        ) {
          let profit0 = parseFloat(level0["profit"]);
          let bet_ammount0 = parseFloat(level0["bAmmount"]);

          let new_amount = parseFloat(
            (bet_ammount0 + (bet_ammount0 / 100) * profit0).toFixed(2)
          );
          let new_profit = parseFloat(
            parseFloat((bet_ammount0 / 100) * profit0).toFixed(3)
          );
          let level1_rebade = parseFloat(((new_profit / 100) * 10).toFixed(2));
          let level2_rebade = parseFloat(((new_profit / 100) * 8).toFixed(2));
          let level3_rebade = parseFloat(((new_profit / 100) * 4).toFixed(2));
          let level4_rebade = parseFloat(((new_profit / 100) * 2).toFixed(2));
          let level_5_6_rebade = parseFloat(
            ((new_profit / 100) * 1).toFixed(2)
          );

          // ---------- checking if any parent exists -----------
          if (level0["parent"] && level0["parent"] !== 0) {
            let level1_user = await User.findOneAndUpdate(
              { inv: parseInt(level0["parent"]) },
              {
                $inc: {
                  Ammount: level1_rebade,
                  RebadeBonus: parseFloat(parseFloat(level1_rebade).toFixed(3)),
                  profit: parseFloat(parseFloat(level1_rebade).toFixed(3)),
                },
              },
              { new: true }
            );

            await Other.create({
              date: parsed_date,
              Ammount: level1_rebade,
              inv: parseInt(level0["parent"]),
            });

            settled += `'1st->' ${level0["parent"]} ,rebade =  ${level1_rebade}`;
            if (level1_user && level1_user !== undefined) {
              if (
                level1_user["parent"] !== undefined &&
                level1_user["parent"] !== 0
              ) {
                let level2_user = await User.findOneAndUpdate(
                  { inv: parseInt(level1_user["parent"]) },
                  {
                    $inc: {
                      Ammount: level2_rebade,
                      RebadeBonus: parseFloat(
                        parseFloat(level2_rebade).toFixed(3)
                      ),
                      profit: parseFloat(parseFloat(level2_rebade).toFixed(3)),
                    },
                  },
                  { new: true }
                );

                await Other.create({
                  date: parsed_date,
                  Ammount: level2_rebade,
                  inv: parseInt(level1_user["parent"]),
                });

                settled += `'2nd->' ${level1_user["parent"]} ,rebade =  ${level2_rebade}`;
                if (level2_user && level2_user !== undefined) {
                  if (
                    level2_user["parent"] !== undefined &&
                    level2_user["parent"] !== 0
                  ) {
                    let level3_user = await User.findOneAndUpdate(
                      { inv: parseInt(level2_user["parent"]) },
                      {
                        $inc: {
                          Ammount: level3_rebade,
                          RebadeBonus: parseFloat(
                            parseFloat(level3_rebade).toFixed(3)
                          ),
                          profit: parseFloat(
                            parseFloat(level3_rebade).toFixed(3)
                          ),
                        },
                      },
                      { new: true }
                    );
                    await Other.create({
                      date: parsed_date,
                      Ammount: level3_rebade,
                      inv: parseInt(level2_user["parent"]),
                    });
                    settled += `'3rd->' ${level2_user["parent"]} ,rebade =  ${level3_rebade}`;
                    if (level3_user && level3_user !== undefined) {
                      if (
                        level3_user["parent"] !== undefined &&
                        level3_user["parent"] !== 0
                      ) {
                        let level4_user = await User.findOneAndUpdate(
                          { inv: parseInt(level3_user["parent"]) },
                          {
                            $inc: {
                              Ammount: level4_rebade,
                              RebadeBonus: parseFloat(
                                parseFloat(level4_rebade).toFixed(3)
                              ),
                              profit: parseFloat(
                                parseFloat(level4_rebade).toFixed(3)
                              ),
                            },
                          },
                          { new: true }
                        );
                        await Other.create({
                          date: parsed_date,
                          Ammount: level4_rebade,
                          inv: parseInt(level3_user["parent"]),
                        });
                        settled += `'4th->' ${level3_user["parent"]} ,rebade =  ${level4_rebade}`;
                        if (level4_user && level4_user !== undefined) {
                          if (
                            level4_user["parent"] !== undefined &&
                            level4_user["parent"] !== 0
                          ) {
                            let level5_user = await User.findOneAndUpdate(
                              { inv: parseInt(level4_user["parent"]) },
                              {
                                $inc: {
                                  Ammount: level_5_6_rebade,
                                  RebadeBonus: parseFloat(
                                    parseFloat(level_5_6_rebade).toFixed(3)
                                  ),
                                  profit: parseFloat(
                                    parseFloat(level_5_6_rebade).toFixed(3)
                                  ),
                                },
                              },
                              { new: true }
                            );

                            await Other.create({
                              date: parsed_date,
                              Ammount: level_5_6_rebade,
                              inv: parseInt(level4_user["parent"]),
                            });

                            settled += `'5th->' ${level5_user["parent"]} ,rebade =  ${level_5_6_rebade}`;

                            if (level5_user && level5_user !== undefined) {
                              if (
                                level5_user["parent"] !== undefined &&
                                level5_user["parent"] !== 0
                              ) {
                                await User.findOneAndUpdate(
                                  { inv: parseInt(level5_user["parent"]) },
                                  {
                                    $inc: {
                                      Ammount: level_5_6_rebade,
                                      RebadeBonus: parseFloat(
                                        parseFloat(level_5_6_rebade).toFixed(3)
                                      ),
                                      profit: parseFloat(
                                        parseFloat(level_5_6_rebade).toFixed(3)
                                      ),
                                    },
                                  },
                                  { new: true }
                                );
                                await Other.create({
                                  date: parsed_date,
                                  Ammount: level_5_6_rebade,
                                  inv: parseInt(level5_user["parent"]),
                                });
                                settled += `'6th->' ${level5_user["parent"]} ,rebade =  ${level_5_6_rebade}`;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          // ----------------updating this user's data----------------
          let valid_amount = parseFloat((bet_ammount0 * 0.4).toFixed(2));
          await User.findOneAndUpdate(
            { inv: parseInt(level0["inv"]) },
            {
              $inc: {
                valid_amount: valid_amount,
                Ammount: new_amount,
                profit: new_profit,
              },
            }
          );

          // ----------------settleing this user's bet------------------
          await Bet.findOneAndUpdate(
            { inv: level0["inv"], leagueId: level0["leagueId"] },
            {
              settled: true,
              final_score: [{ first: score_a, second: score_b }],
            }
          );
        } else if (
          level0["scoreDetails"][0]["first"] == score_a &&
          level0["scoreDetails"][0]["second"] == score_b
        ) {
          await Bet.findOneAndUpdate(
            { inv: level0["inv"], leagueId: level0["leagueId"] },
            {
              settled: true,
              final_score: [{ first: score_a, second: score_b }],
            }
          );
        }
        settled += "----------HERE ALL THE DATA OF A USER ENDS -----------";
      }
    }
    return res.send({ data: settled });
  }
};

module.exports.get_settle_deposit_data = get_settle_deposit_data = async (
  req,
  res
) => {
  let { invitation_code, amount, transactioin_id } = req.body;

  invitation_code = parseInt(invitation_code);

  if (!invitation_code || !amount) {
    return res.send({ status: 2 });
  } else {
    transactioin_id = transactioin_id.trim();
    let deposit_data = await Deposit.findOne({
      inv: invitation_code,
      transactioin_id: transactioin_id,
      status: 0,
    });

    if (deposit_data !== "undefined" && deposit_data) {
      let user_data = await User.findOne(
        { inv: invitation_code },
        { Ammount: 1, inv: 1, parent: 1, max_deposit: 1 }
      );
      let parent = await User.findOne(
        { inv: user_data["parent"] },
        { Ammount: 1 }
      );

      req.session.max_deposit = user_data["max_deposit"];

      return res.send({ parent, user_data, deposit_data });
    } else {
      return res.send({ status: 3 }); //data not found
    }
  }
};

module.exports.settle_deposit = settle_deposit = async (req, res) => {
  let { invitation_code, amount, transactioin_id } = req.body;
  let nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
  });
  let today = new Date(nDate);
  let parsed_date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  if (invitation_code && amount && transactioin_id) {
    amount = parseFloat(amount);

    let parent_profit = parseFloat((0.02 * amount).toFixed(2));
    let user_profit = parseFloat((0.04 * amount).toFixed(2));
    let vip = 0;

    // update the amount of both user and parent and send the data to admin;
    let user_data = await User.findOne({ inv: invitation_code });

    if (
      !user_data ||
      user_data == "undefined" ||
      user_data["first_deposit"] == "undefined"
    ) {
      return res.send({ status: "DATA NOT FOUND CHECK THE DATABASE " });
    }

    let vip_level = getVipLevel(amount);

    if (user_data["first_deposit"] === true) {
      // updating the parent
      if (user_data["parent"] !== 0) {
        let updated_parent = await User.findOneAndUpdate(
          { inv: user_data["parent"] },
          {
            $inc: {
              Ammount: parent_profit,
              profit: parent_profit,
              promotion_bonus: parent_profit,
            },
          }
        );
      }

      // updating the user;
      let value = amount + user_profit;
      value = parseFloat(value.toFixed(2));
      await User.findOneAndUpdate(
        { inv: invitation_code },
        {
          $inc: {
            Ammount: value,
            deposit: amount,
            promotion_bonus: user_profit,
            valid_deposit: amount * 2,
          },
          vipLevel: vip_level,
          first_deposit: false,
          max_deposit: amount,
        }
      );

      await Other.create({
        date: parsed_date,
        Ammount: user_profit,
        inv: invitation_code,
      });

      await Other.create({
        date: parsed_date,
        Ammount: parent_profit,
        inv: user_data["parent"],
      });

      await Deposit.findOneAndUpdate(
        { inv: invitation_code, transactioin_id: transactioin_id },
        { status: 1 }
      );

      return res.send({
        "Amount updated by ": amount + user_profit,
        "parent updated by": parent_profit,
      });
    } else {
      amount = parseFloat(amount.toFixed(2));
      vip_level =
        parseInt(user_data.vipLevel) < vip_level
          ? vip_level
          : user_data.vipLevel;
      if (
        req.session.max_deposit !== "undefined" &&
        req.session.max_deposit &&
        req.session.max_deposit < amount
      ) {
        await User.findOneAndUpdate(
          { inv: invitation_code },
          {
            $inc: {
              Ammount: amount,
              deposit: amount,
              valid_deposit: amount * 2,
            },
            vipLevel: vip_level,
            max_deposit: amount,
          }
        );
      } else {
        await User.findOneAndUpdate(
          { inv: invitation_code },
          {
            $inc: {
              Ammount: amount,
              deposit: amount,
              valid_deposit: amount * 2,
            },
            vipLevel: vip_level,
          }
        );
      }

      await Deposit.findOneAndUpdate(
        { inv: invitation_code, transactioin_id: transactioin_id },
        { status: 1 }
      );
      parent_profit = 0;
      return res.send({ "ammount update by ": amount });
    }
  } else {
    return res.send({ status: 3 });
  }
};

module.exports.settle_usdt_deposit = settle_usdt_deposit = async (req, res) => {
  let { invitation_code, amount, transactioin_id } = req.body;
  let nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
  });
  let today = new Date(nDate);
  let parsed_date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  if (invitation_code && amount && transactioin_id) {
    amount = parseFloat(amount);
    amount = amount * 80;
    let parent_profit = parseFloat((0.02 * amount).toFixed(2));
    let user_profit = parseFloat((0.04 * amount).toFixed(2));

    // update the amount of both user and parent and send the data to admin;
    let user_data = await User.findOne({ inv: invitation_code });

    if (
      !user_data ||
      user_data == "undefined" ||
      user_data["first_deposit"] == "undefined"
    ) {
      return res.send({ status: "DATA NOT FOUND CHECK THE DATABASE " });
    }

    let vip = getVipLevel(amount);
    vip =
      vip > parseInt(user_data?.vipLevel) ? vip : parseInt(user_data?.vipLevel);

    if (user_data["first_deposit"] === true) {
      // updating the parent
      if (user_data["parent"] !== 0) {
        let updated_parent = await User.findOneAndUpdate(
          { inv: user_data["parent"] },
          {
            $inc: {
              Ammount: parent_profit,
              profit: parent_profit,
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
        { inv: invitation_code },
        {
          $inc: {
            Ammount: value,
            deposit: amount,
            promotion_bonus: user_profit,
            valid_deposit: amount * 2,
          },
          vipLevel: vip,
          first_deposit: false,
          max_deposit: amount,
        }
      );

      await Other.create({
        date: parsed_date,
        Ammount: user_profit,
        inv: invitation_code,
      });

      await Other.create({
        date: parsed_date,
        Ammount: parent_profit,
        inv: user_data["parent"],
      });

      await Deposit.findOneAndUpdate(
        { inv: invitation_code, transactioin_id: transactioin_id },
        { status: 1 }
      );

      return res.send({
        "Amount updated by ": amount + user_profit,
        "parent updated by": parent_profit,
      });
    } else {
      amount = parseFloat(amount.toFixed(2));

      if (
        req.session.max_deposit !== "undefined" &&
        req.session.max_deposit &&
        req.session.max_deposit < amount
      ) {
        await User.findOneAndUpdate(
          { inv: invitation_code },
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
          { inv: invitation_code },
          {
            $inc: {
              Ammount: amount,
              deposit: amount,
              valid_deposit: amount * 2,
            },
          }
        );
      }

      await Deposit.findOneAndUpdate(
        { inv: invitation_code, transactioin_id: transactioin_id },
        { status: 1 }
      );
      parent_profit = 0;
      return res.send({ "ammount update by ": amount });
    }
  } else {
    return res.send({ status: 3 });
  }
};

module.exports.settle_withdrawal = settle_withdrawal = async (req, res) => {
  let { id, amount, transactioin_id } = req.body;
  if (!id || id == "undefined" || !amount || amount == "undefined") {
    return res.send({ status: "Enter a invitation code first" });
  } else {
    id = parseInt(id);
    amount = parseFloat(amount);

    let data = await Withdrawal.findOneAndUpdate(
      { inv: id, transactioin_id: transactioin_id, Ammount: amount, status: 0 },
      {
        status: 1,
      },
      { new: true }
    );

    return res.send({ status: data });
  }
};

module.exports.done_some_shit = done_some_shit = async (req, res) => {
  let id = req.body.league_id;

  if (id && id !== "undefined") {
    id = parseInt(id);
    console.log("id -> ", id);
    let bets_to_fix = await Bet.find({ leagueId: id, settled: false });
    if (bets_to_fix && bets_to_fix !== undefined) {
      if (Object.keys(bets_to_fix[0]).length > 0) {
        for (let bet of bets_to_fix) {
          let updated = await User.findOneAndUpdate(
            { inv: bet["inv"] },
            {
              $inc: {
                Ammount: parseFloat(bet["bAmmount"]),
                betPlayed: -1,
              },
            }
          );
          let x = await Bet.findOneAndUpdate(
            { inv: bet["inv"], leagueId: id },
            {
              final_score: [{ first: -1, second: -1 }],
              settled: true,
            }
          );
        }
        return res.send({ status: "fixed" });
      } else {
        return res.send({ err: "no bets to delete" });
      }
    } else {
      return res.send({ err: "something went wrong" });
    }
  } else {
    return res.send({ err: "enter a valid league id" });
  }
};

module.exports.deposit_find = deposit_find = async (req, res) => {
  let deposit_data = await Deposit.find();
  let revenue_generated = 0;
  if (Object.keys(deposit_data[0]).length > 0) {
    for (let deposit of deposit_data) {
      revenue_generated += parseFloat(deposit["Ammount"]);
    }

    return res.send({ revenue: revenue_generated });
  } else {
    return res.send({ err: "something went wrong" });
  }
};

module.exports.cancel_withdrawal = cancel_withdrawal = async (req, res) => {
  let { amount, transactionid, inv_code } = req.body;

  if (
    !amount ||
    amount == "undefined" ||
    !transactionid ||
    transactionid == "undefined" ||
    !inv_code ||
    inv_code == "undefined"
  ) {
    return res.send({ err: "enter valid values" });
  } else {
    amount = parseFloat(amount);
    inv_code = parseInt(inv_code);

    let withdrawal = await Withdrawal.findOne({
      Ammount: amount,
      transactioin_id: transactionid,
      inv: inv_code,
      status: 0,
    });

    if (withdrawal) {
      let deduct_amount = amount - 2 * amount;
      await Withdrawal.findOneAndUpdate(
        {
          Ammount: amount,
          transactioin_id: transactionid,
          inv: inv_code,
          status: 0,
        },
        { status: 2 }
      );
      await User.findOneAndUpdate(
        { inv: inv_code },
        {
          $inc: {
            Ammount: amount,
            day_withdrawal: -1,
            Withdrawals: -1,
            withdrawalAmmount: deduct_amount,
          },
        }
      );
      return res.send({ done: "it was fixed" });
    } else {
      return res.send({ err: "no data found" });
    }
  }
};

module.exports.change_upi = change_upi = async (req, res) => {
  let new_upi_id = req.body.upi_id;
  if (!new_upi_id || new_upi_id == undefined) {
    return res.send({ status: 0 });
  } else {
    Upi.findOneAndUpdate({ upi: 1 }, { UPI: new_upi_id })
      .then(() => res.send({ status: 1, upi: new_upi_id }))
      .catch((err) => {
        return res.send({ staus: 0 });
      });
  }
};

module.exports.update_channel_4_details = update_channel_4_details = async (
  req,
  res
) => {
  let { account_name, bank_name, ac_number, ifsc } = req.body;
  if (!ac_number || !bank_name || !account_name || !ifsc) {
    return res.send("Enter valid details");
  }

  try {
    let data = await Imps_data.findOneAndUpdate(
      { data: 1 },
      {
        ac_name: account_name,
        bank_name: bank_name,
        ac_number: ac_number,
        ifsc_code: ifsc,
      }
    );
    if (!data) {
      return res.send({ status: "Something went wrong" });
    }
    return res.send({ status: 1, message: "Done updated" });
  } catch (error) {
    return res.send({ status: "something went wrong" });
  }
};

async function get_settled_bet_byID(id) {
  var options = {
    method: "GET",
    url: `https://v3.football.api-sports.io/fixtures`,
    qs: { id: id },
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "021ae6685ec46e47ec83f8848ac1d168",
      // "x-rapidapi-key": "823296afa77a4989062591abc46178ee"
    },
  };

  return new Promise(function (resolve, reject) {
    request(options, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

// phone 6*10 am2814 ->  phone 7*10 -> 799225 am 1025.

// test -----------------------------
const { bulkWrite } = require("mongoose");

module.exports.null_bet = async (req, res) => {
  const leagueid = parseInt(req.body["league"]);
  const s_first = parseInt(req.body["first"]);
  const s_second = parseInt(req.body["second"]);
  const g_first = parseInt(req.body["g_first"]);
  const g_second = parseInt(req.body["g_second"]);

  let create_other_data = [];
  let update_user = [];
  let update_bet = [];

  if (!leagueid || isNaN(s_first) || isNaN(s_second))
    return res.send({ err: "Enter all the fields" });

  try {
    let Unsettled_bets = await Bet.find(
      { settled: false, leagueId: Number(leagueid) },
      { _id: 0, date: 0, time: 0 }
    );

    if (!Unsettled_bets || Unsettled_bets?.length < 1)
      throw new Error("No unsettled bets found.");

    for (let bet of Unsettled_bets) {
      let bet_amount = Number(bet?.bAmmount);
      let bet_profit = Number(bet?.profit);
      let bet_score_first = Number(bet?.scoreDetails[0]?.first);
      let bet_score_second = Number(bet?.scoreDetails[0]?.second);
      let user_profit = (bet_amount / 100) * bet_profit;
      if (!bet_amount || !bet_profit) throw new Error("something went wrong ");

      if (bet_score_first !== s_first || bet_score_second !== s_second) {
        // now user has lost this bet and will loose;
        update_bet.push({
          updateOne: {
            filter: { leagueId: leagueid, inv: bet?.inv },
            update: {
              $set: {
                settled: true,
                final_score: [{ first: g_first, second: g_second }],
              },
              $mul: {
                bAmmount: -1,
              },
            },
          },
        });
        continue;
      }

      let new_amount = parseFloat(
        (bet_amount + (bet_amount / 100) * bet_profit).toFixed(2)
      );
      let new_profit = parseFloat(
        parseFloat((bet_amount / 100) * bet_profit).toFixed(2)
      );

      if (Number(bet?.parent) !== 0) {
        // search for parents and give their rebates;
        await update_parents(
          Number(bet?.parent),
          user_profit,
          create_other_data,
          update_user
        );
      }

      // update the user that placed the bet;
      update_user.push({
        updateOne: {
          filter: { inv: Number(bet?.inv) },
          update: {
            $inc: {
              valid_amount: Number((bet_amount * 0.4).toFixed(2)),
              Ammount: new_amount,
              profit: new_profit,
            },
          },
        },
      });
      // settle current bet of the user;
      update_bet.push({
        updateOne: {
          filter: { leagueId: leagueid, inv: bet?.inv },
          update: {
            $set: {
              settled: true,
              final_score: [{ first: g_first, second: g_second }],
            },
          },
        },
      });
    }

    // here every bet is settled , now we can write it in database;
    await User.bulkWrite(update_user);
    await Bet.bulkWrite(update_bet);
    await Other.bulkWrite(create_other_data);

    return res.send({
      update_user: update_user,
    });
  } catch (error) {
    create_other_data = [];
    update_user = [];
    update_bet = [];
    return res.json({ err: error?.message || "something went wrong" });
  }
};

async function update_parents(
  parent,
  user_profit,
  create_other_data,
  update_user
) {
  let rebade_percent = [10, 8, 4, 2, 1, 1];
  let level = 1;
  let today = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    })
  );
  while (level <= 6 && parent !== 0) {
    try {
      let rebade = Number(
        ((user_profit / 100) * rebade_percent[level - 1]).toFixed(2)
      );
      update_user.push({
        updateOne: {
          filter: { inv: parent },
          update: {
            $inc: {
              Ammount: rebade,
              RebadeBonus: rebade,
              profit: rebade,
            },
          },
        },
      });
      create_other_data.push({
        insertOne: {
          document: {
            date: `${today.getDate()}/${
              today.getMonth() + 1
            }/${today.getFullYear()}`,
            Ammount: rebade,
            inv: parent,
          },
        },
      });
      let new_parent = await User.findOne({ inv: parent }, { parent: 1 });
      if (!new_parent) {
        parent = 0;
      } else {
        parent = Number(new_parent?.parent);
      }
    } catch (error) {
      create_other_data = [];
      update_user = [];
      update_bet = [];
      throw new Error(error?.message || error);
    } finally {
      level++;
    }
  }
}

function getVipLevel(amount) {
  if (amount >= 200000 && amount < 600000) {
    return 1;
  } else if (amount >= 600000 && amount < 1200000) {
    return 2;
  } else if (amount >= 1200000 && amount < 2000000) {
    return 3;
  } else if (amount >= 2000000 && amount < 3000000) {
    return 4;
  } else if (amount >= 3000000 && amount < 4000000) {
    return 5;
  } else if (amount >= 4000000 && amount < 5000000) {
    return 6;
  } else if (amount > 5000000) {
    return 7;
  }
  return 0;
}

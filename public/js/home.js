function select(tag) {
  return document.querySelector(`${tag}`);
}
function selectAll(tag) {
  return document.querySelectorAll(`${tag}`);
}

let popup_page = select("#popup_page");
let popup_tip = select("#popup_tip");

const home = document.querySelector(".app");
const vipcantainer = document.querySelector(".VIPbox");
const tir = document.querySelector(".tir");
const carousel = document.querySelector(".crouselCantainer");
const footer = document.querySelector(".footerCantainer");
let x = false;

window.addEventListener("load", () => {
  let scale_object = document.querySelector(".loader");
  scale_object.style.animation = "shadowPulse 2s linear infinite";
  setTimeout(() => {
    let elem = document.querySelector("#loading");
    elem.remove();
  }, 3000);
});

const announcement = document.querySelector(".announcement");
function announcement_calling() {
  announcement.style.cssText = `transform:translateY(0);
  `;
  document.querySelector("#close").style.display = "block";
  home.style.filter = "blur(5px)";
  footer.style.filter = "blur(5px)";
}

announcement_calling();

document.querySelector("#close").addEventListener("click", () => {
  announcement.style.cssText = `translateY(-120vh);`;
  home.style.filter = "blur(0)";
  footer.style.filter = "blur(0)";
  document.querySelector("#close").style.display = "none";
});

const popup_close_btn = document.querySelector("#popup_close_btn");
popup_close_btn.addEventListener("click", () => {
  document.querySelector("#popup_page").style.left = "-100vw";
  popup_tip.innerText = "Loading...";
});

// ----------------------------------------------------------------- service center -----------------------------------------------
document.querySelector(".telbox").addEventListener("click", () => {
  window.location.href = "https://t.me/customerservice_CS";
});

document.querySelector(".onlieser").addEventListener("click", () => {
  window.location.href = "https://t.me/+HJ0wT7JQA7wwY2E9";
});

//-------------------------------- carousel eventlistner -----------------------------------------------
// carousel.addEventListener("click", () => {
//   home.style.transform = "translateX(100vw)"
//   vipcantainer.style.transform = "translateX(0)";
//   footer.style.transform = "translateX(100vw)";

// });

// tir.addEventListener("click", () => {
//   vipcantainer.style.transform = "translateX(100vw)";
//   home.style.transform = "translateX(0)";
//   footer.style.transform = "translateX(0)";

// });

//-------------------------------- checkbox eventlistner -----------------------------------------------
// const checks = document.querySelector(".checkbox");
// checks.addEventListener("click", () => {
//   home.style.cssText = `
//   transform:translateX(100vw);
// `;
//   footer.style.transform = "translateX(100vw)";
//   vipcantainer.style.transform = "translateX(0)";
// });

//-------------------------------- recharge eventlistner -----------------------------------------------

const rechargeCantainer = document.querySelector(".recharge");
const recoPopup = document.querySelector(".recoPopup");
const withdrawalCantainer = document.querySelector(".withdrawalCantainer");
const allListner = document.querySelectorAll(".itemuis");
const ruleCantainer = document.querySelector(".ruleCantainer");
const serviceCantainer = document.querySelector(".serviceCantainer");

allListner.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id == "one") {
      home.style.cssText = `
      transform:translateX(-120vw);
      `;
      footer.style.transform = "translateX(120vw)";
      rechargeCantainer.style.transform = "translateX(0)";
      document.querySelector("#chat-widget-container").style.display = "none";
    } else if (element.id == "two") {
      home.style.cssText = `
      transform:translateX(-120vw);
      `;
      footer.style.transform = "translateX(120vw)";
      withdrawalCantainer.style.transform = "translateX(0)";

      document.querySelector("#chat-widget-container").style.display = "none";
    } else if (element.id == "three") {
      home.style.cssText = `
      transform:translateX(-120vw);
      `;
      footer.style.transform = "translateX(120vw)";
      ruleCantainer.style.transform = "translateX(0)";

      document.querySelector("#chat-widget-container").style.display = "none";
    } else if (element.id == "four") {
      home.style.cssText = `
      transform:translateX(-120vw);
      `;
      footer.style.transform = "translateX(120vw)";
      serviceCantainer.style.transform = "translateX(0)";

      document.querySelector("#chat-widget-container").style.display = "block";
    }
  });
});

// ----------------------------- back to homge page funtion ------------------------------
const tirs = document.querySelectorAll(".tirs");
tirs.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id == "tirOne") {
      rechargeCantainer.style.transform = "translateX(120vw)";
      recoPopup.style.transform = "translateX(120vw)";
      home.style.cssText = `
      transform:translateX(0);
      `;
      footer.style.transform = "translateX(0)";
    } else if (element.id == "tirTwo") {
      home.style.cssText = `
      transform:translateX(0);
      `;
      footer.style.transform = "translateX(0)";
      withdrawalCantainer.style.transform = "translateX(-120vw)";
    } else if (element.id == "tirThree") {
      home.style.cssText = `
      transform:translateX(0);
      `;
      footer.style.transform = "translateX(0)";
      ruleCantainer.style.transform = "translateX(-120vw)";
    } else if (element.id == "tirFour") {
      home.style.cssText = `
      transform:translateX(0);
      `;
      footer.style.transform = "translateX(0)";
      serviceCantainer.style.transform = "translateX(-120vw)";
    }
  });
});

// recoPopup.addEventListener('click', (e) => {
//   e.preventDefault();
//   recoPopup.style.transform = "translateX(0)";

// });

const accordionContent = document.querySelectorAll(".accordion-content");

accordionContent.forEach((item, index) => {
  let header = item.querySelector("header");
  header.addEventListener("click", () => {
    item.classList.toggle("is-open");

    let description = item.querySelector(".accordion-content-description");
    if (item.classList.contains("is-open")) {
      // Scrollheight property return the height of
      // an element including padding
      description.style.height = `${description.scrollHeight}px`;
      item.querySelector("i").classList.replace("fa-plus", "fa-minus");
    } else {
      description.style.height = "0px";
      item.querySelector("i").classList.replace("fa-minus", "fa-plus");
    }
    // function to pass the index number of clicked header
    removeOpenedContent(index);
  });
});

function removeOpenedContent(index) {
  accordionContent.forEach((item2, index2) => {
    if (index != index2) {
      item2.classList.remove("is-open");
      let descrip = item2.querySelector(".accordion-content-description");
      descrip.style.height = "0px";
      item2.querySelector("i").classList.replace("fa-minus", "fa-plus");
    }
  });
}

// ------------------------------------- Add  Account popup -----------------------------------------------
const account = document.querySelector(".withdrawalInput");
const AccountCantain = document.querySelector("#Account");
account.addEventListener("click", () => {
  AccountCantain.style.transform = "translateX(0)";
});

const accountBack = document.querySelector("#accountBack");
accountBack.addEventListener("click", () => {
  AccountCantain.style.transform = "translateX(100vw)";
});

// ------------------------ back btn form competition details --------------------------------------------------

const betBtn = document.querySelector("#betBtn");
const popCantain = document.querySelector(".popCantain");

betBtn.addEventListener("click", () => {
  popCantain.style.zIndex = "-1";
  home.style.zIndex = "1";
});

// ------------------------------------------- bet popup -----------------------------------------
let betpop = document.querySelector(".placebet");
let matchList = document.querySelector(".matchPopUp");

document.querySelector(".betHead > ion-icon").addEventListener("click", () => {
  betpop.style.cssText = `
   transform: translateY(200vh);  
   transition: all 1s linear;
   `;
  matchList.style.cssText = `filter: brightness(100%);`;
});

// --------------------------------------------------- creating the match -------------------------------------------------------
function create_match(data) {
  let ndate = new Date(data["raw_date"].slice(0, -1)).toLocaleString("en-Us", {
    timeZone: "Asia/Calcutta",
  });
  let date = new Date(ndate);

  let parent_box = document.querySelector(".collection");
  let match_card = document.createElement("div");
  match_card.classList.add("gameBox");
  match_card.classList.add("bet_card");

  let body = `
     <div class="dataDiv">
                          <div class="tName">
                              <p class="circle"></p>
                              <p class="ellipsis-1 namematch" data-v-7afa3138="">
                              <p  class="league_id" id="league_id">${
                                data["fixture_id"]
                              }</p>
                              <p class="ellipsis-1 namematch" data-v-7afa3138="" id="final_league_name">${
                                data["league"]
                              }</p>
                          </div>
                          <div class="date">
                              <p>${[
                                date.getFullYear(),
                                date.getMonth() + 1,
                                date.getDate(),
                              ].join("|")}</p>
                          </div>
                      </div>

                      <div class="match">

                          <div class="t teamOne">
                              <p class="nameu leftnamei ellipsis-2" data-v-7afa3138="" id="initial_team_a">
                                  ${data["team_a"]}
                              </p>
                              <div class="teamLogo">
                                  <img src="/elephantFootball/football.png" alt="" srcset="" id='logo_a'>
                              </div>
                          </div>

                          <div class="t vs">
                              <p data-v-7afa3138=""style="color:#007aff">VS</p>
                          </div>

                          <div class="t teamOne">
                              <div class="teamLogo">
                                  <img src="/elephantFootball/football.png" alt="" srcset="" id="logo_b">
                              </div>
                              <p class="nameu leftnamei ellipsis-2" data-v-7afa3138=""  id="initial_team_b">
                                  ${data["team_b"]}
                              </p>
                          </div>
                      </div>

                      <p id='initial_time' style="text-align:center;color:red;font-weight:800;letter-spacing:2px">${date.getHours()}:${date.getMinutes()}</p>

                     
  `;

  match_card.innerHTML = body;
  parent_box.append(match_card);
}

// --------------------------------------------------- calling the api from the backend -------------------------------------------------------
async function get_live_bets() {
  let res = await fetch("/get_live_bets");
  res = await res.json();

  // from here I have to call the store data function by passing the arguments key and array.
  let count_matches = 0;
  for (let match_data of res) {
    if (count_matches === 10) {
      break;
    }
    if ("percentage" in match_data) {
      create_match(match_data);
      count_matches++;
      percentage[match_data["fixture_id"]] = match_data["percentage"];
    }
  }
  load_bet_box();
}

get_live_bets();

// --------------------------------------------------- checking the date -------------------------------------------------------
function check_date(date, time) {
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

  // console.log(m_hours);

  let minutes_now = parseInt(today.getMinutes());
  let hours_now = parseInt(today.getHours());
  minutes_now += 5;
  if (minutes_now > 60) {
    minutes_now = minutes_now - 60;
    hours_now += 1;
  }

  let valid_date = parseInt(today.getDate()) == m_date;
  let valid_hour = hours_now < m_hours;
  let valid_minutes = minutes_now < m_minutes;
  let equal_hours = hours_now === m_hours;
  // console.log(hours_now, m_hours, minutes_now, m_minutes);
  let to_return = "";

  if ((valid_date && valid_hour) || (equal_hours && valid_minutes)) {
    to_return = `<div class="trade_cancel_btn">
      <i class="fa-solid fa-angles-up"></i>
      <h3>CANCEL</h3>
      </div>`;
    return to_return;
  }

  return to_return;
}

// -------------------------- profit percentage --------------------------------------------------------------------
let percentage = {};

// --------------------------------------------------- load bet percentage -------------------------------------------------------
function load_bet_percentages(id) {
  let bet_box = document.querySelectorAll(".oddch > p");
  // let rand_box = document.querySelectorAll('.rand_numb');

  let time = new Date().getHours();
  let date = Date();
  let today = date.slice(0, 3);

  // here instead of getting the values from profit_percents i will get it from local storage;
  let percentage_array = percentage[id];

  if (percentage_array == undefined || !percentage_array) {
    window.location.href = window.location.origin + "/login";
  }

  bet_box.forEach((item, i) => {
    item.innerText = percentage_array[i] + "%";
  });
}

// --------------------------------------------------- load bet function -------------------------------------------------------
function load_bet_box() {
  document.querySelectorAll(".bet_card").forEach((item, i) => {
    item.addEventListener("click", () => {
      let league_id = item.querySelector("#league_id").innerText;
      document.querySelector("#final_league_id").innerText = league_id;
      let team_a = item.querySelector("#initial_team_a").innerText;
      let team_b = item.querySelector("#initial_team_b").innerText;
      document.querySelector("#team_a_logo").src =
        item.querySelector("#logo_a").src;
      document.querySelector("#team_b_logo").src =
        item.querySelector("#logo_b").src;
      document.querySelectorAll(".final_league").forEach((item2, i) => {
        item2.innerText = item.querySelector("#final_league_name").innerText;
      });
      document.querySelector("#b_time").innerText =
        item.querySelector("#initial_time").innerText;

      document.querySelectorAll(".team_a").forEach((item1, i) => {
        item1.innerText = team_a;
      });
      document.querySelectorAll(".team_b").forEach((item1, i) => {
        item1.innerText = team_b;
      });

      let today = new Date();
      document.querySelector("#b_date").innerText = `${today.getDate()}/${
        today.getMonth() + 1
      }/${today.getFullYear()}`;

      let percentage_array = load_bet_percentages(league_id);

      popCantain.style.zIndex = "1";
      home.style.zIndex = "-1";
    });
  });
}

// ---------------------------------------------------  bet pop up function -------------------------------------------------------
document.querySelectorAll(".matchscore").forEach((element) => {
  element.addEventListener("click", () => {
    matchList.style.cssText = `filter: brightness(50%);`;
    betpop.style.cssText = `
     transform: translateY(0);
     transition: all 500ms linear;
     `;

    let x = element.querySelectorAll("p");
    document.querySelector("#score").innerText = x[0].innerText;
    document.querySelector("#p").innerText = x[1].innerText;
  });
});

// --------------------------------------------------- calc bet function -------------------------------------------------------
function calc_available() {
  let value = parseFloat(document.querySelector("#bet_amount").value);
  if (!value) {
    document.querySelector("#available").innerText = "00" + "Rs";
  } else {
    let profit = document.querySelector("#p").innerText.replace(/\d%/, "");
    profit = parseFloat(profit);
    value = parseFloat(((Math.floor(value) / 100) * profit).toFixed(2));
    document.querySelector("#available").innerText = value;
  }
}

document.querySelector("#bet_amount").addEventListener("keyup", calc_available);

// bets_amount input_btns
document.querySelectorAll(".values > span").forEach((item, i) => {
  item.addEventListener("click", () => {
    if (i !== 5) {
      let value = item.innerText.replace(/\D/, "");
      document.querySelector("#bet_amount").value = parseFloat(value);
      calc_available();
    } else {
      let text = document.querySelector(".s_balance").innerText;
      let values = text.match(/[+-]?\d+(\.\d+)?/g);
      document.querySelector("#bet_amount").value = Math.floor(
        parseFloat(values[0])
      );
      calc_available();
    }
  });
});

const All = document.querySelector("#All");
All.addEventListener("click", () => {
  let text = document.querySelector(".s_balance").innerText;
  document.querySelector("#bet_amount").value = parseFloat(text);
  calc_available();
});

// --------------------------------------------------- place bet section function ends -------------------------------------------------------
let popup_cancel_btn = document.querySelector("#popup_close_btn");

document.querySelector("#confirm").addEventListener("click", async () => {
  let button = document.querySelector("#confirm");
  // button.disabled = true;
  popup_tip = document.querySelector("#popup_tip");

  popup_page.style.left = "0px";
  popup_cancel_btn.disabled = true;

  let league_id = document.querySelector("#final_league_id").innerText;
  let league_name = document.querySelector("#league_name").innerText;
  let teama = document.querySelector("#team_a").innerText;
  let teamb = document.querySelector("#team_b").innerText;
  let date = document.querySelector("#b_date").innerText;
  let time = document.querySelector("#b_time").innerText;
  let amount = document.querySelector("#bet_amount").value;
  let score = document.querySelector("#score").innerText;
  let profit = document.querySelector("#p").innerText;
  score = score.split("-");
  let score_first = parseInt(score[0]);
  let score_second = parseInt(score[1]);

  let data = {};

  data["league_id"] = parseInt(league_id);
  data["league"] = league_name;
  data["team_a"] = teama;
  data["team_b"] = teamb;
  data["date"] = date;
  data["time"] = time;
  data["first"] = score_first;
  data["second"] = score_second;
  data["profit"] = parseFloat(profit.replace(/\b%/, ""));
  data["ammount"] = Math.floor(parseFloat(amount));
  data["l_type"] = parseInt(
    league_name === "virtual" || league_name === "VIRTUAL" ? 0 : 1
  );

  if (
    data["league_id"] == undefined ||
    !data["league_id"] ||
    data["league"] == undefined ||
    !data["league"] ||
    data["team_a"] == undefined ||
    !data["team_a"] ||
    data["team_b"] == undefined ||
    !data["team_b"] ||
    data["date"] == undefined ||
    !data["date"] ||
    data["time"] == undefined ||
    !data["time"] ||
    data["first"] == undefined ||
    data["first"] === "" ||
    data["second"] == undefined ||
    data["second"] === "" ||
    data["profit"] == undefined ||
    !data["profit"] ||
    data["ammount"] == undefined ||
    !data["ammount"] ||
    data["l_type"] == undefined ||
    data["l_type"] === ""
  ) {
    popup_tip.innerText = "Enter all the details first after refreshing";
    popup_cancel_btn.disabled = false;

    return;
  }

  if (data["ammount"] < 1000) {
    popup_tip.innerText = "Minimum bet amount is 1000";
    popup_cancel_btn.disabled = false;

    button.disabled = false;
    return;
  }
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch("/placebet", config);
  res = await res.json();

  if (res["status"] == 1) {
    popup_tip.innerText = "Success! Bet Placed ";
    popup_cancel_btn.disabled = false;

    button.disabled = true;
    reload();
  } else if (res["status"] == 2) {
    popup_tip.innerText = "Failuree! Bet already exist";
    popup_cancel_btn.disabled = false;

    button.disabled = true;
  } else if (res["status"] == 0) {
    popup_tip.innerText = "Something went wrong try again after refreshing !";
    popup_cancel_btn.disabled = false;

    button.disabled = true;
    reload();
  } else if (res["status"] == 3) {
    popup_tip.innerText = "Failure! Bet time out";
    popup_cancel_btn.disabled = false;

    button.disabled = true;
    reload();
  } else if (res["status"] == 4) {
    popup_tip.innerText = "Failure! You have low balance";
    popup_cancel_btn.disabled = false;

    button.disabled = true;
    reload();
  } else if (res["status"] == 5) {
    popup_tip.innerText = "Failure! Minimum bet amount is 1000.";
    popup_cancel_btn.disabled = false;

    button.disabled = true;
  } else {
    popup_tip.innerText = `${res["status"]}`;
    popup_cancel_btn.disabled = false;
  }
});

function reload() {
  setTimeout(() => {
    window.location.reload();
  }, 3 * 1000);
}

// --------------------------------------------------- vip page section -------------------------------------------------------

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// ------------------------------------------------------- withdrawal page work --------------------------------------------------

function gettimenow() {
  let d = new Date();
  let curr_hour = parseInt(d.getHours());
  let curr_min = parseInt(d.getMinutes());
  if (
    (curr_hour > 9 || (curr_hour === 9 && curr_min >= 30)) &&
    curr_hour < 18
  ) {
    return true;
  } else {
    popup_page.style.left = "0px";
    popup_tip.innerText = "withdraw times up";
    popup_cancel_btn.disabled = false;
    return false;
  }
}
async function getWithdrawPhoneOtp() {
  popup_cancel_btn.disabled = true;
  popup_page.style.left = "0vw";
  document.querySelector("#get_withdraw_phone_otp").disabled = true;
  document.querySelector("#get_withdraw_phone_usdt_otp").disabled = true;
  document.querySelector("#get_withdraw_phone_otp").style.background =
    "#958873";
  document.querySelector("#get_withdraw_phone_usdt_otp").disabled = "#958873";

  let config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  let response = await fetch("/get_withdraw_phone_otp", config);
  response = await response.json();

  if (response["status"] == 1) {
    popup_tip.innerText = "Success! otp sent wait 30sec to send again.";
    popup_close_btn.disabled = false;
  } else if (response["status"] === 2) {
    popup_tip.innerText = "wait 30 sec before trying again.";
    popup_close_btn.disabled = false;
  } else {
    popup_tip.innerText =
      "Failure! something went wrong try again after 30sec.";
    popup_close_btn.disabled = false;
  }
  setTimeout(() => {
    document.querySelector("#get_withdraw_phone_otp").disabled = false;
    document.querySelector("#get_withdraw_phone_usdt_otp").disabled = false;
    document.querySelector("#get_withdraw_phone_otp").style.background =
      "#fac069";
    document.querySelector("#get_withdraw_phone_usdt_otp").disabled = "#fac069";
  }, 3000 * 10);
}

document
  .querySelector("#get_withdraw_phone_otp")
  .addEventListener("click", async () => {
    // document.querySelector("#get_withdraw_phone_otp").disabled = true;
    await getWithdrawPhoneOtp();
    // document.querySelector("#get_withdraw_phone_otp").disabled = false;
  });

document
  .querySelector("#get_withdraw_phone_usdt_otp")
  .addEventListener("click", async () => {
    // document.querySelector("#get_withdraw_phone_usdt_otp").disabled = true;
    await getWithdrawPhoneOtp();
    // document.querySelector("#get_withdraw_phone_usdt_otp").disabled = false;
  });

async function getWithdrawEmailOtp() {
  popup_cancel_btn.disabled = true;
  popup_page.style.left = "0vw";
  document.querySelector("#get_withdraw_email_otp").disabled = true;
  document.querySelector("#get_withdraw_email_otp").style.background =
    "#958873";

  document.querySelector("#get_withdraw_email_usdt_otp").disabled = true;
  document.querySelector("#get_withdraw_email_usdt_otp").style.background =
    "#958873";

  let config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  let response = await fetch("/get_withdraw_email_otp", config);
  response = await response.json();

  if (response["status"] == 1) {
    popup_tip.innerText = "Success! otp sent wait 30sec to send again.";
    popup_close_btn.disabled = false;
  } else if (response["status"] === 2) {
    popup_tip.innerText = "wait 30 sec before trying again.";
    popup_close_btn.disabled = false;
  } else {
    popup_tip.innerText =
      "Failure! something went wrong try again after 30sec.";
    popup_close_btn.disabled = false;
  }

  setTimeout(() => {
    document.querySelector("#get_withdraw_email_otp").disabled = false;
    document.querySelector("#get_withdraw_email_otp").style.background =
      "#fac069";

    document.querySelector("#get_withdraw_email_usdt_otp").disabled = false;
    document.querySelector("#get_withdraw_email_usdt_otp").style.background =
      "#fac069";
  }, 3000 * 10);
}

document
  .querySelector("#get_withdraw_email_usdt_otp")
  .addEventListener("click", async () => {
    // document.querySelector("#get_withdraw_email_usdt_otp").disabled = true;
    await getWithdrawEmailOtp();
    // document.querySelector("#get_withdraw_email_usdt_otp").disabled = false;
  });

document
  .querySelector("#get_withdraw_email_otp")
  .addEventListener("click", async () => {
    // document.querySelector("#get_withdraw_email_otp").disabled = true;
    await getWithdrawEmailOtp();
    // document.querySelector("#get_withdraw_email_otp").disabled = false;
  });

const withdraw_btn = document.querySelector("#withdraw_request");
withdraw_btn.addEventListener("click", async () => {
  if (!gettimenow()) {
    return;
  }
  let amount = document.querySelector("#withdraw_amount").value;
  let withdrawal_code = document.querySelector("#withdrawal_code").value;
  let phone_otp = document.querySelector("#withdraw_phone_otp_input").value;
  let email_otp = document.querySelector("#withdraw_email_otp_input").value;
  let otp;
  amount = parseFloat(amount);
  popup_page.style.left = "0px";
  if (!((!phone_otp && email_otp) || (phone_otp && !email_otp))) {
    popup_tip.innerText = "Enter any one otp";
    return;
  }
  otp = phone_otp || email_otp;
  if (amount == "" || !amount || !withdrawal_code || withdrawal_code == "") {
    popup_tip.innerText = "Enter valid data";
    popup_cancel_btn.disabled = false;
    return;
  } else if (amount < 200) {
    popup_tip.innerText = "Minimum withdrawal amount is 200";
    popup_cancel_btn.disabled = false;
    return;
  } else if (amount > 50000) {
    popup_tip.innerText = "Maximum withdraw amount is 50000";
    popup_cancel_btn.disabled = false;
    return;
  }

  let data = {
    withdrawal_code: parseInt(withdrawal_code),
    amount: amount,
    otp,
  };

  let config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let response = await fetch("/withdrawal", config);
  response = await response.json();
  // console.log(response);

  if (response["status"] == 1) {
    popup_tip.innerText = "Done! your payment is in processing";
    popup_cancel_btn.disabled = false;
    reload();
  } else if (response["status"] == 0) {
    popup_tip.innerText = "Something went wrong try after some time";
    popup_cancel_btn.disabled = false;
    reload();
  } else {
    popup_tip.innerText = `${response["status"]}`;
    popup_cancel_btn.disabled = false;
  }
});

// ----------------------------------------------------------- Add BankAccount --------------------------------------------------------------
// ------------------------------------------------------------- bank details ---------------------------------------------------------------
document
  .querySelector("#sv_bank_details")
  .addEventListener("click", async () => {
    let name = document.querySelector("#van-field-3-input").value;
    let ac_number = document.querySelector("#van-field-4-input").value;
    let ifsc = document.querySelector("#van-field-5-input").value;
    let T_pass = document.querySelector("#van-field-6-input").value;
    popup_page.style.left = "0px";

    if (!name || !ac_number || !ifsc || !T_pass) {
      popup_tip.innerText = "Enter valid data";
      popup_cancel_btn.disabled = false;
      return;
    }
    let data = {
      name,
      ac_number,
      ifsc,
      T_pass,
    };

    const config = {
      method: "POST",

      headers: {
        "content-type": "application/json",
      },
      body: await JSON.stringify(data),
    };

    let response = await fetch("/bank_details", config);
    response = await response.json();

    if (response["status"] == 3) {
      popup_tip.innerText = "Enter all the data";
      popup_cancel_btn.disabled = false;
    } else if (response["status"] == 0) {
      popup_tip.innerText = "something went wrong try again after some time.";
      popup_cancel_btn.disabled = false;
    } else if (response["status"] == 2) {
      popup_tip.innerText = "you already have an account.";
      popup_cancel_btn.disabled = false;
    } else if (response["status"] == 1) {
      x = true;
      popup_tip.innerText = "Success! Bank details added";
      popup_cancel_btn.disabled = false;
    } else {
      popup_tip.innerText = "something went wrong try after refreshing";
      popup_cancel_btn.disabled = false;
    }
  });

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- recharge cantainer implementation ----------------------------------------------------------------

let recharge_amount = document.querySelector("#recharge_amount");
document.querySelectorAll(".reInput > span").forEach((item) => {
  item.addEventListener("click", () => {
    recharge_amount.value = item.innerText;
    usdt_converter_deposit();
  });
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------- get calls ---------------------------------------------

async function get_user_data() {
  let config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  let res = await fetch("/user_data", config);
  let user_information = await res.json();

  if (user_information["status"] === 1) {
    set_user_data(user_information);
  } else if (user_information["status"] === 2) {
    window.location.href = window.location.origin + "/login";
  }
}

function set_user_data(info) {
  document.querySelectorAll(".m_number").forEach((item, i) => {
    item.innerText = info["phone"];
  });
  document.querySelectorAll(".s_balance").forEach((item, i) => {
    item.innerText = info["balance"].toFixed(2);
  });
  document.querySelectorAll(".s_vip").forEach((item, i) => {
    item.innerText = `VIP ${info["vipLevel"]}`;
  });

  if (
    typeof info["valid_amount"] !== undefined &&
    typeof info["valid_deposit"] !== undefined
  ) {
    let valid_amount = `<span id="valid_amount">${info["valid_amount"].toFixed(
      2
    )}</span> / <span id="valid_deposit">${info["valid_deposit"].toFixed(
      2
    )}</span>`;
    document.querySelector("#valid_betting_amount").innerHTML = valid_amount;
  }

  if (
    info &&
    typeof info["usdt_adress"] !== "undefined" &&
    info["usdt_adress"] !== "0" &&
    info["usdt_adress"].length > 1
  ) {
    select("#usdt_adress").value = info["usdt_adress"];
    document
      .querySelector("#usdt_add_address")
      .removeEventListener("click", usdt_popup);
  }

  if (
    info["BankDetails"] !== "undefined" &&
    info["BankDetails"].length &&
    info["BankDetails"][0]["Name"]
  ) {
    document.querySelectorAll(".bank_name").forEach((item, i) => {
      item.value = info["BankDetails"][0]["Name"];
    });
  }

  if (
    info["BankDetails"] !== "undefined" &&
    info["BankDetails"].length &&
    info["BankDetails"][0]["Name"]
  ) {
    document.querySelectorAll(".s_acc_number").forEach((item, i) => {
      let num = info.BankDetails[0]["AcNumber"];
      item.value = num;
    });
  }

  if (
    info["BankDetails"] !== "undefined" &&
    info["BankDetails"].length &&
    info["BankDetails"][0]["Name"]
  ) {
    document.querySelectorAll(".s_acc_ifsc").forEach((item, i) => {
      let num = info.BankDetails[0]["Ifsc"];
      item.value = num;
    });
  }
}

get_user_data();

// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------- Deposite page frontend work -----------------------------------
async function recharge(data) {
  popup_page.style.left = "0px";
  popup_cancel_btn.disabled = true;

  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let res = await fetch("/deposit", config);
  res = await res.json();

  if (res["status"] === 1) {
    popup_tip.innerText = "Success! your payment is in processing .";
    popup_cancel_btn.disabled = false;

    reload();
  } else {
    popup_tip.innerText =
      "Failure! something went wrong try again after refreshing.";
    popup_cancel_btn.disabled = false;

    reload();
  }
}

select("#yy_submit").addEventListener("click", () => {
  let transaction_id = select("#yy_transaction").value;
  let amount = select("#yy_amount").innerText;

  if (
    !transaction_id ||
    transaction_id == undefined ||
    !amount ||
    amount == undefined
  ) {
    alert("something went wrong ");
    window.location.reload();
    return;
  }
  amount = parseFloat(amount);
  let data = { amount: amount, transactioin_id: transaction_id };
  recharge(data);
});

select("#yy_upi_cpy").addEventListener("click", () => {
  let text = select("#yy_upi_id");
  copyPageUrl(text.innerText);
});
const { clipboard } = window.WTN;

async function copyPageUrl(text) {
  popup_page.style.left = "0px";
  popup_cancel_btn.disabled = true;

  if (
    window.WTN.isNativeApp ||
    window.WTN.isAndroidApp ||
    window.WTN.isIosApp
  ) {
    window.WTN.clipboard.get({
      callback: function (data) {
        console.log(data.value);
      },
    });
    window.WTN.clipboard.set({
      data: `${text}`,
    });
    popup_tip.innerText = "Success! copied.";
    popup_cancel_btn.disabled = false;
  } else {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      popup_tip.innerText = "Failure! something went wrong.";
      popup_cancel_btn.disabled = false;
    } finally {
      popup_tip.innerText = "Success! copied.";
      popup_cancel_btn.disabled = false;
    }
  }
}

async function initiate_gateway_recharge() {
  popup_page.style.left = "0px";
  popup_cancel_btn.disabled = true;
  // e.preventDefault();
  const post_data = {};
  post_data.client_txn_id = String(
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  ); // you can use this field to store order id;
  post_data.amount = document.getElementById("recharge_amount").value;
  post_data.p_info = "product_name";
  post_data.customer_name = "anonymus";
  post_data.customer_email = "gateway@gmail.com";
  post_data.customer_mobile = `${
    Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000
  }`;
  post_data.redirect_url = "http://www.manchester-football.com/redirect";

  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post_data),
  };
  try {
    let res = await fetch("/start_payment", config);
    const text = await res.text();
    const data = JSON.parse(text);
    if (data.status === "ok") {
      window.location.href = data.url;
    } else {
      popup_tip.innerText = "Something went wrong";
      popup_close_btn.disabled = false;
      return;
    }
  } catch (err) {
    window.location.href = window.location.origin + "/login";
  }
}

const yy_pay = document.querySelector("#yy_pay");

document.querySelector("#recharge_btn").addEventListener("click", () => {
  let is_gateway = document.querySelector("#gateway_radio_btn").checked;
  let is_gateway_2 = document.querySelector("#gateway_radio_btn2").checked;
  let is_gateway_3 = document.querySelector("#manual_btn_two").checked;
  let is_gateway_4 = document.querySelector("#usdt_btn").checked;
  let payment_four = document.querySelector("#channel_four_btn").checked;
  let payment_five = document.querySelector("#channel_five_btn").checked;

  let recharge_amount = document.querySelector("#recharge_amount").value;

  if (is_gateway || is_gateway_2) {
    if (recharge_amount <= 99) {
      check_deposit_amount();
      return;
    } else {
      initiate_gateway_recharge();
    }
  } else if (is_gateway_3) {
    if (recharge_amount < 99) {
      check_deposit_amount();
      return;
    } else {
      document.querySelector("#yy_amount").innerText = recharge_amount;
      manual_recharge_page();
      return;
    }
  } else if (is_gateway_4) {
    document.querySelector("#usdt_amount").innerText = (
      document.querySelector("#recharge_amount").value / 80
    ).toFixed(2);
    let usdt_amount = document.querySelector("#deposite_usdt").innerText;
    if (usdt_amount < 9) {
      usdt_check_amount();
      return;
    } else {
      usdt_recharge_page();
      return;
    }
  } else if (payment_four) {
    if (recharge_amount < 99) {
      check_deposit_amount();
      return;
    } else {
      channel_four(recharge_amount);
      return;
    }
  } else if (payment_five) {
    if (recharge_amount < 99) {
      check_deposit_amount();
      return;
    } else {
      channel_five(recharge_amount);
      return;
    }
  }
});

// gateway
function manual_recharge_page() {
  yy_pay.style.zIndex = "1";
  footer.style.zIndex = "-1";
}
const usdt_page = document.querySelector("#usdt");
function usdt_recharge_page() {
  usdt_page.style.zIndex = "1";
  footer.style.zIndex = "-1";
}

document.querySelector(".usdt_back_btn").addEventListener("click", () => {
  usdt_page.style.zIndex = "-1";
  footer.style.zIndex = "1";
});

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- validation of payments chanel-----------------------------

const inr_btn = document.querySelector(".inr_btn");
const usdt_btn = document.querySelector(".usdt_btnn");
const usdt_w_form = document.querySelector(".usdt_w_form");
const inr_w_form = document.querySelector(".inr_w_form");

usdt_btn.addEventListener("click", () => {
  usdt_btn.style.background = "linear-gradient(180deg, #5bb2ecd1, #3d8af8)";
  usdt_btn.style.color = "#fff";
  inr_btn.style.color = "#333";
  inr_btn.style.background = "#f8f8f8";
  usdt_w_form.style.display = "block";
  inr_w_form.style.display = "none";
});

inr_btn.addEventListener("click", () => {
  inr_btn.style.background = "linear-gradient(180deg, #5bb2ecd1, #3d8af8)";
  inr_btn.style.color = "#fff";
  usdt_btn.style.color = "#333";
  usdt_btn.style.background = "#f8f8f8";
  usdt_w_form.style.display = "none";
  inr_w_form.style.display = "block";
});

function usdt_converter() {
  let amount = document.querySelector("#usdt_withdraw_amount").value;
  let calc = amount / 80;
  document.querySelector("#usdt_c").innerText = calc;
}
document
  .querySelector("#usdt_withdraw_amount")
  .addEventListener("keyup", () => {
    let usdt = usdt_converter();
  });

// ------------------------------------------------ usdt popup --------------------------------
usdt_pass_pop = document.querySelector(".usdt_pass_pop");
document
  .querySelector("#usdt_add_address")
  .addEventListener("click", usdt_popup);
function usdt_popup() {
  usdt_pass_pop.style.zIndex = "1";
  withdrawalCantainer.style.filter = "brightness(40%)";
}
document.querySelector("#close_pass_usdt").addEventListener("click", () => {
  usdt_pass_pop.style.zIndex = "-1";
  withdrawalCantainer.style.filter = "brightness(100%)";
});

// set usdt adress and password

document
  .querySelector("#set_usdt_details")
  .addEventListener("click", async () => {
    let usdt_d_password = document.querySelector("#usdt_d_password").value;
    let usdt_d_adress = document.querySelector("#usdt_d_adress").value;
    popup_page.style.left = "0vw";
    popup_tip.innerText = "loading";
    if (
      !usdt_d_adress ||
      !usdt_d_password ||
      typeof usdt_d_adress === "undefined" ||
      typeof usdt_d_password === "undefined"
    ) {
      popup_tip.innerText = "Enter all the details first";
      return;
    } else {
      let config = {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ usdt_d_adress, usdt_d_password }),
      };
      let res = await fetch("/sv_usdt_details", config);
      res = await res.json();
      if (res["status"] === 1) {
        popup_tip.innerText = "SAVED!!";
        return;
      } else {
        popup_tip.innerText = res["status"];
        return;
      }
    }
  });

// ------------

document
  .querySelector("#usdt_withdraw_request")
  .addEventListener("click", async () => {
    let amount = document.querySelector("#usdt_withdraw_amount").value;
    let phone_otp = document.querySelector(
      "#withdraw_phone_usdt_otp_input"
    ).value;
    let email_otp = document.querySelector(
      "#withdraw_email_usdt_otp_input"
    ).value;
    let withdraw_password = document.querySelector(
      "#usdt_withdrawal_code"
    ).value;
    let usdt_adress = document.querySelector("#usdt_adress").value;
    let valid_amount = parseFloat(
      document.querySelector("#valid_amount").innerText
    );
    let valid_deposit = parseFloat(
      document.querySelector("#valid_deposit").innerText
    );

    popup_page.style.left = "0vw";
    popup_tip.innerText = "loading...";
    if (!gettimenow()) {
      popup_tip.innerText = "Withdraw time out";
      return;
    }
    if (!((!phone_otp && email_otp) || (!email_otp && phone_otp))) {
      popup_tip.innerText = "Enter any one otp";
      return;
    }
    if (amount < 200) {
      popup_tip.innerText = "Minimum withdraw limit is 200 INR or 2.5 USD";
      return;
    }
    let otp = phone_otp || email_otp;
    if (!usdt_adress || typeof usdt_adress === "undefined") {
      popup_tip.innerText = "Set up a TRC20 adress first.";
      return;
    } else if (
      !amount ||
      typeof amount === "undefined" ||
      !withdraw_password ||
      typeof withdraw_password === "undefined"
    ) {
      popup_tip.innerText = "Enter all details first.";
      return;
    } else if (valid_amount < valid_deposit) {
      popup_tip.innerText = "Valid amount not reached.";
      return;
    } else {
      let config = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ amount, withdraw_password, otp }),
      };

      let res = await fetch("/usdt_withdraw", config);
      res = await res.json();
      if (res["status"] === 1) {
        popup_tip.innerText = "Your withdrawal is in processing";
        return;
      } else {
        popup_tip.innerText = res["status"];
      }
    }
  });

document
  .querySelector("#usdt_deposit_btn")
  .addEventListener("click", async () => {
    let transaction_id = document.querySelector("#usdt_transaction_id").value;
    let usdt_amount = parseFloat(select("#usdt_amount").innerText);
    popup_page.style.left = "0vw";
    popup_tip.innerText = "loading...";

    if (
      !usdt_amount ||
      typeof usdt_amount === "undefined" ||
      !transaction_id ||
      typeof transaction_id === "undefined"
    ) {
      popup_tip.innerText = "Enter valid details first.";
      return;
    } else {
      let config = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ transaction_id, amount: usdt_amount }),
      };

      let res = await fetch("/usdt_deposit", config);
      res = await res.json();
      if (res["status"] === 1) {
        popup_tip.innerText = "Your deposit is in processing";
        return;
      } else {
        popup_tip.innerText = res["status"];
      }
    }
  });

function usdt_converter_deposit() {
  let amount = document.querySelector("#recharge_amount").value;
  let calc = amount / 80;
  document.querySelector("#deposite_usdt").innerText = calc;
}

document.querySelector("#recharge_amount").addEventListener("input", () => {
  usdt_converter_deposit();
});

function check_deposit_amount() {
  let deposit_amount = document.querySelector("#recharge_amount").value;
  if (deposit_amount <= 99) {
    popup_page.style.left = "0px";
    popup_tip.innerText = "Minimun deposit amount 100";
    popup_cancel_btn.disabled = false;
  }
}

function usdt_check_amount() {
  let usdt_amount = document.querySelector("#deposite_usdt").innerText;
  if (usdt_amount < 9) {
    popup_page.style.left = "0px";
    popup_tip.innerText = "Minimun deposit amount 10 USDT";
    popup_cancel_btn.disabled = false;
  }
}

document.querySelector("#usdt_copy_icon").addEventListener("click", () => {
  let text = document.querySelector("#usdt_address_copy").innerText;
  copyPageUrl(text);
});

// async function copyPageUrl(text) {
//   popup_page.style.left = "0px";
//   popup_cancel_btn.disabled = true;

//   if (
//     window.WTN.isNativeApp ||
//     window.WTN.isAndroidApp ||
//     window.WTN.isIosApp
//   ) {
//     window.WTN.clipboard.get({
//       callback: function (data) {
//         console.log(data.value);
//       },
//     });
//     window.WTN.clipboard.set({
//       data: `${text}`,
//     });
//     popup_tip.innerText = "Success! copied.";
//     popup_cancel_btn.disabled = false;
//   } else {
//     try {
//       await navigator.clipboard.writeText(text);
//     } catch (err) {
//       popup_tip.innerText = "Failure! something went wrong.";
//       popup_cancel_btn.disabled = false;
//     } finally {
//       popup_tip.innerText = "Success! copied.";
//       popup_cancel_btn.disabled = false;
//     }
//   }
// }

// ------------------------------- copy the payment details ------------------------------

async function copyPageUrl(text) {
  popup_page.style.left = "0px";
  popup_cancel_btn.disabled = true;

  if (
    window.WTN.isNativeApp ||
    window.WTN.isAndroidApp ||
    window.WTN.isIosApp
  ) {
    window.WTN.clipboard.get({
      callback: function (data) {
        console.log(data.value);
      },
    });
    window.WTN.clipboard.set({
      data: `${text}`,
    });
    popup_tip.innerText = "Success! copied.";
    popup_cancel_btn.disabled = false;
  } else {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      popup_tip.innerText = "Failure! something went wrong.";
      popup_cancel_btn.disabled = false;
    } finally {
      popup_tip.innerText = "Success! copied.";
      popup_cancel_btn.disabled = false;
    }
  }
}

const chanel_four_details = (idx) => {
  let inputs = document.querySelectorAll(".pay_chanel_four");
  let text = inputs[idx].value;
  copyPageUrl(text);
  // let text = document.querySelector('');
};

document.querySelectorAll(".copy_payment_reference").forEach((element, i) => {
  element.addEventListener("click", () => {
    chanel_four_details(i);
  });
});

// -------------------------------------------------------------------------
function channel_four(amount) {
  // get the amount;
  document.querySelector("#channel_4_amount").innerText = amount;
  document.querySelector("#payment_chanel_four").style.zIndex = "1";
}

function channel_five(amount) {
  // get the amount;
  document.querySelector("#channel_5_amount").innerText = amount;
  document.querySelector("#payment_chanel_five").style.zIndex = "1";
}

document
  .querySelector("#payment_channel_four_submit")
  .addEventListener("click", channel_four_submit);

async function channel_four_submit() {
  let referance_number = document.querySelector(
    "#channel_four_ref_input"
  ).value;

  let amount = document.querySelector("#channel_4_amount").innerText;

  popup_page.style.left = 0;
  popup_tip.innerText = "Loading...";
  popup_close_btn.disabled = true;

  if (!referance_number || referance_number.length !== 12) {
    popup_tip.innerText = "Enter a valid referance number.";
    popup_close_btn.disabled = false;
    return;
  }

  try {
    let config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ referance_number, amount }),
    };
    let res = await fetch("/chanel_four_deposit", config);
    res = await res.json();
    if (!res || res?.status !== 1) {
      popup_tip.innerText =
        res?.message ||
        "UTR number used or invalid; please verify and enter correct details.";
    } else if (res?.status === 1) {
      popup_tip.innerText = "Payment verification in progress. Please wait.";
      popup_close_btn.disabled = false;
    } else {
      popup_tip.innerText = "Something went wrong";
      popup_close_btn.disabled = false;
    }
  } catch (error) {
    popup_tip.innerText = "something went wrong";
    window.location.href = window.location.origin + "/login";
  }
}

(async function get_imps_data() {
  let res = await fetch("/get_imps_data");
  res = await res.json();

  if (res.status === 1) {
    let inputs = document.querySelectorAll(".pay_chanel_four");
    inputs[0].value = res?.data?.ac_name;
    inputs[1].value = res?.data?.bank_name;
    inputs[2].value = res?.data?.ac_number;
    inputs[3].value = res?.data?.ifsc_code;
  } else {
    window.location.href = window.location.origin + "/login";
  }
})();

// ------------------------------------- back from the payment channel four button ------------------------
document
  .querySelector("#payment_channel_four_back_btn")
  .addEventListener("click", () => {
    document.querySelector("#payment_chanel_four").style.zIndex = -1;
  });

document
  .querySelector("#payment_channel_five_back_btn")
  .addEventListener("click", () => {
    document.querySelector("#payment_chanel_five").style.zIndex = -1;
  });

(async function getQRimage() {
  let res = await fetch("/getQRimage");
  res = await res.json();
  if (res && res?.data?.image) {
    document.querySelector(
      ".payment_five_qrCode"
    ).style.background = `url(qrimages/${res?.data?.image}) center no-repeat`;
    document.querySelector(".payment_five_qrCode").style.backgroundSize =
      "contain";
  }
})();

document
  .querySelector("#channel_five_deposit_submit_btn")
  .addEventListener("click", async () => {
    let referance_number = document.querySelector(
      "#channel_five_ref_input"
    ).value;

    let amount = document.querySelector("#channel_5_amount").innerText;

    popup_page.style.left = 0;
    popup_tip.innerText = "Loading...";
    popup_close_btn.disabled = true;

    if (!referance_number || referance_number.length !== 12) {
      popup_tip.innerText = "Enter a valid referance number.";
      popup_close_btn.disabled = false;
      return;
    }

    try {
      let config = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ referance_number, amount }),
      };
      let res = await fetch("/chanel_four_deposit", config);
      res = await res.json();
      if (!res || res?.status !== 1) {
        popup_tip.innerText =
          res?.message ||
          "UTR number used or invalid; please verify and enter correct details.";
      } else if (res?.status === 1) {
        popup_tip.innerText = "Payment verification in progress. Please wait.";
        popup_close_btn.disabled = false;
      } else {
        popup_tip.innerText =
          "UTR number used or invalid; please verify and enter correct details.";
        popup_close_btn.disabled = false;
      }
    } catch (error) {
      popup_tip.innerText = "something went wrong";
      window.location.href = window.location.origin + "/login";
    }
  });

document.querySelector("#chanel_three").addEventListener("click", () => {
  document.querySelector("#yy_pay").style.zIndex = "-1";
  // console.log("yes");
});

let total_estemeted_income = 0;
let total_estemeted_profit = 0;
const mainContent = document.querySelector(".mainContent");
const resultLink = document.querySelector(".rightel");
const result = document.querySelector(".resultCantain");
const resultBack = document.querySelector(".van-nav-bar__left");

let popup_cancel_btn = document.querySelector("#popup_close_btn");
let popup_tip = document.querySelector("#popup_tip");
let popup_page = document.querySelector("#popup_page");

window.addEventListener("load", () => {
  let scale_object = document.querySelector(".loader");
  scale_object.style.animation = "shadowPulse 2s linear infinite";
  setTimeout(() => {
    let elem = document.querySelector("#loading");
    elem.remove();
  }, 3000);
});

resultLink.addEventListener("click", () => {
  mainContent.style.cssText = `
    z-index: -1;
    `;
  result.style.cssText = `z-index:1`;
});

const two = document.querySelector("#two");
const three = document.querySelector("#three");
const twoP = document.querySelector(".ii");
const threeP = document.querySelector(".iii");
const secondOuter = document.querySelector(".secondOuter");
const order = document.querySelector(".orderPopup");
const history = document.querySelector(".historicalPopup");

order.style.zIndex = "1";

two.addEventListener("click", () => {
  secondOuter.style.cssText = `justify-content: start;`;
  twoP.style.color = "#fff";
  threeP.style.color = "#0f6997";
  order.style.zIndex = "1";
  history.style.zIndex = "-1";
});

three.addEventListener("click", () => {
  secondOuter.style.cssText = `justify-content: end;`;
  threeP.style.color = "#fff";
  twoP.style.color = "#0f6997";
  order.style.zIndex = "-1";
  history.style.zIndex = "1";
});

// --------------------------------------------------------------------------------------------------------------------------
// ---------------------------------- order page which shows place bets -------------------------------------
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
  let to_return = "";

  if ((valid_date && valid_hour) || (equal_hours && valid_minutes)) {
    to_return = `<div class="trade_cancel_btn">
      <i class="fa-solid fa-angles-up"></i>
      <p >Cancel</p>
      </div>`;
    return to_return;
  }

  return to_return;
}
function listen_to_cancel_bet() {
  document.querySelectorAll(".trade_cancel_btn").forEach((item, i) => {
    item.addEventListener("click", () => {
      document.querySelector("#del_leagueid").innerText =
        item.parentElement.querySelector(".trade_league_id").innerText;
      document.querySelector(".trade_del_box").style.display = "block";
    });
  });

  document.querySelector("#del_trade").addEventListener("click", async () => {
    popup_page.style.left = "0px";
    let value = document.querySelector("#del_leagueid").innerText;
    console.log(value);
    let data = JSON.stringify({ value: value });
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: data,
    };

    let res = await fetch("/delbet", config);
    let parsed_response = await res.json();
    console.log(parsed_response);

    if (parsed_response["status"] == 1) {
      popup_tip.innerText = "Success! Bet deleted. refresh";
      popup_cancel_btn.disabled = false;
    } else if (parsed_response["status"] == 2) {
      popup_tip.innerText = "Bet cannot be deleted now.";
      popup_cancel_btn.disabled = false;

      return;
    } else if (parsed_response["status"] == 0) {
      window.location.href = window.location.origin + "/login";
    }
  });
}

document.querySelectorAll(".del_trade_cancel").forEach((item, i) => {
  item.addEventListener("click", () => {
    item.parentElement.parentElement.style.display = "none";
  });
});

async function get_bet_history() {
  let config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  let res = await fetch("/get_bet_history", config);

  res = await res.json();

  if (res["status"] === 0) {
    window.location.href = window.location.origin + "/login";
  } else if (res["status"] === 1) {
    if (res["unsetteled_bets"]) {
      res["unsetteled_bets"].forEach((item, i) => {
        create_unsettled_bets(item);
        document.querySelector("#current_bet_amount").innerText =
          total_estemeted_income;
        document.querySelector("#est_income").innerText =
          total_estemeted_profit;
      });
      listen_to_cancel_bet();
    }
    if (res["setteled_bets"]) {
      res["setteled_bets"].forEach((item, i) => {
        create_settled_bets(item);
        document.querySelector(".empty").style.display = "none";
      });
    }
  }
}

function create_unsettled_bets(data) {
  let parent = document.querySelector(".orderPopup");
  let child = document.createElement("div");
  child.classList.add("match-card");

  let cut_box = check_date(data["date"], data["time"]);

  total_estemeted_profit += parseFloat(
    ((parseFloat(data["bAmmount"]) / 100) * parseFloat(data["profit"])).toFixed(
      2
    )
  );

  total_estemeted_income += parseFloat(data["bAmmount"].toFixed(2));

  let body = `            <div
    style="margin:2vh auto;width:92vw;background:#fff;box-shadow:0 0.4vw 0.8vw 0 rgba(51,51,51,.1);">

    <section class="topGames">
        <div class="gamesLogo">
            <img src="/elephantFootball/homePage/top_games_logo.png" alt="" srcset="">
        </div>
        <p style="color:#5bb2ea">${data["league"]}</p>
        <p style="display : none;" class="trade_league_id">${
          data["leagueId"]
        }</p>
    </section>


    <section class="orders">

        <div class="order_teams">
        <div class="teamLogo">
        <img src="/elephantFootball/football.png" alt="" srcset="">
    </div>
            <p class="ellipsis-1">${data["team_a"]}</p>
        </div>
        
     
        <div style="white-space: nowrap;
            font-size: 5.866667vw;
             font-weight: 600;
             color: #333;
             margin-bottom: 0;">
            
              
             <h3>${data["scoreDetails"][0]["first"]} - ${
    data["scoreDetails"][0]["second"]
  }</h3>
             <p style="text-align: center;color:red;">@${data["profit"]}%</p>
                             

        </div>

        <div class="order_teams">
            <div class="teamLogo">
                <img src="/elephantFootball/football.png" alt="" srcset="">
            </div>
            <p class="ellipsis-1">${data["team_b"]}</p>
        </div>

    </section>

    <section style="margin:2vw 0 0 0; padding:2vw">

        <div style="display: flex; justify-content: space-between;margin-bottom:1vw;">
            <p class="x">bet time</p>
            <p><span>${data["date"]}</span> <span>${data["time"]}</span></p>
        </div>

        <div style="display: flex; justify-content: space-between;margin-bottom:1vw;">
            <p class="x">bet amount</p>
            <p><span style="color: red;display:none">Balance</span> <span class="paisa"> ₹${
              data["bAmmount"]
            }</span></p>
        </div>

        <div style="display: flex; justify-content: space-between;margin-bottom:1vw;">
            <p class="x">Estimated income</p>
            <p><span class="paisa"> ${(
              (parseFloat(data["bAmmount"]) / 100) *
              parseFloat(data["profit"])
            ).toFixed(2)}</span></p>
        </div>



    </section>
    ${cut_box}

    </div>

`;

  child.innerHTML = body;

  parent.append(child);
}

function create_settled_bets(data) {
  let parent = document.querySelector(".historicalPopup");
  let child = document.createElement("div");
  child.classList.add("match-card");

  let body = `
  <div
  style="margin:2vh auto;width:92vw;background:#fff;box-shadow:0 0.4vw 0.8vw 0 rgba(51,51,51,.1);">

  <section class="topGames">
      <div class="gamesLogo">
          <img src="/elephantFootball/homePage/top_games_logo.png" alt="" srcset="">
      </div>
      <p>${data["league"]}</p>
  </section>


  <section class="orders">
      <div class="order_teams">
          <div class="teamLogo">
              <img src="/elephantFootball/football.png" alt="" srcset="">
          </div>
          <p class="ellipsis-1">${data["team_a"]}</p>
      </div>

      <div style="    white-space: nowrap;
          font-size: 5.866667vw;
           font-weight: 600;
           color: #333;
           margin-bottom: 0;">

           <h4>score</h4>
           <h5 class="lime" style:"text-align:center;">${
             data["scoreDetails"][0]["first"]
           } - ${data["scoreDetails"][0]["second"]} </h5>
           <h5 class="lime lime_two" style:"text-align:center;">${
             data["final_score"][0]["first"]
           }-${data["final_score"][0]["second"]}</h5>
         
      </div>

      <div class="order_teams">
          <div class="teamLogo">
              <img src="/elephantFootball/football.png" alt="" srcset="">
          </div>
          <p class="ellipsis-1">${data["team_b"]}</p>
      </div>

  </section>

  <section style="margin:2vw 0 0 0; padding:2vw">

      <div style="display: flex; justify-content: space-between;margin-bottom:1vw;">
          <p class="x">bet time</p>
          <p><span>${data["date"]}</span> <span>${data["time"]}</span></p>
      </div>

      <div style="display: flex; justify-content: space-between;margin-bottom:1vw;">
          <p class="x">bet amount</p>
          <p><span style="color: red;">Balance</span> <span class="paisa"> ₹${
            data["bAmmount"]
          }</span></p>
      </div>

      <div style="display: flex; justify-content: space-between;margin-bottom:1vw;">
          <p class="x">Estimated income</p>
          <p><span class="paisa"> ${(
            (parseFloat(data["bAmmount"]) / 100) *
            parseFloat(data["profit"])
          ).toFixed(2)}</span></p>
      </div>


  </section>

</div>
  `;

  child.innerHTML = body;
  parent.append(child);
}

get_bet_history();

const popup_close_btn = document.querySelector("#popup_close_btn");
popup_close_btn.addEventListener("click", () => {
  document.querySelector("#popup_page").style.left = "-100vw";
  popup_tip.innerText = "Loading...";
});

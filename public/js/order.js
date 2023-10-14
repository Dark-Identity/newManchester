
const mainContent = document.querySelector('.mainContent');
const resultLink = document.querySelector('.rightel');
const result = document.querySelector('.resultCantain');
const resultBack = document.querySelector('.van-nav-bar__left');


window.addEventListener('load', () => {
  let scale_object = document.querySelector('.loader');
  scale_object.style.animation = 'shadowPulse 2s linear infinite';
  setTimeout(() => {
      let elem = document.querySelector('#loading');
      elem.remove();
  },
      3000)
})



resultLink.addEventListener('click', () => {

  mainContent.style.cssText = `
    z-index: -1;
    `;
  result.style.cssText = `z-index:1`;

});

resultBack.addEventListener('click', () => {
  mainContent.style.cssText = `z-index: 1;`;
  result.style.cssText = `z-index:-1`;

});



const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const oneP = document.querySelector('#one>p');
const twoP = document.querySelector('#two>p');
const threeP = document.querySelector('#three>p');
const secondOuter = document.querySelector('.secondOuter');
const orderPopup = document.querySelector('.orderPopup');
const historicalPopup = document.querySelector('.historicalPopup');
const cancelPopup = document.querySelector('.cancelPopup');

orderPopup.style.zIndex = "1";

one.addEventListener('click', () => {
  secondOuter.style.cssText = `justify-content: start;`;
  oneP.style.color = '#fff';
  twoP.style.color = ' #333';
  threeP.style.color = ' #333';
  orderPopup.style.zIndex = "1";
  historicalPopup.style.zIndex = "-1";
  cancelPopup.style.zIndex = "-1";

})

two.addEventListener('click', () => {
  oneP.style.color = ' black';
  threeP.style.color = ' black';
  secondOuter.style.cssText = `justify-content: center;`;
  twoP.style.color = '#fff';
  orderPopup.style.zIndex = "-1";
  historicalPopup.style.zIndex = "1";
  cancelPopup.style.zIndex = "-1";
})


three.addEventListener('click', () => {
  oneP.style.color = ' black';
  twoP.style.color = ' black';
  secondOuter.style.cssText = `justify-content: end;`;
  threeP.style.color = '#fff';
  orderPopup.style.zIndex = "-1";
  historicalPopup.style.zIndex = "-1";
  cancelPopup.style.zIndex = "1";
})





// --------------------------------------------------------------------------------------------------------------------------
// ---------------------------------- order page which shows place bets -------------------------------------



function listen_to_cancel_bet() {
    document.querySelectorAll('.trade_cancel_btn').forEach((item, i) => {
      item.addEventListener('click' , ()=>{
        document.querySelector('#del_leagueid').innerText = item.parentElement.querySelector('.trade_league_id').innerText;

        document.querySelector('.trade_del_box').style.display = 'block';
      })
      });

      document.querySelector('#del_trade').addEventListener('click' , async ()=>{

        popup_page.style.left = '0px';
        let value = document.querySelector('#del_leagueid').innerText;

        let data = JSON.stringify({value : value});
        const config = {
            method : 'POST',
            headers:{
                'content-type' : 'application/json'
              },
              body : data
            }


            let res = await fetch('/delbet' , config);
            let parsed_response = await res.json();

            if(parsed_response['status'] == 1){
              popup_tip.innerText = 'Success! Bet deleted. refresh';
              popup_cancel_btn.disabled = false;

            }else if(parsed_response['status'] == 2){
              popup_tip.innerText = 'Bet cannot be deleted now.';
              popup_cancel_btn.disabled = false;

              return;
            }else if(parsed_response['status'] == 0){
              window.location.href = window.location.origin + '/login';
            }

      })

  }





async function get_bet_history() {

  let config = {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }
  let res = await fetch('/get_bet_history', config);

  res = await res.json();

  console.log(res + "response of the get histroy bets");

  if (res['status'] === 0) {
    window.location.href = window.location.origin + '/login';
  } else if (res['status'] === 1) {

    console.log(res['unsetteled_bets'] , res['settled_bets']);

    if (res['unsetteled_bets']) {
      res['unsetteled_bets'].forEach((item, i) => {
        create_unsettled_bets(item);
        
      });
      // listen_to_cancel_bet();
    }
    // console.log(res);
    if (res['setteled_bets']) {
      res['setteled_bets'].forEach((item, i) => {
        create_settled_bets(item);
      });
    }

  }

}


function check_date(date, time) {

  const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
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

  let valid_date = (parseInt(today.getDate()) == m_date);
  let valid_hour = (hours_now < m_hours);
  let valid_minutes = (minutes_now < m_minutes);
  let equal_hours = (hours_now === m_hours);
  // console.log(hours_now , m_hours , minutes_now , m_minutes);
  let to_return = '';

  if (valid_date && valid_hour || equal_hours && valid_minutes) {
    to_return = `<div class="trade_cancel_btn">
        <i class="fa-solid fa-angles-up"></i>
        <h3>CANCEL</h3>
        </div>`;
    return to_return;
  }

  return to_return;

}


function   create_unsettled_bets(data) {
  console.log(data + "unsettled bets from the backend");
  let parent = document.querySelector('.orderPopup');
  let child = document.createElement('div');
  child.classList.add('match-card');

  let cut_box = check_date(data['date'], data['time']);


  let body = `            <div
    style="margin:2vh auto;width:92vw;background:#fff;box-shadow:0 0.4vw 0.8vw 0 rgba(51,51,51,.1);">

    <section class="topGames">
        <div class="gamesLogo">
            <img src="/elephantFootball/homePage/top_games_logo.png" alt="" srcset="">
        </div>
        <p style="color:#5bb2ea">${data['league']}</p>
    </section>


    <section class="orders">
        <div class="order_teams">
            <div class="teamLogo">
                <img src="/elephantFootball/homePage/top_games_logo.png" alt="" srcset="">
            </div>
            <p class="ellipsis-1">${data['team_a']}</p>
        </div>
        
     
        <div style="white-space: nowrap;
            font-size: 5.866667vw;
             font-weight: 600;
             color: #333;
             margin-bottom: 0;">
            
              
             <h3>${data['scoreDetails'][0]['first']} - ${data['scoreDetails'][0]['second']}</h3>
             <p style="text-align: center;color:red;">@${data['profit']}%</p>
                             

        </div>

        <div class="order_teams">
            <div class="teamLogo">
                <img src="/elephantFootball/homePage/top_games_logo.png" alt="" srcset="">
            </div>
            <p class="ellipsis-1">${data['team_a']}</p>
        </div>

    </section>

    <section style="margin:2vw 0 0 0; padding:2vw">

        <div style="display: flex; justify-content: space-between;margin-bottom:1vw;">
            <p class="x">bet time</p>
            <p><span>${data['date']}</span> <span>${data['time']}</span></p>
        </div>

        <div style="display: flex; justify-content: space-between;margin-bottom:1vw;">
            <p class="x">bet amount</p>
            <p><span style="color: red;display:none">Balance</span> <span class="paisa"> ₹${data['bAmmount']}</span></p>
        </div>

        <div style="display: flex; justify-content: space-between;margin-bottom:1vw;">
            <p class="x">Estimated income</p>
            <p><span class="paisa"> ${((parseFloat(data['bAmmount']) / 100) * parseFloat(data['profit'])).toFixed(2)}</span></p>
        </div>

        <p style="text-align: center;font-size:larger;color:blue;width: 40vw;
        height: 10.066667vw;
        border-radius: 6.8vw;
        border: .266667vw solid #8ec0ae;
        font-size: 4.8vw;
        font-weight: 500;
        color: #fff;
        margin-top: 4vw;
        background: #7bebff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        background: linear-gradient(180deg, #5bb2ecd1, #3d8af8);
        "> Cancel </p>

    </section>

</div>
`;

  child.innerHTML = body;

  parent.append(child);
}


function create_settled_bets(data) {
  console.log(data);
  let parent = document.querySelector('.historicalPopup');
  let child = document.createElement('div');
  child.classList.add('match-card');

  let body = `
  <div
  style="margin:2vh auto;width:92vw;background:#fff;box-shadow:0 0.4vw 0.8vw 0 rgba(51,51,51,.1);">

  <section class="topGames">
      <div class="gamesLogo">
          <img src="/elephantFootball/homePage/top_games_logo.png" alt="" srcset="">
      </div>
      <p>${data['league']}</p>
  </section>


  <section class="orders">
      <div class="order_teams">
          <div class="teamLogo">
              <img src="" alt="" srcset="">
          </div>
          <p class="ellipsis-1">${data['team_a']}</p>
      </div>

      <div style="    white-space: nowrap;
          font-size: 5.866667vw;
           font-weight: 600;
           color: #333;
           margin-bottom: 0;">

           <h4>score</h4>
           <h5 class="lime">${data['scoreDetails'][0]['first']} - ${data['scoreDetails'][0]['second']} </h5>
           <h5>${data['final_score'][0]['first']}-${data['final_score'][0]['second']}</h5>
         
      </div>

      <div class="order_teams">
          <div class="teamLogo">
              <img src="/elephantFootball/top_games_logo.png" alt="" srcset="">
          </div>
          <p class="ellipsis-1">${data['team_a']}</p>
      </div>

  </section>

  <section style="margin:2vw 0 0 0; padding:2vw">

      <div style="display: flex; justify-content: space-between;margin-bottom:1vw;">
          <p class="x">bet time</p>
          <p><span>${data['date']}</span> <span>${data['time']}</span></p>
      </div>

      <div style="display: flex; justify-content: space-between;margin-bottom:1vw;">
          <p class="x">bet amount</p>
          <p><span style="color: red;">Balance</span> <span class="paisa"> ₹${data['bAmmount']}</span></p>
      </div>

      <div style="display: flex; justify-content: space-between;margin-bottom:1vw;">
          <p class="x">Estimated income</p>
          <p><span class="paisa"> ${((parseFloat(data['bAmmount']) / 100) * parseFloat(data['profit'])).toFixed(2)}</span></p>
      </div>


  </section>

</div>
  `;

  child.innerHTML = body;
  parent.append(child);
}



// --------------------------------------------------- checking the date -------------------------------------------------------
function check_date(date, time) {

  const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  });


  let today = new Date(nDate);

  let match_date = date.split(/\//);
  let m_time = time.split(/\:/);
  let m_date = parseInt(match_date[0]);
  let m_month = parseInt(match_date[1]);
  let m_hours = parseInt(m_time[0]);
  let m_minutes = parseInt(m_time[1]);

  console.log(m_hours);

  let minutes_now = parseInt(today.getMinutes());
  let hours_now = parseInt(today.getHours());
  minutes_now += 5;
  if (minutes_now > 60) {
    minutes_now = minutes_now - 60;
    hours_now += 1;
  }

  let valid_date = (parseInt(today.getDate()) == m_date);
  let valid_hour = (hours_now < m_hours);
  let valid_minutes = (minutes_now < m_minutes);
  let equal_hours = (hours_now === m_hours);
  console.log(hours_now, m_hours, minutes_now, m_minutes);
  let to_return = '';

  if (valid_date && valid_hour || equal_hours && valid_minutes) {
    to_return = `<div class="trade_cancel_btn">
      <i class="fa-solid fa-angles-up"></i>
      <h3>CANCEL</h3>
      </div>`;
    return to_return;
  }

  return to_return;

}


get_bet_history();
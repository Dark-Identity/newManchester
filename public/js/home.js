function select(tag) {
  return document.querySelector(`${tag}`);
}
function selectAll(tag) {
  return document.querySelectorAll(`${tag}`);
}


const home = document.querySelector(".app");
const vipcantainer = document.querySelector(".VIPbox");
const tir = document.querySelector(".tir");
const carousel = document.querySelector(".crouselCantainer");
const footer = document.querySelector('.footerCantainer');
let x = false;



window.addEventListener('load', () => {

  let scale_object = document.querySelector('.loader');
  scale_object.style.animation = 'shadowPulse 2s linear infinite';
  setTimeout(() => {
    let elem = document.querySelector('#loading');
    elem.remove();
  },
    3000)

})




const announcement = document.querySelector('.announcement');
function announcement_calling() {
  announcement.style.cssText =
    `transform:translateY(0);
  `;
  home.style.filter = "blur(5px)";
  footer.style.filter = "blur(5px)";
}

announcement_calling();


document.querySelector('#close').addEventListener('click', () => {
  announcement.style.cssText = `translateY(-120vh);`
  home.style.filter = "blur(0)";
  footer.style.filter = "blur(0)";
});

const popup_close_btn = document.querySelector("#popup_close_btn");
popup_close_btn.addEventListener('click', () => {
  document.querySelector('#popup_page').style.left = '-100vw';
  popup_tip.innerText = 'Loading...';
})



// ----------------------------------------------------------------- service center -----------------------------------------------
document.querySelector('.telbox').addEventListener('click', () => {
  window.location.href = 'https://t.me/customerservice_CS';
})

document.querySelector('.onlieser').addEventListener('click', () => {
  window.location.href = 'https://t.me/MANCHESTER_FOOTBAL';
})



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

const rechargeCantainer = document.querySelector('.recharge');
const recoPopup = document.querySelector('.recoPopup');
const withdrawalCantainer = document.querySelector('.withdrawalCantainer')
const allListner = document.querySelectorAll('.itemuis');
const ruleCantainer = document.querySelector('.ruleCantainer');
const serviceCantainer = document.querySelector('.serviceCantainer');

allListner.forEach((element) => {
  element.addEventListener('click', () => {
    if (element.id == "one") {
      home.style.cssText = `
      transform:translateX(-120vw);
      `;
      footer.style.transform = "translateX(120vw)";
      rechargeCantainer.style.transform = "translateX(0)";
    }
    else if (element.id == "two") {
      home.style.cssText = `
      transform:translateX(-120vw);
      `;
      footer.style.transform = "translateX(120vw)";
      withdrawalCantainer.style.transform = "translateX(0)";

      // gettimenow();
    }
    else if (element.id == "three") {
      home.style.cssText = `
      transform:translateX(-120vw);
      `;
      footer.style.transform = "translateX(120vw)";
      ruleCantainer.style.transform = "translateX(0)";
    }
    else if (element.id == "four") {
      home.style.cssText = `
      transform:translateX(-120vw);
      `;
      footer.style.transform = "translateX(120vw)";
      serviceCantainer.style.transform = "translateX(0)";
    }
  });
});


// ----------------------------- back to homge page funtion ------------------------------
const tirs = document.querySelectorAll('.tirs')
tirs.forEach((element) => {
  element.addEventListener('click', () => {
    if (element.id == "tirOne") {
      rechargeCantainer.style.transform = "translateX(120vw)";
      recoPopup.style.transform = "translateX(120vw)";
      home.style.cssText = `
      transform:translateX(0);
      `;
      footer.style.transform = "translateX(0)";
    }
    else if (element.id == "tirTwo") {
      home.style.cssText = `
      transform:translateX(0);
      `;
      footer.style.transform = "translateX(0)";
      withdrawalCantainer.style.transform = "translateX(-120vw)";

    }
    else if (element.id == "tirThree") {
      home.style.cssText = `
      transform:translateX(0);
      `;
      footer.style.transform = "translateX(0)";
      ruleCantainer.style.transform = "translateX(-120vw)";

    }
    else if (element.id == "tirFour") {
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
  })
})

function removeOpenedContent(index) {
  accordionContent.forEach((item2, index2) => {
    if (index != index2) {
      item2.classList.remove("is-open");
      let descrip = item2.querySelector(".accordion-content-description");
      descrip.style.height = "0px";
      item2.querySelector("i").classList.replace("fa-minus", "fa-plus");
    }
  })
}


// ------------------------------------- Add  Account popup -----------------------------------------------
const account = document.querySelector('.withdrawalInput');
const AccountCantain = document.querySelector('#Account');
account.addEventListener('click', () => {
  AccountCantain.style.transform = "translateX(0)";
});

const accountBack = document.querySelector('#accountBack');
accountBack.addEventListener('click', () => {
  AccountCantain.style.transform = "translateX(100vw)";
});


// ------------------------ back btn form competition details --------------------------------------------------

const betBtn = document.querySelector('#betBtn');
const popCantain = document.querySelector('.popCantain');

betBtn.addEventListener('click', () => {
  popCantain.style.zIndex = "-1";
  home.style.zIndex = "1";
});



// ------------------------------------------- bet popup -----------------------------------------
let betpop = document.querySelector('.placebet');
let matchList = document.querySelector('.matchPopUp');


document.querySelector('.betHead > ion-icon').addEventListener('click', () => {
  betpop.style.cssText = `
   transform: translateY(150vh);  
   transition: all 1s linear;
   `;
  matchList.style.cssText = `filter: brightness(100%);`;

})







// --------------------------------------------------- creating the match -------------------------------------------------------
function create_match(data) {

  let ndate = new Date(data['raw_date']);
  let date = new Date(data['raw_date']);

  // console.log(ndate);
  // console.log(date);


  let parent_box = document.querySelector('.collection');
  let match_card = document.createElement('div');
  match_card.classList.add('gameBox');
  match_card.classList.add('bet_card');



  let body = `
     <div class="dataDiv">
                          <div class="tName">
                              <p class="circle"></p>
                              <p class="ellipsis-1 namematch" data-v-7afa3138="">
                              <p  class="league_id" id="league_id">${data['fixture_id']}</p>
                              <p class="ellipsis-1 namematch" data-v-7afa3138="" id="final_league_name">${data['league']}</p>
                          </div>
                          <div class="date">
                              <p>${[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('|')}</p>
                          </div>
                      </div>

                      <div class="match">

                          <div class="t teamOne">
                              <p class="nameu leftnamei ellipsis-2" data-v-7afa3138="" id="initial_team_a">
                                  ${data['team_a']}
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
                                  ${data['team_b']}
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
  let res = await fetch('/get_live_bets');
  res = await res.json();


  // from here I have to call the store data function by passing the arguments key and array.

  for (let match_data of res) {
    if ('percentage' in match_data) {
      create_match(match_data);
      percentage[match_data['fixture_id']] = match_data['percentage'];
    }
  }
  load_bet_box();
}

get_live_bets();



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

// -------------------------- profit percentage --------------------------------------------------------------------
let percentage = {};

// --------------------------------------------------- load bet percentage -------------------------------------------------------
function load_bet_percentages(id) {

  let bet_box = document.querySelectorAll('.oddch > p');
  // let rand_box = document.querySelectorAll('.rand_numb');

  let time = new Date().getHours();
  let date = Date();
  let today = date.slice(0, 3);

  // here instead of getting the values from profit_percents i will get it from local storage;
  let percentage_array = percentage[id];

  if (percentage_array == undefined || !percentage_array) {
    window.location.href = window.location.origin + '/login';
  }

  bet_box.forEach((item, i) => {
    item.innerText = percentage_array[i] + "%";
  });


}

// --------------------------------------------------- load bet function -------------------------------------------------------
function load_bet_box() {
  document.querySelectorAll(".bet_card").forEach((item, i) => {

    item.addEventListener('click', () => {

      let league_id = item.querySelector('#league_id').innerText;
      document.querySelector('#final_league_id').innerText = league_id;
      let team_a = item.querySelector('#initial_team_a').innerText;
      let team_b = item.querySelector('#initial_team_b').innerText;
      document.querySelector('#team_a_logo').src = item.querySelector('#logo_a').src;
      document.querySelector('#team_b_logo').src = item.querySelector('#logo_b').src;
      document.querySelectorAll('.final_league').forEach((item2, i) => {
        item2.innerText = item.querySelector('#final_league_name').innerText;
      });
      document.querySelector('#b_time').innerText = item.querySelector('#initial_time').innerText;

      document.querySelectorAll('.team_a').forEach((item1, i) => {
        item1.innerText = team_a;
      });
      document.querySelectorAll('.team_b').forEach((item1, i) => {
        item1.innerText = team_b;
      });



      let today = new Date();
      document.querySelector('#b_date').innerText = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`


      let percentage_array = load_bet_percentages(league_id);

      popCantain.style.zIndex = "1";
      home.style.zIndex = "-1";


    })

  });
}

// ---------------------------------------------------  bet pop up function -------------------------------------------------------
document.querySelectorAll('.matchscore').forEach(element => {
  element.addEventListener('click', () => {
    matchList.style.cssText = `filter: brightness(50%);`;
    betpop.style.cssText = `
     transform: translateY(0);
     transition: all 500ms linear;
     `;

    let x = element.querySelectorAll('p');
    document.querySelector('#score').innerText = x[0].innerText;
    document.querySelector('#p').innerText = x[1].innerText;

  });
});

// --------------------------------------------------- calc bet function -------------------------------------------------------
function calc_available() {
  let value = parseFloat(document.querySelector('#bet_amount').value);
  if (!value) {
    document.querySelector('#available').innerText = '00' + 'Rs'
  } else {
    let profit = document.querySelector('#p').innerText.replace(/\d%/, '');
    profit = parseFloat(profit);
    value = parseFloat(((value / 100) * profit).toFixed(2));
    document.querySelector('#available').innerText = value;
  }
}

document.querySelector('#bet_amount').addEventListener('keyup', calc_available);

// bets_amount input_btns
document.querySelectorAll('.values > span').forEach((item, i) => {
  item.addEventListener('click', () => {
    if (i !== 5) {
      let value = item.innerText.replace(/\D/, '');
      // console.log(value);
      document.querySelector('#bet_amount').value = parseFloat(value);
      calc_available();
    } else {
      let text = document.querySelector('.s_balance').innerText;
      let values = text.match(/[+-]?\d+(\.\d+)?/g);
      document.querySelector('#bet_amount').value = parseFloat(values[0]);
      calc_available()
    }
  })
});

const All = document.querySelector('#All');
All.addEventListener('click', () => {
  let text = document.querySelector('.s_balance').innerText;
  document.querySelector('#bet_amount').value = parseFloat(text);
  calc_available();
});


// --------------------------------------------------- place bet section function ends -------------------------------------------------------
let popup_cancel_btn = document.querySelector("#popup_close_btn");

document.querySelector('#confirm').addEventListener('click', async () => {

  let button = document.querySelector("#confirm");
  // button.disabled = true;
  popup_tip = document.querySelector('#popup_tip');

  popup_page.style.left = '0px';
  popup_cancel_btn.disabled = true;

  let league_id = document.querySelector('#final_league_id').innerText;
  let league_name = document.querySelector('#league_name').innerText;
  let teama = document.querySelector('#team_a').innerText;
  let teamb = document.querySelector('#team_b').innerText;
  let date = document.querySelector('#b_date').innerText;
  let time = document.querySelector('#b_time').innerText;
  let amount = document.querySelector('#bet_amount').value;
  let score = document.querySelector('#score').innerText;
  let profit = document.querySelector('#profit').innerText;
  score = score.split('-');
  let score_first = parseInt(score[0]);
  let score_second = parseInt(score[1]);

  let data = {};

  data['league_id'] = parseInt(league_id);
  data['league'] = league_name;
  data['team_a'] = teama;
  data['team_b'] = teamb;
  data['date'] = date;
  data['time'] = time;
  data['first'] = score_first;
  data['second'] = score_second;
  data['profit'] = parseFloat(profit.replace(/\b%/, ''));
  data['ammount'] = parseFloat(amount);
  data['l_type'] = parseInt((league_name === 'virtual' || league_name === 'VIRTUAL') ? 0 : 1);

  if (
    data['league_id'] == undefined || !data['league_id'] ||
    data['league'] == undefined || !data['league'] ||
    data['team_a'] == undefined || !data['team_a'] ||
    data['team_b'] == undefined || !data['team_b'] ||
    data['date'] == undefined || !data['date'] ||
    data['time'] == undefined || !data['time'] ||
    data['first'] == undefined || data['first'] === '' ||
    data['second'] == undefined || data['second'] === '' ||
    data['profit'] == undefined || !data['profit'] ||
    data['ammount'] == undefined || !data['ammount'] ||
    data['l_type'] == undefined || data['l_type'] === ''
  ) {
    popup_tip.innerText = 'Enter all the details first after refreshing';
    popup_cancel_btn.disabled = false;

    return;
  }

  if (data['ammount'] < 1000) {
    popup_tip.innerText = 'Minimum bet amount is 1000';
    popup_cancel_btn.disabled = false;

    button.disabled = false;
    return;
  }
  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  let res = await fetch('/placebet', config);
  res = await res.json();
  console.log(res);

  if (res['status'] == 1) {
    popup_tip.innerText = 'Success! Bet Placed ';
    popup_cancel_btn.disabled = false;

    button.disabled = true;
    reload();
  } else if (res['status'] == 2) {
    popup_tip.innerText = 'Failuree! Bet already exist';
    popup_cancel_btn.disabled = false;

    button.disabled = true;
  } else if (res['status'] == 0) {
    popup_tip.innerText = 'Something went wrong try again after refreshing !';
    popup_cancel_btn.disabled = false;

    button.disabled = true;
    reload();

  } else if (res['status'] == 3) {
    popup_tip.innerText = 'Failure! Bet time out';
    popup_cancel_btn.disabled = false;

    button.disabled = true;
    reload();

  } else if (res['status'] == 4) {
    popup_tip.innerText = 'Failure! You have low balance';
    popup_cancel_btn.disabled = false;

    button.disabled = true;
    reload();
  } else if (res['status'] == 5) {
    popup_tip.innerText = 'Failure! Minimum bet amount is 1000.';
    popup_cancel_btn.disabled = false;

    button.disabled = true;
  } else {
    popup_tip.innerText = `${res['status']}`
    popup_cancel_btn.disabled = false
  }
});

function reload() {
  setTimeout(() => {
    window.location.reload();
  }, 3 * 1000)
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

  var d = new Date();
  var curr_hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  var curr_min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  var time24 = curr_hour;

  if (time24 <= 10 || time24 > 18) {
    withdraw_btn.disabled = true;;
    popup_page.style.left = '0px';
    popup_tip.innerText = 'withdraw times up'
    popup_cancel_btn.disabled = false;
  }


}


const withdraw_btn = document.querySelector('#withdraw_request');
withdraw_btn.addEventListener('click', async () => {



  let amount = document.querySelector('#withdraw_amount').value;
  let withdrawal_code = document.querySelector("#withdrawal_code").value;

  amount = parseFloat(amount);
  popup_page.style.left = '0px';

  if (amount == '' || !amount || !withdrawal_code || withdrawal_code == '') {
    popup_tip.innerText = 'Enter valid data'
    popup_cancel_btn.disabled = false
    return;

  } else if (amount < 200) {
    popup_tip.innerText = 'Minimum withdrawal amount is 200'
    popup_cancel_btn.disabled = false
    return;
  }

  let data = {
    withdrawal_code: parseInt(withdrawal_code),
    amount: amount,
  }

  let config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  let response = await fetch('/withdrawal', config)
  response = await response.json();
  console.log(response);

  if (response['status'] == 1) {

    popup_tip.innerText = 'Done! your payment is in processing'
    popup_cancel_btn.disabled = false
    reload();
  } else if (response['status'] == 0) {

    popup_tip.innerText = 'Something went wrong try after some time'
    popup_cancel_btn.disabled = false
    reload();
  } else {
    popup_tip.innerText = `${response['status']}`
    popup_cancel_btn.disabled = false
  }

})


// ----------------------------------------------------------- Add BankAccount --------------------------------------------------------------
// ------------------------------------------------------------- bank details ---------------------------------------------------------------
document.querySelector('#sv_bank_details').addEventListener('click', async () => {
  let name = document.querySelector('#van-field-3-input').value;
  let ac_number = document.querySelector('#van-field-4-input').value;
  let ifsc = document.querySelector('#van-field-5-input').value;
  let T_pass = document.querySelector('#van-field-6-input').value;
  popup_page.style.left = '0px';


  if (!name || !ac_number || !ifsc || !T_pass) {
    popup_tip.innerText = 'Enter valid data';
    popup_cancel_btn.disabled = false;
    return;
  }
  let data = {
    name,
    ac_number,
    ifsc,
    T_pass
  };

  console.log(data);

  const config = {
    method: 'POST',

    headers: {
      'content-type': 'application/json'
    },
    body: await JSON.stringify(data)
  };

  let response = await fetch('/bank_details', config);
  response = await response.json();

  if (response['status'] == 3) {
    popup_tip.innerText = 'Enter all the data';
    popup_cancel_btn.disabled = false;

  } else if (response['status'] == 0) {
    popup_tip.innerText = 'something went wrong try again after some time.'
    popup_cancel_btn.disabled = false
  } else if (response['status'] == 2) {
    popup_tip.innerText = 'you already have an account.';
    popup_cancel_btn.disabled = false;


  } else if (response['status'] == 1) {
    x = true;
    popup_tip.innerText = 'Success! Bank details added';
    popup_cancel_btn.disabled = false;

  } else {
    popup_tip.innerText = 'something went wrong try after refreshing';
    popup_cancel_btn.disabled = false;

  }

})



// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- recharge cantainer implementation ----------------------------------------------------------------

let recharge_amount = document.querySelector('#recharge_amount');
document.querySelectorAll('.reInput > span').forEach((item) => {
  item.addEventListener('click', () => {
    console.log("yes works");
    recharge_amount.value = item.innerText
  });
})





// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------- get calls ---------------------------------------------


async function get_user_data() {

  let config = {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }

  let res = await fetch('/user_data', config);
  let user_information = await res.json();

  if (user_information['status'] === 1) {
    set_user_data(user_information);
  } else if (user_information['status'] === 2) {
    window.location.href = window.location.origin + '/login';
  }

}


function set_user_data(info) {


  document.querySelectorAll('.m_number').forEach((item, i) => {
    item.innerText = info['phone']
  });
  document.querySelectorAll('.s_balance').forEach((item, i) => {
    item.innerText = info['balance'].toFixed(2);
  });
  document.querySelectorAll('.s_vip').forEach((item, i) => {
    item.innerText = `VIP ${info['vipLevel']}`;
  });



  if (info['BankDetails'] !== 'undefined' && info['BankDetails'].length && info['BankDetails'][0]['Name']) {
    document.querySelectorAll('.bank_name').forEach((item, i) => {
      item.value = info['BankDetails'][0]['Name'];
    });
  }

  if (info['BankDetails'] !== 'undefined' && info['BankDetails'].length && info['BankDetails'][0]['Name']) {
    document.querySelectorAll('.s_acc_number').forEach((item, i) => {
      let num = info.BankDetails[0]['AcNumber'];
      item.value = num;
    });
  }


  if (info['BankDetails'] !== 'undefined' && info['BankDetails'].length && info['BankDetails'][0]['Name']) {
    document.querySelectorAll('.s_acc_ifsc').forEach((item, i) => {
      let num = (info.BankDetails[0]['Ifsc']);
      item.value = num;
    });



  }


}
get_user_data();

// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------- Deposite page frontend work -----------------------------------
async function recharge(data) {


  popup_page.style.left = '0px';
  popup_cancel_btn.disabled = true;

  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  let res = await fetch('/deposit', config);
  res = await res.json();

  if (res['status'] === 1) {
    popup_tip.innerText = 'Success! your payment is in processing .';
    popup_cancel_btn.disabled = false;

    reload();
  } else {
    popup_tip.innerText = 'Failure! something went wrong try again after refreshing.'
    popup_cancel_btn.disabled = false;

    reload();
  }

}

select('#yy_submit').addEventListener('click', () => {
  let transaction_id = select('#yy_transaction').value;
  let amount = select('#yy_amount').innerText;

  if (!transaction_id || transaction_id == undefined ||
    !amount || amount == undefined) {
    alert('something went wrong ');
    window.location.reload();
    return;
  }
  amount = parseFloat(amount);
  let data = { 'amount': amount, "transactioin_id": transaction_id };
  recharge(data);
})

select('#yy_upi_cpy').addEventListener('click', () => {
  let text = select('#yy_upi_id');
  copyPageUrl(text.innerText);
})

async function copyPageUrl(text) {
  popup_page.style.left = '0px';
  popup_cancel_btn.disabled = true;

  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    popup_tip.innerText = 'Failure! something went wrong.'
    popup_cancel_btn.disabled = false;

  } finally {
    popup_tip.innerText = 'Success! upi id copied.'
    popup_cancel_btn.disabled = false;
  }
}

async function initiate_gateway_recharge() {

  popup_page.style.left = '0px';
  popup_cancel_btn.disabled = true;
  // e.preventDefault();
  const post_data = {};
  post_data.client_txn_id = String(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000); // you can use this field to store order id;
  post_data.amount = document.getElementById('recharge_amount').value;
  post_data.p_info = 'product_name';
  post_data.customer_name = "anonymus";
  post_data.customer_email = "gateway@gmail.com";
  post_data.customer_mobile = `${Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000}`;
  post_data.redirect_url = "http://manchester-football.com/redirect";
  // post_data.udf1 = 'extradata';
  // post_data.udf2 = 'extradata';
  // post_data.udf3 = 'extradata';

  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post_data)
  }
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

const yy_pay = document.querySelector('#yy_pay');
document.querySelector('#recharge_btn').addEventListener('click', () => {
  let is_gateway = document.querySelector("#gateway_radio_btn").checked;
  let is_gateway_2 = document.querySelector("#gateway_radio_btn2").checked;
  let is_gateway_3 = document.querySelector('#manual_btn').checked;
  

  if (is_gateway || is_gateway_2) {
    initiate_gateway_recharge();
    return;
  } else if (is_gateway_3) {
    manual_recharge_page();
    return;
  }
});

// gateway
function manual_recharge_page() {
  yy_pay.style.zIndex = "1";
  footer.style.zIndex = "-1";
}


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- validation of payments chanel-----------------------------


const matchCantain = document.querySelector('.matchCantain');
const matchPopUp = document.querySelector('.popCantain');
const popupBack = document.querySelector('.van-nav-bar__left');
const popCantain = document.querySelector('.popCantain');
const footer = document.querySelector('.footerCantainer')


window.addEventListener('load', () => {
    let scale_object = document.querySelector('.loader');
    scale_object.style.animation = 'shadowPulse 2s linear infinite';
    setTimeout(() => {
        let elem = document.querySelector('#loading');
        elem.remove();
    },
        3000)
})


document.querySelector('.betHead > ion-icon').addEventListener('click', () => {
    betpop.style.cssText = `
     transform: translateY(150vh);  
     transition: all 1s linear;
     `;
    matchList.style.cssText = `filter: brightness(100%);`;

})



const search = () => {
    const matches = document.querySelectorAll('.bet_card');
    const searchBox = document.querySelector('#teamInput').value.toUpperCase();
    const bet_box = document.querySelector('.collection');  //parent box
    const team_a = document.querySelectorAll('.leftnamei');

    for (let i = 0; i < team_a.length; i++) {
        let match = matches[i].querySelector('.leftnamei');

        if (match) {
            let text_value = match.textContent || match.innerHTML
            if (text_value.toUpperCase().indexOf(searchBox) > -1) {
                matches[i].style.display = "";
            } else {
                matches[i].style.display = 'none';
            }
        }

    }

}




// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// --------------------------------------------------- creating the match -------------------------------------------------------
function create_match(data) {

    let ndate = new Date(data['raw_date']);
    let date = new Date(data['raw_date']);



    let parent_box = document.querySelector('.collection');
    let match_card = document.createElement('div');
    match_card.classList.add('gameBox');
    match_card.classList.add('bet_card');



    let body = `
       <div class="dataDiv">
                            <div class="tName">
                                <p class="circle"></p>
                                <p class="ellipsis-1 namematch" data-v-7afa3138="">
                                <p  class="league_id" id="league_id" style="display:none">${data['fixture_id']}</p>
                                <p class="ellipsis-1 namematch" data-v-7afa3138="" id="final_league_name">${data['league']}</p>
                            </div>
                            <div class="date">
                                <p>${[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('|')}</p>
                                <p id='initial_time'>${date.getHours()}:${date.getMinutes()}</p>
                            </div>
                        </div>
  
                        <div class="match">
  
                            <div class="t teamOne">
                                <p class="nameu leftnamei ellipsis-2" data-v-7afa3138="" id="initial_team_a">
                                    ${data['team_a']}
                                </p>
                                <div class="teamLogo">
                                    <img src="${data['team_a_logo']}" alt="" srcset="" id='logo_a'>
                                </div>
                            </div>
  
                            <div class="t vs">
                                <p data-v-7afa3138="" style="color:#65b6e9">VS</p>
                            </div>
  
                            <div class="t teamOne">
                                <div class="teamLogo">
                                    <img src="${data['team_b_logo']}" alt="" srcset="" id="logo_b">
                                </div>
                                <p class="nameu leftnamei ellipsis-2" data-v-7afa3138=""  id="initial_team_b">
                                    ${data['team_b']}
                                </p>
                            </div>
                        </div>
  
  
                        <div class="downbox" data-v-7afa3138="">
                            <div role="timer" class="van-count-down countdown" data-v-7afa3138="">
                                <span class="block" data-v-7afa3138="">00</span>
                                <span class="colon" data-v-7afa3138="">:</span>
                                <span class="block" data-v-7afa3138="">00</span>
                                <span class="colon" data-v-7afa3138="">:</span>
                                <span class="block" data-v-7afa3138="">00</span>
                            </div>
                        </div>
  
    `;

    match_card.innerHTML = body;
    parent_box.append(match_card);
}


// --------------------------------------------------- calling the api from the backend -------------------------------------------------------
async function get_live_bets() {
    let res = await fetch('/get_live_bets');
    res = await res.json();

    console.log("yes match live bets working");

    // from here I have to call the store data function by passing the arguments key and array.

    for (let match_data of res) {
        if ('percentage' in match_data) {
            create_match(match_data);
            percentage[match_data['fixture_id']] = match_data['percentage'];
            console.log("yes works");
        }
    }
    console.log("yes works");
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
            console.log('works this');
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
            matchCantain.style.zIndex = "-1";
            footer.style.zIndex = "-1";

        })

    });
}
let betpop = document.querySelector('.placebet');
let matchList = document.querySelector('.matchPopUp');

document.querySelector('#betBtn').addEventListener('click', () => {
    popCantain.style.zIndex = "-1";
    matchCantain.style.zIndex = "1";
    footer.style.zIndex = "1";
});



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
            let text = select('.s_balance').innerText;
            let values = text.match(/[+-]?\d+(\.\d+)?/g);
            document.querySelector('#bet_amount').value = parseFloat(values[0]);
            calc_available()
        }
    })
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
    }
});

function reload() {
    setTimeout(() => {
        window.location.reload();
    }, 3 * 1000)
}




// -------------------------------------------------------- Tommorrow div implemention ------------------------------------------------------------
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const twoP = document.querySelector('.ii');
const threeP = document.querySelector('.iii');
const secondOuter = document.querySelector('.secondOuter');
const today = document.querySelector('.today');
const tomorrow = document.querySelector('.tomorrow');




two.addEventListener('click', () => {
    secondOuter.style.cssText = `justify-content: start;`;
    twoP.style.color = "#fff";
    threeP.style.color = "#0f6997";
    today.style.zIndex = "1";
    tomorrow.style.zIndex = "-1";
})


three.addEventListener('click', () => {
    secondOuter.style.cssText = `justify-content: end;`;
    threeP.style.color = "#fff";
    twoP.style.color = "#0f6997";
    today.style.zIndex = "-1";
    tomorrow.style.zIndex = "1";
})








// --------------------------------------------------- creating the match -------------------------------------------------------
function create_match_two(data) {

    let ndate = new Date(data['raw_date']);
    let date = new Date(data['raw_date']);


    console.log(ndate);
    console.log(date);


    console.log(data['raw_date']);


    let parent_box = document.querySelector('.collection_two');
    let match_card = document.createElement('div');
    match_card.classList.add('gameBox');
    match_card.classList.add('bet_card_two');



    let body = `
       <div class="dataDiv">
                            <div class="tName">
                                <p class="circle"></p>
                                <p class="ellipsis-1 namematch" data-v-7afa3138="">
                                <p  class="league_id" id="league_id" style="display:none">${data['fixture_id']}</p>
                                <p class="ellipsis-1 namematch" data-v-7afa3138="" id="final_league_name">${data['league']}</p>
                            </div>
                            <div class="date">
                                <p>${[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('|')}</p>
                                <p id='initial_time'>${date.getHours()}:${date.getMinutes()}</p>
                            </div>
                        </div>
  
                        <div class="match">
  
                            <div class="t teamOne">
                                <p class="nameu leftnamei ellipsis-2" data-v-7afa3138="" id="initial_team_a">
                                    ${data['team_a']}
                                </p>
                                <div class="teamLogo">
                                    <img src="${data['team_a_logo']}" alt="" srcset="" id='logo_a'>
                                </div>
                            </div>
  
                            <div class="t vs">
                                <p data-v-7afa3138="" style="color:#65b6e9">VS</p>
                            </div>
  
                            <div class="t teamOne">
                                <div class="teamLogo">
                                    <img src="${data['team_b_logo']}" alt="" srcset="" id="logo_b">
                                </div>
                                <p class="nameu leftnamei ellipsis-2" data-v-7afa3138=""  id="initial_team_b">
                                    ${data['team_b']}
                                </p>
                            </div>
                        </div>
  
  
                        <div class="downbox" data-v-7afa3138="">
                            <div role="timer" class="van-count-down countdown" data-v-7afa3138="">
                                <span class="block" data-v-7afa3138="">00</span>
                                <span class="colon" data-v-7afa3138="">:</span>
                                <span class="block" data-v-7afa3138="">00</span>
                                <span class="colon" data-v-7afa3138="">:</span>
                                <span class="block" data-v-7afa3138="">00</span>
                            </div>
                        </div>
  
    `;

    match_card.innerHTML = body;
    parent_box.append(match_card);
}






async function get_live_bets_two() {
    let res = await fetch('/get_live_bets_two');
    res = await res.json();

    // from here I have to call the store data function by passing the arguments key and array.

    for (let match_data of res) {
        create_match_two(match_data);
    }
}

get_live_bets_two();


const tiers = document.querySelectorAll('.teamlist');
const teamPopup = document.querySelector('.teamPopup');

window.addEventListener('load', () => {
  let scale_object = document.querySelector('.loader');
  scale_object.style.animation = 'shadowPulse 2s linear infinite';
  setTimeout(() => {
      let elem = document.querySelector('#loading');
      elem.remove();
  },
      3000)
})


const teamMain = document.querySelector('.teamMain');
tiers.forEach((element) => {
    element.addEventListener('click', () => {
        // if (element.id == "tierOne") {
        teamMain.style.zIndex = "-1";
        teamPopup.style.zIndex = "1";
        // }
    });
});

const tierBack = document.querySelector('.van-nav-bar__left');
tierBack.addEventListener('click', () => {
    teamMain.style.zIndex = "1";
    teamPopup.style.zIndex = "-1";
});

const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const twoP = document.querySelector('.ii');
const threeP = document.querySelector('.iii');
const secondOuter = document.querySelector('.secondOuter');
const members = document.querySelector('#van-tab-10');
const commissions = document.querySelector('#van-tab-11');

two.addEventListener('click', () => {
  secondOuter.style.cssText = `justify-content: start;`;
  members.style.display = "block";
  commissions.style.display = "none";
  twoP.style.color="#fff";
  threeP.style.color="#0f6997";

})


three.addEventListener('click', () => {
  secondOuter.style.cssText = `justify-content: end;`;
  members.style.display = "none";
  commissions.style.display = "block";
  twoP.style.color="#0f6997";
  threeP.style.color="#fff";
})




// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------


function create_members(data){

  let empty_img = document.querySelector('.boxcommissions');

    let user_profit = 0;
    let user_amount = 0;
    let total_bets_played = 0;
    let level1_user_RebadeBonus = 0;
    let level2_user_RebadeBonus = 0;
    let level3_user_RebadeBonus = 0;
    let level4_user_RebadeBonus = 0;
    let level5_user_RebadeBonus = 0;
    let level6_user_RebadeBonus = 0;

    let level2_user_length = 0;
    let level3_user_length = 0;
    let level4_user_length = 0;
    let level5_user_length = 0;
    let level6_user_length = 0;
  
    if(data['direct_members']!== 'undefined'){
  
      data['direct_members'].forEach((item, i) => {
        level1_user_RebadeBonus += item.RebadeBonus;
      });
    }
    if(data['level2_user']!== 'undefined'){
  
      data['level2_user'].forEach((item, i) => {
        level2_user_length += item.members;
        level2_user_RebadeBonus += item.RebadeBonus;
      });
    }
    if( data['level3_user'] !== 'undefined') {
        data['level3_user'].forEach((item, i) => {
          level3_user_length += item.members;
          level3_user_RebadeBonus += item.RebadeBonus;
        });
    }
    
    if( data['level4_user'] !== 'undefined') {
        data['level4_user'].forEach((item, i) => {
          level4_user_length += item.members;
          level4_user_RebadeBonus += item.RebadeBonus;
        });
    }
    
    if( data['level5_user'] !== 'undefined') {
        data['level5_user'].forEach((item, i) => {
          level5_user_length += item.members;
          level5_user_RebadeBonus += item.RebadeBonus;
        });
    }
    
    if( data['level6_user'] !== 'undefined') {
        data['level6_user'].forEach((item, i) => {
          level6_user_length += item.members;
          level6_user_RebadeBonus += item.RebadeBonus;
        });
    }
  
    let total_rebade = (parseFloat(level1_user_RebadeBonus)+parseFloat(level2_user_RebadeBonus)+parseFloat(level3_user_RebadeBonus)+parseFloat(level4_user_RebadeBonus)+parseFloat(level5_user_RebadeBonus)+parseFloat(level6_user_RebadeBonus)).toFixed(2);
    let total_members = parseInt(data['direct_members'].length) + parseInt(level2_user_length) + parseInt(level3_user_length) +parseInt(level4_user_length) +parseInt(level5_user_length) + parseInt(level6_user_length);
    let total_withdrawal = 0;


    if (data['direct_members'].length == 0) {
      empty_img.style.display = "block"
    }else{
      empty_img.style.display = "none"
    }

    for(let item of data['direct_members']){
  
    // creating the childs to append inside the boxes;
  
    let tier1_member_child= document.createElement('div');
    tier1_member_child.classList.add('members_data');
  
    let tier1_commission_child= document.createElement('div');
    tier1_commission_child.classList.add('members_data');
  
    let new_tier1_member_body = `  <p>${item.phone}</p>
                                   <p>${item}</p>`
    let new_tier1_commission_body =  `<p>${item.phone}</p>
                                       <p>${item}</p>`
           
  
  // setting every data to the child;
    tier1_member_child.innerHTML = new_tier1_member_body;
    tier1_commission_child.innerHTML = new_tier1_commission_body;

    // now inserting the data's to the parent box
    document.querySelector("#van-tab-10").append(tier1_member_child);
    document.querySelector("#van-tab-11").append(tier1_commission_child);
  
    }
  
    if(data['level2_user'] !== 'undefined'){
  
      for(let i = 0 ; i < data['level2_user'].length; i++){
        for(let j = 0 ; j <data['level2_user'][i].length ; j++){
  
          user_profit = (parseFloat(user_profit) + parseFloat(data['level2_user'][i][j]['profit']));
          user_amount = (parseFloat(user_amount) + parseFloat(data['level2_user'][i][j]['deposit']));
          total_bets_played = parseInt(total_bets_played) + parseInt(data['level2_user'][i][j]['betPlayed']);
          total_withdrawal = parseInt(total_withdrawal) +  parseInt(data['level2_user'][i][j]['withdrawalAmmount']);
  
        
    // creating the childs to append inside the boxes;
  
    let tier2_member_child= document.createElement('div');
    tier2_member_child.classList.add('members_data');
  
    let tier2_commission_child= document.createElement('div');
    tier2_commission_child.classList.add('members_data');
  
    let new_tier2_member_body = `  <p>${item.phone}</p>
                                   <p>${item}</p>`

    let new_tier2_commission_body =  `<p>${item.phone}</p>
                                       <p>${item}</p>`
  
  // setting every data to the child;
    tier2_member_child.innerHTML = new_tier2_member_body;
    tier2_commission_child.innerHTML = new_tier2_commission_body;

    // now inserting the data's to the parent box
    document.querySelector("#van-tab-10").append(tier2_member_child);
    document.querySelector("#van-tab-11").append(tier2_commission_child);
  
  
  
        }
      }
  
    }
    

    if(data['level3_user'] !== 'undefined'){
  
      for(let i = 0 ; i < data['level3_user'].length; i++){
        for(let j = 0 ; j <data['level3_user'][i].length ; j++){
  
          user_profit = (parseFloat(user_profit) + parseFloat(data['level3_user'][i][j]['profit']));
          user_amount = (parseFloat(user_amount) + parseFloat(data['level3_user'][i][j]['deposit']));
          total_bets_played = parseInt(total_bets_played) + parseInt(data['level3_user'][i][j]['betPlayed']);
          total_withdrawal = parseInt(total_withdrawal) +  parseInt(data['level3_user'][i][j]['withdrawalAmmount']);
  
        
    // creating the childs to append inside the boxes;
  
    let tier3_member_child= document.createElement('div');
    tier3_member_child.classList.add('members_data');
  
    let tier3_commission_child= document.createElement('div');
    tier3_commission_child.classList.add('members_data');
  
    let new_tier3_member_body = `  <p>${item.phone}</p>
                                   <p>${item}</p>`

    let new_tier3_commission_body =  `<p>${item.phone}</p>
                                       <p>${item}</p>`
  
  // setting every data to the child;
    tier3_member_child.innerHTML = new_tier3_member_body;
    tier3_commission_child.innerHTML = new_tier3_commission_body;

    // now inserting the data's to the parent box
    document.querySelector("#van-tab-10").append(tier3_member_child);
    document.querySelector("#van-tab-11").append(tier3_commission_child);
  
  
  
        }
      }
  
    }
    
    if(data['level4_user'] !== 'undefined'){
  
      for(let i = 0 ; i < data['level4_user'].length; i++){
        for(let j = 0 ; j <data['level4_user'][i].length ; j++){
  
          user_profit = (parseFloat(user_profit) + parseFloat(data['level4_user'][i][j]['profit']));
          user_amount = (parseFloat(user_amount) + parseFloat(data['level4_user'][i][j]['deposit']));
          total_bets_played = parseInt(total_bets_played) + parseInt(data['level4_user'][i][j]['betPlayed']);
          total_withdrawal = parseInt(total_withdrawal) +  parseInt(data['level4_user'][i][j]['withdrawalAmmount']);
  
        
    // creating the childs to append inside the boxes;
  
    let tier4_member_child= document.createElement('div');
    tier4_member_child.classList.add('members_data');
  
    let tier4_commission_child= document.createElement('div');
    tier4_commission_child.classList.add('members_data');
  
    let new_tier4_member_body = `  <p>${item.phone}</p>
                                   <p>${item}</p>`

    let new_tier4_commission_body =  `<p>${item.phone}</p>
                                       <p>${item}</p>`
  
  // setting every data to the child;
    tier4_member_child.innerHTML = new_tier4_member_body;
    tier4_commission_child.innerHTML = new_tier4_commission_body;

    // now inserting the data's to the parent box
    document.querySelector("#van-tab-10").append(tier4_member_child);
    document.querySelector("#van-tab-11").append(tier4_commission_child);
  
  
  
        }
      }
  
    }


    if(data['level5_user'] !== 'undefined'){
  
      for(let i = 0 ; i < data['level5_user'].length; i++){
        for(let j = 0 ; j <data['level5_user'][i].length ; j++){
  
          user_profit = (parseFloat(user_profit) + parseFloat(data['level5_user'][i][j]['profit']));
          user_amount = (parseFloat(user_amount) + parseFloat(data['level5_user'][i][j]['deposit']));
          total_bets_played = parseInt(total_bets_played) + parseInt(data['level5_user'][i][j]['betPlayed']);
          total_withdrawal = parseInt(total_withdrawal) +  parseInt(data['level5_user'][i][j]['withdrawalAmmount']);
  
        
    // creating the childs to append inside the boxes;
  
    let tier5_member_child= document.createElement('div');
    tier5_member_child.classList.add('members_data');
  
    let tier5_commission_child= document.createElement('div');
    tier5_commission_child.classList.add('members_data');
  
    let new_tier5_member_body = `  <p>${item.phone}</p>
                                   <p>${item}</p>`

    let new_tier5_commission_body =  `<p>${item.phone}</p>
                                       <p>${item}</p>`
  
  // setting every data to the child;
    tier5_member_child.innerHTML = new_tier5_member_body;
    tier5_commission_child.innerHTML = new_tier5_commission_body;

    // now inserting the data's to the parent box
    document.querySelector("#van-tab-10").append(tier5_member_child);
    document.querySelector("#van-tab-11").append(tier5_commission_child);
  
  
  
        }
      }
  
    }


    if(data['level6_user'] !== 'undefined'){
  
      for(let i = 0 ; i < data['level6_user'].length; i++){
        for(let j = 0 ; j <data['level6_user'][i].length ; j++){
  
          user_profit = (parseFloat(user_profit) + parseFloat(data['level6_user'][i][j]['profit']));
          user_amount = (parseFloat(user_amount) + parseFloat(data['level6_user'][i][j]['deposit']));
          total_bets_played = parseInt(total_bets_played) + parseInt(data['level6_user'][i][j]['betPlayed']);
          total_withdrawal = parseInt(total_withdrawal) +  parseInt(data['level6_user'][i][j]['withdrawalAmmount']);
  
        
    // creating the childs to append inside the boxes;
  
    let tier6_member_child= document.createElement('div');
    tier6_member_child.classList.add('members_data');
  
    let tier6_commission_child= document.createElement('div');
    tier6_commission_child.classList.add('members_data');
  
    let new_tier6_member_body = `  <p>${item.phone}</p>
                                   <p>${item}</p>`

    let new_tier6_commission_body =  `<p>${item.phone}</p>
                                       <p>${item}</p>`
  
  // setting every data to the child;
    tier6_member_child.innerHTML = new_tier6_member_body;
    tier6_commission_child.innerHTML = new_tier6_commission_body;

    // now inserting the data's to the parent box
    document.querySelector("#van-tab-10").append(tier6_member_child);
    document.querySelector("#van-tab-11").append(tier6_commission_child);
  
  
  
        }
      }
  
    }




    document.querySelector('#level1_rebate').innerText =  level1_user_RebadeBonus ;
    document.querySelector('#level2_rebate').innerText =  level2_user_RebadeBonus ;
    document.querySelector('#level3_rebate').innerText =  level3_user_RebadeBonus ;
    document.querySelector('#level4_rebate').innerText =  level4_user_RebadeBonus ;
    document.querySelector('#level5_rebate').innerText =  level5_user_RebadeBonus ;
    document.querySelector('#level6_rebate').innerText =  level6_user_RebadeBonus ;

    document.querySelector('#level1_member').innerText =   parseInt(data['direct_members'].length) ;
    document.querySelector('#level2_member').innerText =  level2_user_length ;
    document.querySelector('#level3_member').innerText =  level3_user_length ;
    document.querySelector('#level4_member').innerText =  level4_user_length ;
    document.querySelector('#level5_member').innerText =  level5_user_length ;
    document.querySelector('#level6_member').innerText =  level6_user_length ;

    document.querySelectorAll('.s_members').forEach((item, i) => {
      item.innerText = total_members;
    });
    document.querySelector("#total_rebate").innerText = total_rebade;
    document.querySelector('#s_tot_profit').innerText = parseFloat(user_profit.toFixed(2));
    document.querySelector('#s_tot_deposit').innerText = parseFloat(user_amount.toFixed(2));
  
    return;
}


async function get_all_members(){
  
    let config = {
      method : 'GET',
      headers : {
        'content-type' : 'application/json'
      }
    };
  
    let response = await fetch('/get_all_members' , config);
    response = await response.json();
  
    if(response['status'] == 1){
      create_members(response);
    }else if(response['status'] == 0){
      window.location.href = window.location.origin + '/login';
    }
  
}
  


  get_all_members();

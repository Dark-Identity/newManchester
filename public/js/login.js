let popup_cancel_btn = document.querySelector('#popup_close_btn');
let popup_tip = document.querySelector('#popup_tip');
let popup_page = document.querySelector("#popup_page");

const input_background = document.querySelectorAll('.van-field__body');
input_background.forEach(element => {
  element.addEventListener('click', () => {
    element.style.background = "#ffffff25";
  });
});


const registerbtn = document.querySelector('.registerbtn');

function disable_btns() {
  setTimeout(() => {
    document.querySelector('#contact_num').disabled = false;
    document.querySelector('#otp_btn').disabled = false;
    document.querySelector('#otp_btn').style.background = '-webkit-linear-gradient(right, #003366, #004080, #0059b3, #0073e6)';
  }, 30 * 1000)
}

document.querySelector('#otp_btn').addEventListener('click', async () => {

  document.querySelector('#otp_btn').disabled = true;
  popup_cancel_btn.disabled = true;
  popup_page.style.left = '0vw';

  let contact = document.querySelector('#contact_num').value;
  document.querySelector('#contact_num').disabled = true;

  if (!contact || contact === undefined) {
    document.querySelector('#contact_num').style.border = '1px solid red';
    return;
  } else {
    let config = {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ contact })
    }
    let response = await fetch('/get_otp', config);
    response = await response.json();

    if (response['status'] == 1) {
      popup_tip.innerText = 'Success! otp sent wait 30sec to send again.';
      popup_close_btn.disabled = false;
      document.querySelector('#otp_btn').style.background = 'grey';
    } else if (response['status'] === 2) {
      popup_tip.innerText = 'wait 30 sec before trying again.';
      popup_close_btn.disabled = false;
      document.querySelector('#otp_btn').style.background = 'grey';
    } else {
      popup_tip.innerText = 'Failure! something went wrong try again after 30sec.';
      popup_close_btn.disabled = false;
      document.querySelector('#otp_btn').style.background = 'grey';
    }

    disable_btns();

  }

})



registerbtn.addEventListener('click', async (e) => {

  e.preventDefault();

  popup_page.style.left = '0px';
  popup_cancel_btn.disabled = true;


  let phone = document.querySelector('.num').value;
  let email = document.querySelector('.email').value;
  let password = document.querySelector('.password').value;
  let verification = document.querySelector('.verification').value;
  let inv = document.querySelector('.invitation').value;

  const validEmail = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";

  inv = (inv === '') ? 0 : inv;


  if (phone.length !== 10 || phone === ' ') {
    popup_tip.innerText = 'Enter 10 digit number';
    popup_cancel_btn.disabled = false;
    return;
  }
  else if (password === '') {
    popup_tip.innerText = 'Enter the password';
    popup_cancel_btn.disabled = false;
    return;
  }
  else if (verification === '') {
    popup_tip.innerText = 'Enter the valid otp';
    popup_cancel_btn.disabled = false;
    return;
  } else if (email) {
    if (email.match(validEmail) === null) {
      popup_tip.innerText = 'Enter the valid email';
      popup_cancel_btn.disabled = false;
      return;
    } else {
      email = "0";
    }
  }


  const data = {
    password: password,
    invitation_code: inv,
    contact: phone,
    otp: verification,
    email: email

  }


  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  let res = await fetch('/', config);
  let res_data = await res.json();




  if(res_data){

    if(res_data.status === 404){ //name already exits
      popup_tip.innerText = 'Failure! This user name already exists.';
      popup_close_btn.disabled = false;

    }else if (res_data.status === 101) {  
      //phone number already exits
       popup_tip.innerText = 'Failure! contact already exists.';
      popup_close_btn.disabled = false;

    }else if(res_data.status === 0){ //someting went wrong
      window.location.reload();
    }else if(res_data.status === 1){ //user created
      window.location.href = window.location.origin + '/home';
    }else{
      popup_tip.innerText = res_data['status'];
      popup_close_btn.disabled = false;
    }
  }

  return;


})



document.querySelector("#popup_close_btn").addEventListener('click', () => {
  document.querySelector('#popup_page').style.left = '-100vw';
  popup_tip.innerText = 'Loading...';
})




document.querySelector('#show').addEventListener('click',()=>{
  var x = document.getElementById("myInput");
  let y = document.querySelector('#eye_open')
  let z = document.querySelector('#eye_close')

   console.log('works');
  if (x.type === "password") {
    z.style.display = 'none';
    y.style.display = 'block';
    x.type = "text";
  } else {
    x.type = "password";
    y.style.display = 'none';
    z.style.display = 'block';
  }
});

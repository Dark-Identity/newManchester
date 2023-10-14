// ----------------------------------------------------- login page -----------------------------------------------

let popup_cancel_btn = document.querySelector('#popup_close_btn');
let popup_tip = document.querySelector('#popup_tip');
let popup_page = document.querySelector("#popup_page");



const loginBtn = document.querySelector('.logbtn');
loginBtn.addEventListener('click', async (e) => {

    e.preventDefault();
    popup_page.style.left = '0px';
    popup_cancel_btn.disabled = true;


    let number = document.querySelector('.number').value;
    let password = document.querySelector('.password').value;

    if (number.length !== 10 || number === ' ') {
        popup_tip.innerText = 'Enter 10 digit number';
        popup_cancel_btn.disabled = false;
        return;
    }
    else if (password === '') {
        popup_tip.innerText = 'Enter the password';
        popup_cancel_btn.disabled = false;
        return;
    }


    const data = {
        number: number,
        password: password,
    }


    const config = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let res = await fetch('/login', config);
    let res_data = await res.json();


    if (res_data['status'] == 102) {
        popup_tip.innerText = 'Success! Logged in.';
        window.location.href = window.location.origin + '/home';
        popup_cancel_btn.disabled = false;
    }
    else if (res_data['status'] == 400) {
        popup_tip.innerText = 'Failure! Login first'
        popup_cancel_btn.disabled = false;

    }
    else if (res_data['status'] == 0) {
        popup_tip.innerText = 'Failure! something went wrong , please try again.'
        popup_cancel_btn.disabled = false;
    }
})





document.querySelector("#popup_close_btn").addEventListener('click', () => {
    document.querySelector('#popup_page').style.left = '-100vw';
    popup_tip.innerText = 'Loading...';
})




document.querySelector('#show').addEventListener('click', () => {
    var x = document.getElementById("van-field-6-input");
    let y = document.querySelector('#eye_open')
    let z = document.querySelector('#eye_close')
    console.log(x);
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




//   -------------------------------------------- forget password ----------------------------
const login_page = document.querySelector('.loginCantainer');
const forget_page = document.querySelector('.forget_page');

document.querySelector('.forgetbtn').addEventListener('click', () => {
    console.log('works');
    login_page.style.zIndex = "-1";
    forget_page.style.zIndex = "1";
})
document.querySelector('.forget_close').addEventListener('click', () => {
    login_page.style.zIndex = "1";
    forget_page.style.zIndex = "-1";
});


document.querySelector('#otp_btn').addEventListener('click', async () => {

    document.querySelector('#otp_btn').disabled = true;
    popup_cancel_btn.disabled = true;
    popup_page.style.left = '0vw';

    let contact = document.querySelector('.number').value;
    document.querySelector('.number').disabled = true;
    if (contact == " ") {
        popup_tip.innerText = 'Enter the number';
        popup_cancel_btn.disabled = false;
        return;
    }
    if (!contact || contact === undefined) {
        document.querySelector('.number').style.border = '1px solid red';

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

document.querySelector('.forget_btn').addEventListener('click', async(e)=>{

    e.preventDefault();

    popup_page.style.left = '0px';
    popup_cancel_btn.disabled = true;
  
  
    let phone = document.querySelector('#contact').value;
    let verification = document.querySelector('#verification').value;
    let password = document.querySelector('#password').value;
    let Confirm_pass = document.querySelector('#confrim_password')
  
  
  
    if (phone.length !== 10 || phone === ' ') {
      popup_tip.innerText = 'Enter 10 digit number';
      popup_cancel_btn.disabled = false;
      return;
    }
    else if (verification === '') {
      popup_tip.innerText = 'Enter the valid otp';
      popup_cancel_btn.disabled = false;
      return;
    } 
    else if (password === '') {
        popup_tip.innerText = 'Enter the password';
        popup_cancel_btn.disabled = false;
        return;
    }else if (Confirm_pass === '') {
        popup_tip.innerText = 'Enter the confirm password';
        popup_cancel_btn.disabled = false;
        return;
    }
    else if (password ===  Confirm_pass) {
        console.log(password , Confirm_pass);
        password = Confirm_pass;
        return;
    }
  
    // const data = {
    //   password: password,
    //   invitation_code: inv,
    //   contact: phone,
    //   otp: verification,
    //   email: email
  
    // }
  
  
    // const config = {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // }
  
    // let res = await fetch('/', config);
    // let res_data = await res.json();
  
  
  
  
    // if(res_data){
  
    //   if(res_data.status === 404){ //name already exits
    //     popup_tip.innerText = 'Failure! This user name already exists.';
    //     popup_close_btn.disabled = false;
  
    //   }else if (res_data.status === 101) {  
    //     //phone number already exits
    //      popup_tip.innerText = 'Failure! contact already exists.';
    //     popup_close_btn.disabled = false;
  
    //   }else if(res_data.status === 0){ //someting went wrong
    //     window.location.reload();
    //   }else if(res_data.status === 1){ //user created
    //     window.location.href = window.location.origin + '/home';
    //   }else{
    //     popup_tip.innerText = res_data['status'];
    //     popup_close_btn.disabled = false;
    //   }
    // }
  
  

});
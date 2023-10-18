const forget_btn = document.querySelector('#forget_btn');
const popup_cancel_btn = document.querySelector('#popup_close_btn');



document.querySelector("#popup_close_btn").addEventListener('click', () => {
    document.querySelector('#popup_page').style.left = '-100vw';
    popup_tip.innerText = 'Loading...';
})


document.querySelector('#otp_btn').addEventListener('click', async () => {

    document.querySelector('#otp_btn').disabled = true;
    popup_cancel_btn.disabled = true;
    popup_page.style.left = '0vw';

    let contact = document.querySelector('#num').value;
    document.querySelector('#num').disabled = true;
    if (contact == " ") {
        popup_tip.innerText = 'Enter the number';
        popup_cancel_btn.disabled = false;
        return;
    }
    if (!contact || contact === undefined) {
        document.querySelector('#num').style.border = '1px solid red';
        popup_cancel_btn.disabled = false;

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

        // disable_btns();

    }

})

forget_btn.addEventListener('click', async (e) => {

    e.preventDefault();

    popup_page.style.left = '0px';
    popup_cancel_btn.disabled = true;


    let num = document.querySelector('#num').value;
    let otp = document.querySelector('#otp').value;
    let pass_one = document.querySelector('#pass_one').value;
    let pass_two = document.querySelector('#pass_two').value;


    if (num.length !== 10 || num === ' ') {
        popup_tip.innerText = 'Enter 10 digit number';
        popup_cancel_btn.disabled = false;
        return;
    }
    else if (otp === '') {
        popup_tip.innerText = 'Enter the valid otp';
        popup_cancel_btn.disabled = false;
        return;
    }
    else if (pass_one === '') {
        popup_tip.innerText = 'Enter the password';
        popup_cancel_btn.disabled = false;
        return;
    } else if (pass_two === '') {
        popup_tip.innerText = 'Enter the confirm password';
        popup_cancel_btn.disabled = false;
        return;
    }
    else if (pass_one === pass_two) {
        pass_two = 0;
    } else {
        popup_tip.innerText = 'password not matched';
        popup_cancel_btn.disabled = false;
    }

    console.log(num, pass_one, otp);

    let data = {
        phone: num,
        password: pass_one,
        otp: otp
    }


    const config = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    console.log(config);



    let res = await fetch('/forget_password', config); console.log(res);
    let res_data = await res.json();

    console.log(res_data);


    if (res_data) {

    } else if (res_data.status === 3) { //someting went wrong
        popup_tip.innerText = 'Enter the valid data';
        popup_close_btn.disabled = false;
    }
    else if (res_data.status === 1) { //someting went wrong
        popup_tip.innerText = 'successfully changed';
        popup_close_btn.disabled = false;
    }
    
    else if (res_data.status === 10) { //someting went wrong
        popup_tip.innerText = 'User not exits';
        popup_close_btn.disabled = false;
    }
    else {
        popup_tip.innerText = res_data['status'];
        popup_close_btn.disabled = false;
    }

         

   


});

document.querySelector('.forget_close').addEventListener('click',()=>{
    window.location.href = "/login"

});
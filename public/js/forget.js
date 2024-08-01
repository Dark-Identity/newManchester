const forget_btn = document.querySelector("#forget_btn");
const popup_cancel_btn = document.querySelector("#popup_close_btn");

document.querySelector("#popup_close_btn").addEventListener("click", () => {
  document.querySelector("#popup_page").style.left = "-100vw";
  popup_tip.innerText = "Loading...";
});

document.querySelector("#otp_btn").addEventListener("click", async () => {
  document.querySelector("#otp_btn").disabled = true;
  popup_cancel_btn.disabled = true;
  popup_page.style.left = "0vw";

  let contact = document.querySelector("#num").value;
  document.querySelector("#num").disabled = true;
  if (contact == " ") {
    popup_tip.innerText = "Enter the number";
    popup_cancel_btn.disabled = false;
    return;
  }
  if (!contact || contact === undefined) {
    document.querySelector(".gap > div").style.border = "1px solid red";

    popup_cancel_btn.disabled = false;

    return;
  } else {
    let config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ contact }),
    };
    let response = await fetch("/get_otp", config);
    response = await response.json();

    if (response["status"] == 1) {
      popup_tip.innerText = "Success! otp sent wait 30sec to send again.";
      popup_close_btn.disabled = false;
      document.querySelector("#otp_btn").style.background = "grey";
    } else if (response["status"] === 2) {
      popup_tip.innerText = "wait 30 sec before trying again.";
      popup_close_btn.disabled = false;
      document.querySelector("#otp_btn").style.background = "grey";
    } else {
      popup_tip.innerText =
        "Failure! something went wrong try again after 30sec.";
      popup_close_btn.disabled = false;
      document.querySelector("#otp_btn").style.background = "grey";
    }

    // disable_btns();
  }
});

forget_btn.addEventListener("click", async (e) => {
  e.preventDefault();

  popup_page.style.left = "0px";
  popup_cancel_btn.disabled = true;

  let num = document.querySelector("#num").value;
  let otp = document.querySelector("#otp").value;
  let pass_one = document.querySelector("#pass_one").value;

  if (num.length !== 10 || num === " ") {
    popup_tip.innerText = "Enter 10 digit number";
    popup_cancel_btn.disabled = false;
    return;
  } else if (otp === "") {
    popup_tip.innerText = "Enter the valid otp";
    popup_cancel_btn.disabled = false;
    return;
  } else if (pass_one === "" || !pass_one == undefined) {
    popup_tip.innerText = "Enter the password";
    popup_cancel_btn.disabled = false;
    return;
  }

  let data = {
    phone: num,
    password: pass_one,
    otp: otp,
  };

  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch("/forget_password", config);
  console.log(res);
  let res_data = await res.json();

  if (res_data) {
    if (res_data.status === 1) {
      popup_tip.innerText = "susuccessfully password changed.";
      popup_close_btn.disabled = false;
      window.location.href = window.location.origin + "/home";
    } else if (res_data.status === 3) {
      popup_tip.innerText = "Enter the valid data.";
      popup_close_btn.disabled = false;
    } else {
      popup_tip.innerText = res_data?.status || "something went wrong";
      popup_close_btn.disabled = false;
    }
  }
});

 
document.querySelector(".forget_close").addEventListener("click", () => {
  window.location.href = "/login";
});

document.querySelector("#show").addEventListener("click", () => {
  var x = document.getElementById("pass_one");
  let y = document.querySelector("#eye_open");
  let z = document.querySelector("#eye_close");
  if (x.type === "password") {
    z.style.display = "none";
    y.style.display = "block";
    x.type = "text";
  } else {
    x.type = "password";
    y.style.display = "none";
    z.style.display = "block";
  }
});

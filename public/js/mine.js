const minePopup = document.querySelectorAll(".list-ui");
const qr = document.querySelector(".qr");
const rule = document.querySelector(".ruleCantainer");
const service = document.querySelector(".serviceCantainer");
const content = document.querySelector(".Content");
const reward = document.querySelector(".rewards");
const footer = document.querySelector(".footerCantainer");
const account = document.querySelector("#Account");
const accBtn = document.querySelector(".bankuis");
const popup_page = document.querySelector(".popup_page");
const popup_cancel_btn = document.querySelector("#popup_close_btn");

const popup_close_btn = document.querySelector("#popup_close_btn");

document.querySelector(".telbox").addEventListener("click", () => {
  window.location.href = "https://t.me/customerservice_CS";
});

document.querySelector(".onlieser").addEventListener("click", () => {
  window.location.href = "https://t.me/+HJ0wT7JQA7wwY2E9";
});

window.addEventListener("load", () => {
  let scale_object = document.querySelector(".loader");
  scale_object.style.animation = "shadowPulse 2s linear infinite";
  setTimeout(() => {
    let elem = document.querySelector("#loading");
    elem.remove();
  }, 3000);
});

popup_close_btn.addEventListener("click", () => {
  document.querySelector("#popup_page").style.left = "-100vw";
  popup_tip.innerText = "Loading...";
});

minePopup.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id == "qr") {
      content.style.zIndex = "-1";
      footer.style.zIndex = "-1";
      qr.style.zIndex = "1";
      document.querySelector("#chat-widget-container").style.zIndex = -1;
    } else if (element.id == "rule") {
      content.style.zIndex = "-1";
      footer.style.zIndex = "-1";
      rule.style.zIndex = "1";
    } else if (element.id == "service") {
      content.style.zIndex = "-1";
      footer.style.zIndex = "-1";
      service.style.zIndex = "1";
      document.querySelector("#chat-widget-container").style.zIndex = 2398749;
    } else if (element.id == "reward") {
      content.style.cssText = `    
            transition: all .5s;  
            filter:brightness(50%);
            z-index:-1;
            `;

      footer.style.cssText = `    
            filter:brightness(50%);
            `;

      reward.style.cssText = `            
            z-index:1;
            `;
    }
  });
});

accBtn.addEventListener("click", () => {
  content.style.zIndex = "-1";
  footer.style.zIndex = "-1";
  account.style.zIndex = "1";
});

const passwordCantainer = document.querySelector(".passwordCantainer");
document.querySelector("#password > img").addEventListener("click", () => {
  content.style.zIndex = "-1";
  footer.style.zIndex = "-1";
  passwordCantainer.style.zIndex = "1";
});

const resultCantain = document.querySelector(".resultCantain");
document.querySelector("#match_result").addEventListener("click", () => {
  content.style.zIndex = "-1";
  footer.style.zIndex = "-1";
  resultCantain.style.zIndex = "1";
});

document.querySelector(".passback").addEventListener("click", () => {
  content.style.zIndex = "1";
  footer.style.zIndex = "1";
  passwordCantainer.style.zIndex = "-1";
});

document.querySelector("#match_back").addEventListener("click", () => {
  content.style.zIndex = "1";
  footer.style.zIndex = "1";
  resultCantain.style.zIndex = "-1";
});

const install = document.querySelector(".install");
document.querySelector("#download").addEventListener("click", () => {
  // document.querySelector("#chat-widget-container")?.style?.display = "none";
  install.style.zIndex = "1";
});
document.querySelector("#install_close").addEventListener("click", () => {
  // document.querySelector("#chat-widget-container")?.style?.display = "block";
  install.style.zIndex = "-1";
  content.style.zIndex = "1";
});

const back = document.querySelectorAll(".tirs");

back.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id == "qr") {
      content.style.zIndex = "1";
      footer.style.zIndex = "1";
      qr.style.zIndex = "-1";
    } else if (element.id == "rule") {
      content.style.zIndex = "1";
      footer.style.zIndex = "1";
      rule.style.zIndex = "-1";
    } else if (element.id == "service") {
      content.style.zIndex = "1";
      footer.style.zIndex = "1";
      service.style.zIndex = "-1";
    } else if (element.id == "reward") {
      content.style.cssText = `    
            transition: all .5s;  
            filter:brightness(100%);
            z-index:-1;
            `;

      footer.style.cssText = `    
            filter:brightness(100%);
            `;

      reward.style.cssText = `            
            z-index:-1;
            `;
    }
  });
});

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

async function get_freezing_asset() {
  let config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  let response = await fetch("/freesing_asset", config);
  response = await response.json();
  if (response["status"] === 1) {
    document.querySelector("#current_bet_amount").innerText =
      "Rs" + response["data"];
  } else {
    window.location.href = window.location.origin + "/login";
  }
}
get_freezing_asset();

function set_user_data(info) {
  // selectAll('.s_invitation').forEach((item, i) => {

  //     item.value = `${window.location.origin + '/signup' + '?id=' + info['inv']}`;

  //   });

  get_inv(parseInt(info["inv"]));

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
      let num = ("" + info["BankDetails"][0]["AcNumber"]).slice(-4);

      item.value = num;
    });
  }
}

get_user_data();

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------- password function ----------------------------------------------------------------------------------------

async function getEmailOtp() {
  popup_cancel_btn.disabled = true;
  popup_page.style.left = "0vw";

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
}
async function getPhoneOtp() {
  popup_cancel_btn.disabled = true;
  popup_page.style.left = "0vw";

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
}

document.querySelector("#get_email_otp").addEventListener("click", async () => {
  document.querySelector("#get_email_otp").disabled = true;
  await getEmailOtp();
  document.querySelector("#get_email_otp").disabled = false;
});

document.querySelector("#get_phone_otp").addEventListener("click", async () => {
  document.querySelector("#get_phone_otp").disabled = true;
  await getPhoneOtp();
  document.querySelector("#get_phone_otp").disabled = false;
});

document.querySelector("#pbtn").addEventListener("click", async () => {
  let details = document.querySelectorAll(".pass_change");
  let phone_otp = document.querySelector("#phone_otp").value;
  let email_otp = document.querySelector("#email_otp").value;
  popup_page.style.left = "0px";

  if (!((!phone_otp && email_otp) || (!email_otp && phone_otp))) {
    popup_tip.innerText = "Enter only one Otp";
    return;
  }
  popup_cancel_btn.disabled = true;
  let otp = phone_otp || email_otp;
  if (
    details[1].value !== "" &&
    details[2].value !== "" &&
    details[0].vlaue !== ""
  ) {
    if (details[1].value !== details[2].value) {
      popup_tip.innerText = "Password not matched!.";
      popup_cancel_btn.disabled = false;
      return;
    }

    let previous_code = details[0].value;
    let new_code = details[1].value;

    let data = {
      previous_code,
      new_code,
      otp,
    };
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: await JSON.stringify(data),
    };

    let response = await fetch("/password", config);
    response = await response.json();

    if (response["status"] == 1) {
      popup_tip.innerText = "Success! password changed.";
      popup_cancel_btn.disabled = false;
    } else {
      popup_tip.innerText = response["status"];
      popup_cancel_btn.disabled = false;

      return;
    }
  } else {
    popup_tip.innerText = "Enter all the details.";
    popup_cancel_btn.disabled = false;

    return;
  }
});

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------ record page -------------------------------------------------------------------------
const record_page = document.querySelector(".record_page");
document.querySelector("#record").addEventListener("click", () => {
  record_page.style.zIndex = "1";
  footer.style.zIndex = "-1";
});
document.querySelector(".recordback").addEventListener("click", () => {
  record_page.style.zIndex = "-1";
  footer.style.zIndex = "1";
});

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------- logout function ---------------------------------------------------------------------------------------------------------------------------------

document.querySelector("#logout").addEventListener("click", async () => {
  let config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  fetch("/logout", config);
  window.location.href = window.location.origin + "/login";
});
// ------------------------------------------------------------------------ getting the records from the backend -----------------------------------------------------------------------------------

function create_withdrawal(data) {
  let withdrawal_parent_box = document.querySelector(".parent_div");

  if (data && data.length) {
    data.forEach((item, i) => {
      let child = document.createElement("div");
      child.classList.add("record_parent_div");
      let status = "";
      let status_type = "";

      if (item["status"] == 0) {
        status = "yellow";
        status_type = "pending";
      } else if (item["status"] == 1) {
        status = "lime";
        status_type = "successfull";
      } else if (item["status"] == 2) {
        status = "red";
        status_type = "cancelled";
      }

      let body = `
      <section class="record_parent_div">
      <div class="recordss">
      <div style="display:flex;justify-content: space-between;">
      <p>Withdrawal</p>
      <span>
          <i style='color : ${status};' class="fa-sharp fa-solid fa-circle"></i>
          <h5>${status_type}</h5>
      </span>
     </div>
          <div style="display:flex;justify-content: space-between;margin-top:1vw">
              <p>${item.date}  ${item.time}</p>
              <p>${item.Ammount}</p>
          </div>
      </div>
      </section>

      `;

      child.innerHTML = body;

      withdrawal_parent_box.append(child);
    });
  }
}

function create_deposit(data) {
  let deposit_parent_box = document.querySelector(".deposite_parent");
  if (data && data.length) {
    data.forEach((item, i) => {
      let child = document.createElement("div");
      child.classList.add("record_parent_div");
      let status = "";
      let status_type = "";

      if (item["status"] == 0) {
        status = "yellow";
        status_type = "pending";
      } else if (item["status"] == 1) {
        status = "lime";
        status_type = "successfull";
      } else if (item["status"] == 2) {
        status = "red";
        status_type = "cancelled";
      }

      let body = `
      <section class="record_parent_div" id="deposite_record">
      <div class="recordss">
          <div style="display:flex;justify-content: space-between;">
              <p>Deposit</p>
              <span>
                  <i style='color : ${status};' class="fa-sharp fa-solid fa-circle"></i>
                  <h5>${status_type}</h5>
              </span>
          </div>
          <div style="display:flex;justify-content: space-between;margin-top:1vw">
              <p>${item.date}  ${item.time}</p>
              <p>${item.Ammount}</p>
          </div>
       </div>
     </section>

      
      `;

      child.innerHTML = body;

      deposit_parent_box.append(child);
    });
  }
}

function create_other_data(data) {
  let deposit_parent_box = document.querySelector(".other_parent");
  if (data && data.length) {
    data.forEach((item, i) => {
      let child = document.createElement("div");
      child.classList.add("record_parent_div");
      let status = "";
      let status_type = "";

      status = "lime";
      status_type = "successfull";

      let body = `
            <section class="record_parent_div">
                <div class="recordss">
                    <div style="display:flex;justify-content: space-between;">
                        <p>Other</p>
                        <span>
                            <i style='color : ${status};' class="fa-sharp fa-solid fa-circle"></i>
                            <h5>${status_type}</h5>
                        </span>
                    </div>
                    <div style="display:flex;justify-content: space-between;margin-top:1vw">
                        <p>${item.date}</p>
                        <p>${item.Ammount}</p>
                    </div>
                </div>
            </section>
`;

      child.innerHTML = body;

      deposit_parent_box.append(child);
    });
  }
}

async function get_payment() {
  let config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  let res_data = await fetch("/get_payment_data", config);

  res_data = await res_data.json();
  create_deposit(res_data["deposit"]);
  create_withdrawal(res_data["withdrawal"]);
  create_other_data(res_data["other"]);
  // create_deposit(res_data['deposit']);
}

get_payment();

// --------------------------------------------------------------------------------------------------------------------------------
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const oneP = document.querySelector("#one>p");
const twoP = document.querySelector("#two>p");
const threeP = document.querySelector("#three>p");
const secondOuter = document.querySelector(".secondOuter");
const withdraw_parent = document.querySelector(".withdraw_parent");
const deposite_parent = document.querySelector(".deposite_parent");
const other_parent = document.querySelector(".other_parent");

one.addEventListener("click", () => {
  secondOuter.style.cssText = `justify-content: start;`;
  withdraw_parent.style.display = "block";
  deposite_parent.style.display = "none";
  other_parent.style.display = "none";
});

two.addEventListener("click", () => {
  secondOuter.style.cssText = `justify-content: center;`;
  withdraw_parent.style.display = "none";
  deposite_parent.style.display = "block";
  other_parent.style.display = "none";
});

three.addEventListener("click", () => {
  secondOuter.style.cssText = `justify-content: end;`;
  withdraw_parent.style.display = "none";
  deposite_parent.style.display = "none";
  other_parent.style.display = "block";
});

// -------------------------------------------------------------------------------------------------------
function create_match_history(data) {
  let ndate = new Date(data["raw_date"]);
  let date = new Date(data["raw_date"]);

  let parent_box = document.querySelector(".match_history");
  let match_card = document.createElement("div");
  match_card.classList.add("list-box");
  match_card.classList.add("bet_card_two");

  let body = `<div class="list-box" data-v-3997c59e="">
    <div class="invest-box" data-v-3997c59e="">
        <div class="league flex" data-v-3997c59e="">
            <div class="leftbox" data-v-3997c59e="">
                <p class="circlet" data-v-3997c59e="" style=".8vw solid skyblue"></p>
                <p  class="league_id" id="league_id" style="display:none">${
                  data["fixture_id"]
                }</p>
                <p class="ellipsis-1 namematch" data-v-3997c59e="">Netherlands
                ${data["league"]}
                </p>
            </div>
            <p class="matchdata" data-v-3997c59e="">${[
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate(),
            ].join("|")} ${date.getHours()}:${date.getMinutes()}</p>
        </div>
        <div class="vsmath" data-v-3997c59e="">
            <div class="loadimg" data-v-3997c59e="">
                <div class="van-image logo-img" data-v-3997c59e=""><img
                        src="/elephantFootball/football.png"
                        class="van-image__img"><!----><!----></div>
                <p class="nameu ellipsis-1" data-v-3997c59e="">${
                  data["team_a"]
                }</p>
            </div>
            <div class="centerz" data-v-3997c59e="">
                <p class="scorei" data-v-3997c59e="">${data["team_a_goal"]} - ${
    data["team_b_goal"]
  }</p>  
            </div>
            <div class="loadimg" data-v-3997c59e="">
                <div class="van-image logo-img" data-v-3997c59e=""><img
                        src="/elephantFootball/football.png"
                        class="van-image__img"><!----><!----></div>
                <p class="nameu ellipsis-1" data-v-3997c59e="">${data["team_b"]}
                </p>
            </div>
        </div>
    </div>
</div>`;

  match_card.innerHTML = body;
  parent_box.append(match_card);
}

async function get_history_matches() {
  let res = await fetch("/get_history_matches");
  res = await res.json();

  if (res?.status !== 0) {
    for (let match_data of res) {
      create_match_history(match_data);
    }
  } else {
    window.location.href = window.location.origin + "/login";
  }
}
get_history_matches();

document.querySelector("#show").addEventListener("click", () => {
  var x = document.getElementById("myInput");
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

document.querySelector("#show_two").addEventListener("click", () => {
  var x = document.getElementById("myInput_two");
  let y = document.querySelector("#eye_open_two");
  let z = document.querySelector("#eye_close_two");

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

document.querySelector("#show_three").addEventListener("click", () => {
  var x = document.getElementById("myInput_three");
  let y = document.querySelector("#eye_open_three");
  let z = document.querySelector("#eye_close_three");

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

// --------------------------QR CODE GENERATION ---------------------

let qr_code_element = document.querySelector("#qrcode");

function generate(value) {
  qr_code_element.style = "";

  var qrcode = new QRCode(qr_code_element, {
    text: `${value}`,
    width: 180, //128
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

async function get_inv(inv_code) {
  let inv = { INV: inv_code };
  if (inv["INV"] !== 0) {
    document.querySelector(".inv_code ").innerText = inv["INV"];
    document.querySelector("#invitation_link").innerText = `${
      window.location.origin + "/signup/" + "?id=" + inv["INV"]
    }`;
    generate(`${window.location.origin + "/signup/" + "?id=" + inv["INV"]}`);
  } else {
    window.location.href = window.location.origin + "/";
    return;
  }
}

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

document.querySelector("#tirThree").addEventListener("click", () => {
  rule.style.zIndex = "-1";
  content.status.zIndex = "1";
});

document.querySelector("#copy_url_btn").addEventListener("click", () => {
  let text = document.querySelector(".inv_code").innerText;
  copyPageUrl(text);
});

document
  .querySelector("#invitation_link_cpy_btn")
  .addEventListener("click", () => {
    let text = document.querySelector("#invitation_link").innerText;
    copyPageUrl(text);
  });

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

document.querySelector("#ios_app").addEventListener("click", (e) => {
  e.preventDefault();
  popup_page.style.left = "0vw";
  popup_tip.innerText = "Comming soon";
});

// ---------------------------------------------------------------------------------------------------------------------
// --------------------------------- number verification for reset password --------------------------------

document
  .querySelector("#reset_password_send_otp_btn")
  .addEventListener("click", async () => {
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    };

    let res = await fetch("/verify_number", config);
    let res_data = await res.json();
  });

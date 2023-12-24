const tiers = document.querySelectorAll(".teamlist");
const teamPopup = document.querySelector(".teamPopup");
let popup_cancel_btn = document.querySelector("#popup_close_btn");
let popup_tip = document.querySelector("#popup_tip");
let popup_page = document.querySelector("#popup_page");

let invitation_link = "";
let teams_member_data = {
  tierOne: "",
  tierTwo: "",
  tierThree: "",
  tierFour: "",
  tierFive: "",
  tierSix: "",
};

let teams_commission_data = {
  tierOne: "",
  tierTwo: "",
  tierThree: "",
  tierFour: "",
  tierFive: "",
  tierSix: "",
};

window.addEventListener("load", () => {
  let scale_object = document.querySelector(".loader");
  scale_object.style.animation = "shadowPulse 2s linear infinite";
  setTimeout(() => {
    let elem = document.querySelector("#loading");
    elem.remove();
  }, 3000);
});

const teamMain = document.querySelector(".teamMain");
tiers.forEach((element, i) => {
  let memember_box = document.querySelector("#van-tab-10");
  let commission_box = document.querySelector("#van-tab-11");
  element.addEventListener("click", () => {
    if (element.id) {
      memember_box.innerHTML = "";
      commission_box.innerHTML = "";
      document.querySelector("#members_data_title").innerText = `Level ${
        i + 1
      } Team`;
      memember_box.insertAdjacentHTML(
        "beforeend",
        teams_member_data[element.id]
      );
      commission_box.insertAdjacentHTML(
        "beforeend",
        teams_commission_data[element.id]
      );
      teamMain.style.zIndex = "-1";
      teamPopup.style.zIndex = "1";
    }
  });
});

const tierBack = document.querySelector(".van-nav-bar__left");
tierBack.addEventListener("click", () => {
  teamMain.style.zIndex = "1";
  teamPopup.style.zIndex = "-1";
});

const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const twoP = document.querySelector(".ii");
const threeP = document.querySelector(".iii");
const secondOuter = document.querySelector(".secondOuter");
const members = document.querySelector("#van-tab-10");
const commissions = document.querySelector("#van-tab-11");

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

function create_members(data) {
  let empty_img = document.querySelector(".boxcommissions");

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
  let total_withdrawal = 0;

  for (let item of data["direct_members"]) {
    // creating the childs to append inside the boxes;
    level1_user_RebadeBonus += parseFloat(item.RebadeBonus.toFixed(2));
    user_profit += parseFloat(item.profit.toFixed(2));
    user_amount += parseFloat(item.deposit.toFixed(2));
    total_withdrawal += Number(item?.withdrawalAmmount?.toFixed(2));
    teams_member_data["tierOne"] += `<div class="members_data"><p>${
      item.phone
    }</p><p>${item.profit.toFixed(2)}</p></div>`;
    teams_commission_data["tierOne"] += `<div class="members_data"><p>${
      item.phone
    }</p><p>${item.RebadeBonus.toFixed(2)}</p></div>`;
  }

  if (typeof data["level2_user"] !== "undefined") {
    for (let i = 0; i < data["level2_user"].length; i++) {
      if (data["level2_user"][i].length < 1) {
        console.log("not found");
        continue;
      }
      for (let j = 0; j < data["level2_user"][i].length; j++) {
        level2_user_length++;
        level2_user_RebadeBonus += parseFloat(
          data["level2_user"][i][j]["RebadeBonus"].toFixed(2)
        );
        user_profit =
          parseFloat(user_profit) +
          parseFloat(data["level2_user"][i][j]["profit"]);
        user_amount =
          parseFloat(user_amount) +
          parseFloat(data["level2_user"][i][j]["deposit"]);
        total_withdrawal += parseFloat(
          data["level2_user"][i][j]["withdrawalAmmount"]
        );
        // creating the childs to append inside the boxes;

        teams_member_data["tierTwo"] += `<div class="members_data"><p>${
          data["level2_user"][i][j]["phone"]
        }</p><p>${data["level2_user"][i][j]["profit"].toFixed(2)}</p></div>`;

        teams_commission_data["tierTwo"] += `<div class="members_data"><p>${
          data["level2_user"][i][j]["phone"]
        }</p><p>${data["level2_user"][i][j]["RebadeBonus"].toFixed(
          2
        )}</p></div>`;
      }
    }
  }

  if (typeof data["level3_user"] !== "undefined") {
    for (let i = 0; i < data["level3_user"].length; i++) {
      if (data["level3_user"][i].length < 1) {
        continue;
      }
      for (let j = 0; j < data["level3_user"][i].length; j++) {
        level3_user_length++;
        level3_user_RebadeBonus += parseFloat(
          data["level3_user"][i][j]["RebadeBonus"].toFixed(2)
        );
        user_profit =
          parseFloat(user_profit) +
          parseFloat(data["level3_user"][i][j]["profit"]);
        user_amount =
          parseFloat(user_amount) +
          parseFloat(data["level3_user"][i][j]["deposit"]);

        total_withdrawal += parseFloat(
          data["level3_user"][i][j]["withdrawalAmmount"]
        );
        // creating the childs to append inside the boxes;
        teams_member_data["tierThree"] += `<div class="members_data"><p>${
          data["level3_user"][i][j]["phone"]
        }</p><p>${data["level3_user"][i][j]["profit"].toFixed(2)}</p></div>`;

        teams_commission_data["tierThree"] += `<div class="members_data"><p>${
          data["level3_user"][i][j]["phone"]
        }</p><p>${data["level3_user"][i][j]["RebadeBonus"].toFixed(
          2
        )}</p></div>`;
      }
    }
  }

  if (typeof data["level4_user"] !== "undefined") {
    for (let i = 0; i < data["level4_user"].length; i++) {
      if (data["level4_user"][i].length < 1) {
        continue;
      }
      for (let j = 0; j < data["level4_user"][i].length; j++) {
        level4_user_length++;
        level4_user_RebadeBonus += parseFloat(
          data["level4_user"][i][j]["RebadeBonus"].toFixed(2)
        );
        user_profit =
          parseFloat(user_profit) +
          parseFloat(data["level4_user"][i][j]["profit"]);
        user_amount =
          parseFloat(user_amount) +
          parseFloat(data["level4_user"][i][j]["deposit"]);

        total_withdrawal += parseFloat(
          data["level4_user"][i][j]["withdrawalAmmount"]
        );
        // creating the childs to append inside the boxes;
        teams_member_data["tierFour"] += ` <div class="members_data"><p>${
          data["level4_user"][i][j]["phone"]
        }</p><p>${data["level4_user"][i][j]["profit"].toFixed(2)}</p></div>`;

        teams_commission_data["tierFour"] += ` <div class="members_data"><p>${
          data["level4_user"][i][j]["phone"]
        }</p><p>${data["level4_user"][i][j]["RebadeBonus"].toFixed(
          2
        )}</p></div>`;
      }
    }
  }

  if (typeof data["level5_user"] !== "undefined") {
    for (let i = 0; i < data["level5_user"].length; i++) {
      if (data["level5_user"][i].length < 1) {
        continue;
      }
      for (let j = 0; j < data["level5_user"][i].length; j++) {
        level5_user_length++;
        level5_user_RebadeBonus += parseFloat(
          data["level5_user"][i][j]["RebadeBonus"].toFixed(2)
        );
        user_profit =
          parseFloat(user_profit) +
          parseFloat(data["level5_user"][i][j]["profit"]);
        user_amount =
          parseFloat(user_amount) +
          parseFloat(data["level5_user"][i][j]["deposit"]);

        // creating the childs to append inside the boxes;

        total_withdrawal += parseFloat(
          data["level5_user"][i][j]["withdrawalAmmount"]
        );
        teams_member_data["tierFive"] += ` <div class="members_data"><p>${
          data["level5_user"][i][j]["phone"]
        }</p><p>${data["level5_user"][i][j]["profit"].toFixed(2)}</p></div>`;

        teams_commission_data["tierFive"] += ` <div class="members_data"><p>${
          data["level5_user"][i][j]["phone"]
        }</p><p>${data["level5_user"][i][j]["RebadeBonus"].toFixed(
          2
        )}</p></div>`;
      }
    }
  }

  if (typeof data["level6_user"] !== "undefined") {
    for (let i = 0; i < data["level6_user"].length; i++) {
      if (data["level6_user"][i].length < 1) {
        continue;
      }
      for (let j = 0; j < data["level6_user"][i].length; j++) {
        level6_user_length++;
        level6_user_RebadeBonus += parseFloat(
          data["level6_user"][i][j]["RebadeBonus"].toFixed(2)
        );
        user_profit =
          parseFloat(user_profit) +
          parseFloat(data["level6_user"][i][j]["profit"]);
        user_amount =
          parseFloat(user_amount) +
          parseFloat(data["level6_user"][i][j]["deposit"]);

        total_withdrawal += parseFloat(
          data["level6_user"][i][j]["withdrawalAmmount"]
        );
        // creating the childs to append inside the boxes;

        teams_member_data["tierSix"] += ` <div class="members_data"><p>${
          data["level6_user"][i][j]["phone"]
        }</p><p>${data["level6_user"][i][j]["profit"].toFixed(2)}</p></div>`;

        teams_commission_data["tierSix"] += ` <div class="members_data"><p>${
          data["level6_user"][i][j]["phone"]
        }</p><p>${data["level6_user"][i][j]["RebadeBonus"].toFixed(
          2
        )}</p></div>`;
      }
    }
  }

  let total_rebade = (
    parseFloat(level1_user_RebadeBonus) +
    parseFloat(level2_user_RebadeBonus) +
    parseFloat(level3_user_RebadeBonus) +
    parseFloat(level4_user_RebadeBonus) +
    parseFloat(level5_user_RebadeBonus) +
    parseFloat(level6_user_RebadeBonus)
  ).toFixed(2);

  let total_members =
    parseInt(data["direct_members"].length) +
    parseInt(level2_user_length) +
    parseInt(level3_user_length) +
    parseInt(level4_user_length) +
    parseInt(level5_user_length) +
    parseInt(level6_user_length);

  // document.querySelector("#level1_rebate").innerText = level1_user_RebadeBonus;
  // document.querySelector("#level2_rebate").innerText = level2_user_RebadeBonus;
  // document.querySelector("#level3_rebate").innerText = level3_user_RebadeBonus;
  // document.querySelector("#level4_rebate").innerText = level4_user_RebadeBonus;
  // document.querySelector("#level5_rebate").innerText = level5_user_RebadeBonus;
  // document.querySelector("#level6_rebate").innerText = level6_user_RebadeBonus;

  document.querySelector("#level1_member").innerText = parseInt(
    data["direct_members"].length
  );
  document.querySelector("#level2_member").innerText = level2_user_length;
  document.querySelector("#level3_member").innerText = level3_user_length;
  document.querySelector("#level4_member").innerText = level4_user_length;
  document.querySelector("#level5_member").innerText = level5_user_length;
  document.querySelector("#level6_member").innerText = level6_user_length;
  document.querySelector("#total_team_withdrawal").innerText = total_withdrawal;

  document.querySelectorAll(".s_members").forEach((item, i) => {
    item.innerText = total_members;
  });
  document.querySelector("#total_rebate").innerText = parseFloat(
    data["rebade"]["RebadeBonus"]
  ).toFixed(2);
  document.querySelector("#s_tot_profit").innerText = parseFloat(
    user_profit.toFixed(2)
  );
  document.querySelector("#s_tot_deposit").innerText = parseFloat(
    user_amount.toFixed(2)
  );

  return;
}

document.querySelector("#invite_btn").addEventListener("click", () => {
  copyPageUrl(invitation_link);
});

async function get_all_members() {
  let config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  let response = await fetch("/get_all_members", config);
  response = await response.json();

  if (response["status"] == 1) {
    invitation_link = window.location.origin + "/signup/?id=" + response["inv"];
    create_members(response);
  } else if (response["status"] == 0) {
    window.location.href = window.location.origin + "/login";
  }
}

get_all_members();

document.querySelector("#popup_close_btn").addEventListener("click", () => {
  document.querySelector("#popup_page").style.left = "-100vw";
  popup_tip.innerText = "Loading...";
});

const { clipboard } = window.WTN;

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

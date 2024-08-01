document.querySelector("#submit").addEventListener("click", async (e) => {
  e.preventDefault();
  const post_data = {};
  post_data.client_txn_id = String(
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  ); // you can use this field to store order id;
  post_data.amount = document.getElementById("txnAmount").value;
  post_data.p_info = "product_name";
  post_data.customer_name = document.getElementById("customerName").value;
  post_data.customer_email = document.getElementById("customerEmail").value;
  post_data.customer_mobile = document.getElementById("customerMobile").value;
  post_data.redirect_url = "http://www.manchester-football.com/redirect";
  post_data.udf1 = "extradata";
  post_data.udf2 = "extradata";
  post_data.udf3 = "extradata";

  alert(post_data.redirect_url);

  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post_data),
  };
  try {
    let res = await fetch("/start_payment", config);
    const text = await res.text();
    const data = JSON.parse(text);
    if (data.status === "ok") {
      window.location.href = res.url;
    } else {
      alert("something wrong");
    }
  } catch (err) {
    window.location.href = window.location.origin + "/login";
  }
});

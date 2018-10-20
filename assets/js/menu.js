
if (window.localStorage.getItem('message')) {
  meso = window.localStorage.getItem('message');
  elem = document.getElementById('login-dialogbox');
  elem.innerHTML = `${meso}`;
  window.localStorage.removeItem('message');
  setTimeout(() => {
    elem.style.display = "None";
  }, 2000);
}



fetch('http://127.0.0.1:5000/api/v2/menu', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
  }
})
  .then(res => res.json())
  .then(data => {
    let output = '';

    data['food_items'].forEach(item => {
      output += `
        <div class="column styled-item">
            <p>
                <img src="${images[item.img] || images["default"]}" alt="image">
            </p>
            <button class="price">${item["price"]}</button>
            <p>
                ${item["name"]}
            </p>
            <p>
            ${item["description"]}
            </p>
            <button id="orderMeal" class="OrderNow"  onclick="createOrder('${item["name"]}')">Order Now</button>
        </div>`
    })

    document.getElementById("row").innerHTML = output;

  })
  .catch(function(error){
    console.log(error);
  })



function createOrder(name) {
    if (window.localStorage.username === "Useradmin") {
    alert("Admin cannot place an order")
    redirect: window.location.replace("admin/portal.html");
    
  }
  else {

    fetch('http://127.0.0.1:5000/api/v2/users/orders', {
      method: "POST",
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        "name": name
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        alert(data["message"])
        redirect: window.location.replace('index.html');
    })
    .catch(function(error){
      console.log(error);
    })
  }

}


var logout = document.getElementById('loginSignup')
logout.onclick = function () {
  if (window.localStorage.getItem('username') == null) {
    redirect: window.location.replace(".login.html");
  }
  else {
    localStorage.clear();
    redirect: window.location.replace(".index.html")
  }
}

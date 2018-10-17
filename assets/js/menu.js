window.onload = function () {

    if (window.localStorage.getItem('username') == null){
        document.getElementById('loginSignup').innerHTML = `<a href="login.html">Login </a>`;
    }
    else{
        document.getElementById('loginSignup').innerHTML = `<a href="login.html">Logout</a>`;
    }

    if (window.localStorage.getItem('message')) {
        meso = window.localStorage.getItem('message');
        elem = document.getElementById('dialogbox')
        elem.innerHTML = `${meso}`;
        window.localStorage.removeItem('message');
        setTimeout(() => {
            elem.parentNode.removeChild(elem);
        }, 2000);
    }

  fetch('https://mealani.herokuapp.com/api/v2/menu', {
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
          <div class="column">
              <p>
                  <img class="zoom" src="../assets/images/rice.jpeg" alt="">
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
}

function createOrder(name){
  console.log(name)
  fetch('https://mealani.herokuapp.com/api/v2/users/orders',{
      method:"POST",
      mode:'cors',
      headers:{
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
      }, 
      body: JSON.stringify({
          "name":name
      })
  })
  .then(res=>res.json())
  .then(data =>{
      console.log(data)
      alert(data["message"])
      redirect: window.location.replace('index.html');
  })
}


var logout =  document.getElementById('loginSignup')
logout.onclick = function(){
    if (window.localStorage.getItem('username') == null){
        redirect: window.location.replace(".login.html");
    }
    else{
        localStorage.clear();
        redirect: window.location.replace(".index.html")
    }
}

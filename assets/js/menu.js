
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
            <button id="orderMeal" class="OrderNow"  onclick="checkout('${item["name"]}', '${item["price"]}')">Add to Cart</button>
        </div>`
    })

    document.getElementById("menu-row").innerHTML = output;

  })
  .catch(function(error){
    console.log(error);
  })


let cart_items_arr = [];

function checkout(name, price) {
  if (window.localStorage.username === "Useradmin") {
    alert("Admin cannot place an order")
    redirect: window.location.replace("admin/portal.html");  
  } 
  else {
    let newItem = `<tr id="cart-item-${name}">
                    <td class="new-item">${name}</td>
                    <td>
                      <label for="quantity">Quantity</label>
                      <input value="1" type="number" id="${name}" class="item-quantity" min="1" name="price">
                    </td>
                    <td class="new-item" id="item-price-${name}">${price}</td>
                    <td id="item-total-price-${name}">${price}</td>
                    <td><a href="#" onClick="deleteOrder(this)"><i class="far fa-trash-alt"></i></a></td>
                  </tr>`
    if (cart_items_arr.includes(name) === false) {
      document.getElementById("order-table").innerHTML += newItem
    }
    cart_items_arr.push(name);
  } 
}

function total(name) {
  return function getTotal() {
    console.log('val', this.value);
    itemPrice = document.getElementById(`item-price-${name}`).innerHTML;
    console.log('iprice',itemPrice);
    document.getElementById(`item-total-price-${name}`).innerHTML = (itemPrice * this.value);
  };
}

function cart() {
  // get item quantity
  quantity_elems = document.querySelectorAll(".item-quantity")
  console.log('elems', quantity_elems);

  Array.from(quantity_elems).forEach((elem) => {
    elem.addEventListener('change', total(elem.id));
  });
};


function deleteOrder(del) {
  var p=del.parentNode.parentNode;
      p.parentNode.removeChild(p);
 }


function chickout(name) {
    if (window.localStorage.username === "Useradmin") {
    alert("Admin cannot place an order")
    redirect: window.location.replace("admin/portal.html");
    
  }
  else {
    fetch('http://127.0.0.1:5000/api/v2/users/orders', {
      method: "POST",
      // mode: 'no-cors',
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
window.onload = function () {
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signin').innerHTML = "Sign in";
    }
    else{
        // document.getElementById('username').innerHTML = "Hello " + window.localStorage.getItem('username')
        document.getElementById('signin').innerHTML = "Log out";
        
    }

    fetch('https://mealani.herokuapp.com/api/v2/menu', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(data => {
      let output = '';
      console.log(data)
  
      data['food_items'].forEach(item => {
        output += `
            <div class="column">
                <p>
                    <img class="zoom" src="../../assets/images/rice.jpeg" alt="">
                </p>
                <button class="price">${item["price"]}</button>
                <p>
                    ${item["name"]}
                </p>
                <p>
                ${item["description"]}
                </p>
                <button id="edit" class="edit"  onclick="edit('${item["id"]}')">Edit</button>
                <button id="delete" class="delete"  onclick="delete_order('${item["id"]}')">Delete</button>
            </div>`
      })
  
      document.getElementById("row").innerHTML = output;
  
    })
  }
  
  function delete_order(id){
    fetch(`https://mealani.herokuapp.com/api/v2/menu/${id}`,{
        method:"DELETE",
        mode:'cors',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        }
    })
    .then(res=>res.json())
    .then(data =>{
        alert(data["message"])
        redirect: window.location.replace('../admin/meals.html');
    })
  }

  var logout = document.getElementById('signin')
  logout.onclick = function(){
      if (window.localStorage.getItem('username') == null){
          redirect: window.location.replace("./login.html");
      }
  
      else{
          localStorage.clear();
          redirect: window.location.replace("./login.html");
      }
  }
  
  
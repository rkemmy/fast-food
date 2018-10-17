fetch('https://mealani.herokuapp.com/api/v2/users/history', {
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
      data['orders'].forEach(item => {
        output += `
            <div class="column">
                <p>
                    <img class="zoom" src="../assets/images/rice.jpeg" alt="">
                </p>
                <p>
                    ${item["name"]}
                </p>
                <p>
                ${item["description"]}
                </p>
                <button class="price">${item["price"]}</button>
            </div>`
      })
  
      document.getElementById("row").innerHTML = output;
  
    })

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
if (window.localStorage.getItem('username') !== 'Useradmin'){
  redirect: window.location.replace("../index.html");
}

var addMeal = document.getElementById('addmeal');

addMeal.onclick = function () {
  const img = document.getElementById('imageField').value;
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = Number(document.getElementById('price').value);
  

  fetch('http://127.0.0.1:5000/api/v2/menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + window.localStorage.getItem('token')
    },
    body: JSON.stringify({
      name,
      description,
      price,
      img
    })
  })
    .then(res => res.json())
    .then(data => {
      let mesg = 'Meal successfully created'      
      if (data['message'] === mesg) {
        let addEelem = document.getElementById('add-dialogbox')
        addEelem.innerHTML = mesg;
        setTimeout(() => {
          redirect: window.location.replace("meals.html");
        }, 2500);
      }
      else {
        alert('Meal has been not been created, try again')
      }

    })
    .catch(function(error){
      console.log()
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

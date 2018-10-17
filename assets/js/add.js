window.onload = function () {

  if (window.localStorage.getItem('username') !== 'Useradmin'){
      window.location = "../index.html"
  }
  if (window.localStorage.getItem('username') == null){
    document.getElementById('loginSignup').innerHTML = `<a href="../login.html">Login </a>`;
}
  else{
    document.getElementById('loginSignup').innerHTML = `<a href="../login.html">Logout</a>`;
}

  var addMeal = document.getElementById('addmeal');

  addMeal.onclick = function () {
    // const img = document.getElementById('image').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = Number(document.getElementById('price').value);
    console.log(typeof(price));

    fetch('https://mealani.herokuapp.com/api/v2/menu', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        name,
        description,
        price,
      })
    })
    // console.log(data)
      .then(res => res.json())
      .then(data => {
        if (data['message'] === 'Meal successfully created') {
          alert('Meal successfully created')
          // clear the form
          redirect: window.location.replace("meals.html");
        }
        else {
          alert('Meal has been not been created, try again')
        }

      })
      .catch(function(error){
        console.log()
      })
  };
}

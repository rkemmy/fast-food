window.onload = function () {

  if (window.localStorage.getItem('username') == 'Useradmin'){
    console.log('oyas')
      window.location = "index.html"
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
    console.log(data)
      .then(res => res.json())
      .then(data => {
        if (data['message'] === 'Meal successfully created') {
          // clear the form
          redirect: window.location.replace("../menu.html");
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

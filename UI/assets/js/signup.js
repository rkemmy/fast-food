var signup = document.getElementById('signup');

signup.onclick = function () {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;


  fetch('https://mealani.herokuapp.com/api/v2/auth/signup', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
   
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data['message'] === 'Account created successfully') {
        alert(`Welcome ${username}, you may now Login`);
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        redirect: window.location.replace('../html/login.html');
      }
      else {
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
      }
    });
}
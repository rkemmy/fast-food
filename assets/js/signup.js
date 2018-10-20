var signup = document.getElementById('signup');

signup.onclick = function () {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;


  fetch('http://127.0.0.1:5000/api/v2/auth/signup', {
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
      if (data['message'] === 'Account created successfully') {
        alert(`Welcome ${username}, you may now Login`);
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        redirect: window.location.replace('login.html');
      }

      else if(data['message'] === 'username already in use' ) {
        document.getElementById('usernamefailed').innerHTML = "username already in use";
        document.getElementById('usernamefailed').style.color = "red";
        document.getElementById('username').value = '';

      }

      else if(data['message'] === 'email already in use' ) {
        document.getElementById('emailfailed').innerHTML = "email address already in use";
        document.getElementById('emailfailed').style.color = "red";
        document.getElementById('email').value = '';

      }

      else {
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
      
      }
    })

    

    .catch(function(error){
      console.log(error);
    });
}

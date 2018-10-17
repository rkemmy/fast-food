var login = document.getElementById('login')

login.onclick = function(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch('https://mealani.herokuapp.com/api/v2/auth/login',{
        method:'POST',
        mode:'cors',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({
            "username":username,
            "password":password})
            
    })

    .then(res => res.json())
    .then(data => {
        console.log(data)
        let msg = 'You were successfully logged in ' + username;
        if (data['message'] === msg){
            document.getElementById('username').value = "";
            document.getElementById('password').value = "";``
            window.localStorage.setItem('token', data['token'])
            window.localStorage.setItem('username', username)
           

            redirect: window.location.replace("../html/index.html")
            window.localStorage.setItem('message', msg);
            elem = document.getElementById('dialogbox')
            
            if (data["admin"] === true){
                redirect: window.location.replace("admin/portal.html")
            }
            else{
                redirect: window.location.replace("index.html")
            }
        }

        else{
            document.getElementById('loginfailed').innerHTML = "Invalid email address or password";
            document.getElementById('loginfailed').style.color = "red";
        }
    })
}


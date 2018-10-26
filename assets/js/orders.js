fetch('http://127.0.0.1:5000/api/v2/users/orders', {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
  }
})
  .then(res => res.json())
  .then(data => {
    let output = ` <table id="ordertable">
    <tr>
    <th>Order-id</th>
    <th>Order-Name</th>
    <th>Username</th>
    <th>Price</th>
    <th>Status</th>
    </tr>`;
    

    data["orders"].forEach(res => {
      let order_id = res['id'];
      output += `

          <tr id="orderly">
              <td class="order_id">${res['id']}</td>
              <td>${res['name']}</td>
              <td>${res['username']}</td>
              <td>${res['price']}</td>
              <td>
                <select>
                    <option value="New" selected>New</option>
                    <option value="Processing">Processing</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                    
                </select>
              </td>
              

          </tr>`
    })

    output +=
      `</table>`

    document.getElementById("row").innerHTML = output;
    let order_id = document.getElementById("row").querySelector(".order_id").innerHTML
    status_listener(order_id)
    
  })
  .catch(function(error){
    console.log(error)
  })

function status_listener(id){
let options = document.querySelectorAll('select');
for(let option of options){
  option.addEventListener('change', function(){
    update_status(id, option.value)

  }
  )}
} 

function update_status(id, status){
    fetch(`http://127.0.0.1:5000/api/v2/users/orders/${id}`,{
        method:"PUT",
        mode:'cors',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        }, 
        body: JSON.stringify({
            "status": status
        })
    })
    .then(res=>res.json())
    .then(data =>{
      alert(`Order ${id} updated successfully. New status: ${status}`)

        
    })
    .catch(function(error){
      console.log(error)
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

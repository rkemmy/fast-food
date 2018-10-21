fetch('http://127.0.0.1:5000/api/v2/users/history', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(data => {
      let output = ` <table id="cartable">
      <tr>
      <th>Order-item</th>
      <th>Name</th>
      <th>Description</th>
      <th>Price</th>
      </tr>`;
      let total = 0;
      data['orders'].forEach(item => {
          
          total += item.price

        output += `
            <tr id="cart">
                <td class="order_id"><img src="${images[item.img] || images["default"]}" alt="image"></td>
                <td>${ellipsis(item["name"])}</td>
                <td>${ellipsis(item["description"])}</td>
                <td>${item['price']}</td>
                
            </tr>
            `
      })
   
    output += `<tr>
        <td><strong>Total All Orders</strong></td>
        <td></td>
        <td></td>
        <td><strong>${total}</strong><td>
    </tr>`
      document.getElementById("cart-items").innerHTML = output;
  
    })

    .catch(function(error){
      console.log(error);
    })

function ellipsis(string){
  if (string.length >= 10)
      return string.substring(0, 10) + '...';
  else
      return string;
};

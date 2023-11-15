const express = require("express");
const app = express();
const axios = require("axios")

function getOrders(orderCount, orderPage){
    axios.get('https://demo.flexibee.eu/c/demo/objednavka-prijata.json?limit='+orderCount, {
      })
      .then(function (response) {
        const responseData = response.data.winstrom;
        console.log(responseData)
      })
      .catch(function (error) {
        console.log(error);
      });
}

app.get("/", (req, res) => {
    getOrders(5, 1)
});


const listener = app.listen(3000, function () {
  console.log("Listening on port " + listener.address().port);
});

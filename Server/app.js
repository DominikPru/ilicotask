const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors()); 

//Gets order data from flexibee, orderCount = Ammount of orders loaded from API, orderPage = Current page
function getOrders(orderCount, orderPage, query) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(
          "https://demo.flexibee.eu/c/demo/objednavka-prijata.json?limit=" +
            orderCount +
            "&order=datVyst@D" + "&start=" + orderCount * orderPage + "&q=" + query
        )
        .then(function (response) {
          const orders = response.data.winstrom["objednavka-prijata"];
          let ordersId = orders.map((orders) => orders["id"]);
          resolve(ordersId);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    }, 1000); // 1-second delay
  });
}

function getOrderById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://demo.flexibee.eu/c/demo/objednavka-prijata/" + id + ".json",
        {}
      )
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
}

function getOrdersData(orderCount, orderPage, query) {
  let orderDataList = [];

  return new Promise((resolve, reject) => {
    getOrders(orderCount, orderPage, query)
      .then((ids) => {
        const promises = ids.map((id) => getOrderById(id));
        Promise.all(promises)
          .then((orders) => {
            orders.forEach((order) => {
              order.data.winstrom["objednavka-prijata"].forEach((orderItem) => {
                orderDataList.push(orderItem);
              });
            });
            resolve(orderDataList);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
}

app.get("/get_orders", (req, res) => {
  getOrdersData(req.query.orderCount, req.query.orderPage, req.query.search).then((data) => {
    if (data.length > 0) {
      res.send(JSON.stringify(data));
    }
    else{
      res.send("err")
    }
  }).catch((error) => {
    console.error("Error in getOrdersData:", error);
    res.status(500).send("Internal Server Error");
  });
});

const listener = app.listen(8888, function () {
  console.log("Listening on port " + listener.address().port);
});

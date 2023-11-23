const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors());

//Gets order data from flexibee, orderCount = Ammount of orders loaded from API, orderPage = Current page
function getOrders(orderCount, orderPage, query) {
  return new Promise((resolve, reject) => {
    if (isNumber(orderCount) && isNumber(orderPage)) {
      axios
        .post(
          "https://demo.flexibee.eu/c/demo/objednavka-prijata/query.json?limit=" +
            orderCount +
            "&order=datVyst@D" +
            "&start=" +
            orderCount * orderPage +
            "&relations=polozky",
          {
            winstrom: {
              detail: "full",
              filter:
              "(kod like similar '" +
              query +
              "' or kontaktJmeno like similar '" +
              query +
              "' or mesto like similar '" +
              query +
              "' or ulice like similar '" +
              query +
              "' or psc like similar '" +
              query +
              "' or ic like similar '" +
              query +
              "' or dic like similar '" +
              query +
              "' or doprava like similar '" +
              query +
              "' or sumCelkem like similar '" +
              query +
              "' or stavUzivK like similar '" +
              query +
              "')",
            },
          }
        )
        .then(function (response) {
          resolve(response.data.winstrom["objednavka-prijata"]);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    } else {
      reject("Count or Page cannot be a string");
    }
  });
}

function getProducts(orderPage, query) {
  return new Promise((resolve, reject) => {
    if (isNumber(orderPage)) {
      axios
        .get(
          "https://demo.flexibee.eu/c/demo/objednavka-prijata-polozka/(nazev like '" +
            query +
            "').json?limit=" +
            5 +
            "&start=" +
            5 * orderPage +
            "&detail=full&relations=objednavky"
        )
        .then(function (response) {
          resolve(response.data.winstrom["objednavka-prijata-polozka"]);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    } else {
      reject("Count or Page cannot be a string");
    }
  });
}

function getOrdersByIds(ids) {
  return new Promise((resolve, reject) => {
    if (ids.length > 0) {
      axios
        .get(
          "https://demo.flexibee.eu/c/demo/objednavka-prijata/(kod in (" +
            ids +
            ")).json?order=datVyst@D&detail=full&relations=polozky"
        )
        .then(function (response) {
          resolve(response.data.winstrom["objednavka-prijata"]);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    } else {
      resolve([]);
    }
  });
}

function isNumber(value) {
  return typeof value === "string" && /^[0-9]+$/.test(value);
}

app.get("/get_products", (req, res) => {
  getProducts(req.query.orderPage, req.query.search)
    .then((data) => {
      let noDupes = [...new Set(data.map((item) => item["doklObch@showAs"]))];
      const formattedString = noDupes.map((value) => `"${value}"`).join(", ");
      getOrdersByIds(formattedString.replaceAll("/", "%2F")).then((data) => {
        if (data.length > 0) {
          res.send(JSON.stringify(data));
        } else {
          res.send("err");
        }
      });
    })
    .catch((error) => {
      console.error("Error in getOrdersData:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/get_orders", (req, res) => {
  getOrders(req.query.orderCount, req.query.orderPage, req.query.search)
    .then((data) => {
      if (data.length > 0) {
        res.send(JSON.stringify(data));
      } else {
        res.send("err");
      }
    })
    .catch((error) => {
      console.error("Error in getOrdersData:", error);
      res.status(500).send("Internal Server Error");
    });
});

const listener = app.listen(8888, function () {
  console.log("Listening on port " + listener.address().port);
});

import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [response, setResponse] = useState([]);

useEffect(() => {
  axios.get("http://localhost:8888/get_orders", {
    params: {
      orderPage: 1,
      orderCount: 10
    }
  }).then((response) => {
    setResponse(response.data);
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
  });
}, [])


  return (
    <div className="App">
      {response && response.length > 0 ? (response.map((res, index) => (
        <h1 key={index}>{res.kod}</h1>
      ))):("Loading...")}
    </div>
  );
}

export default App;

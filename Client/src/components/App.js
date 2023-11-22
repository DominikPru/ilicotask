import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table";
import axios from "axios";

function App() {
  const [response, setResponse] = useState();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [runEffect, setRunEffect] = useState(true);
  const [productSearch, setProductSearch] = useState(false);
  function handleChangeSearch(event) {
    setRunEffect(true);
    setSearch(event.target.value);
  }
  function handleSwitchProducts(event) {
    setRunEffect(true);
    setProductSearch(!productSearch);
  }
  useEffect(() => {
    if (runEffect) {
      if (productSearch){
      axios
        .get("http://localhost:8888/get_products", {
          params: {
            orderPage: page,
            orderCount: 5,
            search: search,
          },
        })
        .then((res) => {
          if (res.data == "err") {
            setPage(page - 1);
            setRunEffect(false);
          } else {
            setResponse(res.data);
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
        else{
        axios
        .get("http://localhost:8888/get_orders", {
          params: {
            orderPage: page,
            orderCount: 5,
            search: search,
          },
        })
        .then((res) => {
          if (res.data == "err") {
            setPage(page - 1);
            setRunEffect(false);
          } else {
            setResponse(res.data);
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  }, [runEffect, page, search]);

  useEffect(() => {
    setPage(0);
  }, [search]);

  function changePage(next) {
    setRunEffect(true);
    if (next) {
      setPage(page + 1);
    } else {
      const newPage = page > 0 ? page - 1 : page;
      setPage(newPage);
    }
  }

  function handleSwitchProducts(){
    setProductSearch(!productSearch)
  }

  return (
    <div className="App">
      <Table
        data={response}
        changePage={changePage}
        page={page}
        handleSearch={handleChangeSearch}
        handleSwitch={handleSwitchProducts}
      />
    </div>
  );
}

export default App;

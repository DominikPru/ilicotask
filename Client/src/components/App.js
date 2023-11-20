import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table"
import axios from "axios";

function App() {
  const [response, setResponse] = useState();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [runEffect, setRunEffect] = useState(true);
  function handleChangeSearch(event) {
    setSearch(event.target.value);
    console.log(search)
  }

useEffect(() => {
  if (runEffect){
  axios.get("http://localhost:8888/get_orders", {
    params: {
      orderPage: page,
      orderCount: 5,
      search: search
    }
  }).then((response) => {
    if (response.data == "err")
    {
      setPage(page - 1)
      setRunEffect(false)
    }
    else{
      setResponse(response.data);
    }
 
  }).catch((error) => {
    console.log(error);
  });
  }
}, [page, search])

useEffect(() => {
setPage(0)
}, [search])

function changePage(next){
  setRunEffect(true)
  if (next) {
    setPage(page + 1)
  }

else {
  const newPage = page > 0 ? page - 1 : page;
  setPage(newPage);
}
}

  return (
    <div className="App">
      <Table data={response} changePage={changePage} page={page} handleSearch={handleChangeSearch}/>
    </div>
  );
}

export default App;

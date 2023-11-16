import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table"
import axios from "axios";

function App() {
  const [response, setResponse] = useState();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  function handleChangeSearch(event) {
    setSearch(event.target.value);
    console.log(search)
  }

useEffect(() => {
  axios.get("http://localhost:8888/get_orders", {
    params: {
      orderPage: page,
      orderCount: 5,
      search: search
    }
  }).then((response) => {
    setResponse(response.data);
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
  });
}, [page, search])

function changePage(next){
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

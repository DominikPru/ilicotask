import { useState } from "react";
import React from "react";
import "./Table.css";

export default function Table({
  data,
  changePage,
  page,
  handleSearch,
  handleSwitch,
}) {
  const [isToggled, setIsToggled] = useState(false);
  console.log("Relodaign")
  return (
    <div className="main">
      <div className="container">
        <div className="main-sub row align-items-center pt-5">
          <div className="jc">
            <input
              className="search-input"
              placeholder="Hledat"
              onChange={(e) => handleSearch(e)}
            ></input>
            <button
              style={{ backgroundColor: isToggled ? "green" : "red" }}
              onClick={(e) => {
                handleSwitch(e);
                setIsToggled(!isToggled);
              }}
            >
              Hledat Nad Položkami
            </button>
          </div>
        </div>
        <div className="table-container mt-5">
          <div className="mb-2">
            <h2 className="">Flexibee Orders</h2>
            <small className="text-secondary">By Dominik Průša</small>
          </div>
          <table id="mytable" className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr className="header-row">
                <th>Kód</th>
                <th>Uživatel</th>
                <th>Kontakt. Jméno</th>
                <th>Fakturační Údaje</th>
                <th>Forma Dopravy</th>
                <th>Způsob Platby</th>
                <th>Stav</th>
                <th>Položky</th>
                <th>Cena</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data && data.length > 0 ? (
                data?.map((r, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="">
                          <p className="fw-bold mb-1">{r.kod}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{r["uzivatel@showAs"]}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{r.kontaktJmeno}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1 fs-small">
                        {r["stat@showAs"]}
                        <br />
                        {r.mesto + " " + r.psc}
                        <br />
                        {r.ulice}
                        <br />
                        {r.ic + " " + r.dic}
                      </p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{r.doprava}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">
                        {r["formaUhradyCis@showAs"]}
                      </p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{r["stavUzivK@showAs"]}</p>
                    </td>
                    <td>
                      {r.polozkyObchDokladu?.map((i, index2) => (
                        <p key={index2} className="fw-normal mb-1 fs-small">
                          {i.nazev} {i.sumCelkem}Kč <br />
                        </p>
                      ))}
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{r.sumCelkem}</p>
                    </td>
                    <td
                      onClick={() =>
                        window.open(
                          "https://demo.flexibee.eu/c/demo/objednavka-prijata/" +
                            r.id +
                            ".pdf",
                          "_blank"
                        )
                      }
                    >
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded text-primary"
                      >
                        <i className="me-1 action-icon bi bi-file-earmark-richtext text-primary"></i>
                        Faktura
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">Error: No data available</td>
                </tr>
              )}
            </tbody>
          </table>

          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => changePage(false)}
                >
                  &lt;
                </a>
              </li>
              <li className="page-item">
                <span>{page + 1}</span>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => changePage(true)}
                >
                  &gt;
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

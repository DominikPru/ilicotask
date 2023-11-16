import React from 'react'
import "./Table.css"

export default function Table({ data, changePage, page, handleSearch }) {
let res = data;
  return (
    <div className="main">
    
    <div className="container">
      
      <div className="main-sub row align-items-center pt-5">
        <div className='jc'>
      <input className='search-input' placeholder='Hledat' onChange={(e) => handleSearch(e)}></input>
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
                <th>Způsop Platby</th>
                <th>Stav</th>
                <th>Položky</th>
                <th>Cena</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {res.map((r, index) => (
                <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="">
                      <p className="fw-bold mb-1">{res[index].kod}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{res[index]['uzivatel@showAs']}</p>
                </td>
                <td>
                <p className="fw-normal mb-1">{res[index].kontaktJmeno}</p>
                </td>
                <td>
                <p className="fw-normal mb-1 fs-small">{res[index]['stat@showAs']}<br/>{res[index].mesto + " " + res[index].psc}<br/>{res[index].ulice}<br/>{res[0].ic + " " + res[0].dic}</p>
                </td>
                <td><p className="fw-normal mb-1">{res[index].doprava}</p></td>
                <td>
                <p className="fw-normal mb-1">{res[index]['formaUhradyCis@showAs']}</p>
                </td>
                <td>
                <p className="fw-normal mb-1">{res[index]['stavUzivK@showAs']}</p>
                </td>
                <td>
                {res[index].polozkyObchDokladu?.map((i, index2) => (
                    <p key={index2} className="fw-normal mb-1 fs-small">
                      {res[index].polozkyObchDokladu[index2].nazev} {res[index].polozkyObchDokladu[index2].sumCelkem}Kč <br />
                    </p>
                ))}
                </td>
                <td>
                <p className="fw-normal mb-1">{res[index].sumCelkem}</p>
                </td>
                <td  onClick={()=> window.open("https://demo.flexibee.eu/c/demo/objednavka-prijata/" + res[index].id + ".pdf", "_blank")} >
                  <button
                    type="button"
                    className="btn btn-link btn-sm btn-rounded text-primary"
                  >
                    <i
                      className="me-1 action-icon bi bi-file-earmark-richtext text-primary"
                     
                    ></i>
                    Faktura
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>

          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#" onClick={() => changePage(false)}>&lt;</a>
              </li>
              <li className="page-item">
                 <span>{page + 1}</span> 
              </li>
              <li className="page-item">
                <a className="page-link" href="#" onClick={() => changePage(true)}>&gt;</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

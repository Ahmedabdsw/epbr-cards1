//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

const SHEET_URL =  "https://docs.google.com/spreadsheets/d/12wKiLPYVYit9S7IQGPsaAK6kWvup_VmwlfeYKIQ6MdQ/gviz/tq?tqx=out:json&sheet=Réponses au formulaire 1";

function App() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((text) => {
        const json = JSON.parse(text.substring(47).slice(0, -2)); // this trims Google's wrapper
        const cols = json.table.cols.map((col) => col.label);
        const rows = json.table.rows.map((row) =>
          row.c.map((cell) => (cell ? cell.v : ""))
        );
        setHeaders(cols);
        setData(rows);
         console.log(" *********** log ********");
console.log(rows);
      })
      .catch((err) => console.error("Failed to load or parse data:", err));
  }, []);

  const filteredData = data.filter((row) =>
    row.some((cell) =>
      cell.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Google Sheet Search</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default App;

import axios from "axios";
import React, { useEffect, useState } from "react";

function Crud() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [sortBox, setSortBox] = useState(false);
  const [asc, setAsc] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await axios.get(
        `http://api.countrylayer.com/v2/all?access_key=ef414b206d85663b55c162855f8216e1`
      );
      setValue(res.data);
      setLoading(false);
    };
    loadData();
  }, []);
  return (
    <div>
      <h2>Country Details Fetch Using Axios</h2>
      <div className="sortBox">
        <button onClick={() => setSortBox(!sortBox)} className="sort-button">
          Sort By
        </button>
        {sortBox ? (
          <div>
            <button onClick={() => setAsc(!asc)}>
              {asc ? "Descending By Country Name" : "Ascending By Country Name"}
            </button>
            <br />
          </div>
        ) : null}
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Country</th>
                <th>Capital</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <h1>Loading...</h1>
              ) : asc ? (
                value
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((i, j) => (
                    <tr key={j}>
                      <td>{j + 1}</td>
                      <td>{i.name}</td>
                      <td>{i.capital ? i.capital : "Not Mentioned"}</td>
                      <td>{i.region}</td>
                    </tr>
                  ))
              ) : (
                value
                  .sort((a, b) => (a.name < b.name ? 1 : -1))
                  .map((i, j) => (
                    <tr key={j}>
                      <td>{j + 1}</td>
                      <td>{i.name}</td>
                      <td>{i.capital ? i.capital : "Not Mentioned"}</td>
                      <td>{i.region}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
//
export default Crud;

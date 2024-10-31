import { useEffect, useState } from "react";

function AutomobileList() {
  const [automobile, setAutomobile] = useState([]);

  async function fetchData() {
    const response = await fetch("http://localhost:8100/api/automobiles/");
    if (response.ok) {
      const data = await response.json();
      setAutomobile(data.autos);
    } else {
      console.error(response);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const renderSoldStatus = (sold) => {
    return sold ? "Yes" : "No";
  };

  return (
    <>
      <h1>Automobiles</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {automobile?.map((automobiles) => {
            return (
              <tr key={automobiles.id}>
                <td>{automobiles.vin}</td>
                <td>{automobiles.color}</td>
                <td>{automobiles.year}</td>
                <td>{automobiles.model.name}</td>
                <td>{automobiles.model.manufacturer.name}</td>
                <td>{renderSoldStatus(automobiles.sold)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AutomobileList;

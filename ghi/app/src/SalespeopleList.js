import React, { useEffect, useState } from 'react';

const SalesPeopleList = () => {
  const [salespersons, setSalespersons] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setSalespersons(data.salespersons);
    }
  }



  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <h1>Salespeople</h1>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {salespersons.map(salesperson => (
          <tr key={salesperson.employee_id}>
            <td>{salesperson.employee_id}</td>
            <td>{salesperson.first_name}</td>
            <td>{salesperson.last_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};
export default SalesPeopleList;

import React, { useEffect, useState } from 'react';

const CustomerList = () => {
  const [customer, setCustomers] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8090/api/customers/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  }



  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <h1>Customers</h1>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {customer.map(customer => (
          <tr key={customer.phone_number}>
            <td>{customer.first_name}</td>
            <td>{customer.last_name}</td>
            <td>{customer.phone_number}</td>
            <td>{customer.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};
export default CustomerList;

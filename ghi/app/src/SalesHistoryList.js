import React, { useEffect, useState } from 'react';

const SalespersonHistoryList = () => {
  const [salespersons, setSales] = useState([]);
  const [formData, setFormData] = useState({
    salesperson: {
        employee_id_entry: ' '
    }
  });

  const fetchData = async () => {
    const url = 'http://localhost:8090/api/sales/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setSales(data.sales_list);
    }
  }

  const handleFormChange = (e) =>{
    const value = e.target.value;
    const inputName=e.target.name;
    setFormData({

        ...FormData,

        [inputName]: value
    });
  }


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <h1>Salesperson History</h1>
        <div className='mb-3'>
            <select onChange={handleFormChange} value={formData.salesperson.employee_id} required name="employee_id_entry" id="employee_id_entry" className="form-select">
                <option value="">Salesperson Name</option>
                {salespersons.map((salesperson) => {

                    return (
                        <option key={salesperson.employee_id} value={salesperson.employee_id}>{salesperson.first_name} {salesperson.last_name}</option>
                    )
                })}
            </select>
        </div>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Salesperson</th>
          <th>Customer</th>
          <th>VIN</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {salespersons.map(sale => (
          <tr key={sale.automobile.vin}>
            <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
            <td>{sale.automobile.vin}</td>
            <td>{sale.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};
export default SalespersonHistoryList;

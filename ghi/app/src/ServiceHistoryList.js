import { useEffect, useState } from "react";

function ServiceHistoryList() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearchInput] = useState([]);

  async function fetchData() {
    const response = await fetch("http://localhost:8080/api/appointments/");
    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    } else {
      console.error(response);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div>
          <h1>Service History</h1>
          <input
            placeholder="Search for VIN..."
            type="text"
            id="search"
            name="search"
            className="form-control"
          />
          <label htmlFor="search"></label>
          <button>Search</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>is VIP?</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appointments) => {
              return (
                <tr key={appointments.vin}>
                  <td>{appointments.vin}</td>
                  <td>{appointments.isVIP ? "Yes" : "No"}</td>
                  <td>{appointments.customer}</td>
                  <td>
                    {new Date(appointments.date_time).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(appointments.date_time).toLocaleTimeString()}
                  </td>
                  <td>{appointments.technician.first_name}</td>
                  <td>{appointments.reason}</td>
                  <td>{appointments.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ServiceHistoryList;

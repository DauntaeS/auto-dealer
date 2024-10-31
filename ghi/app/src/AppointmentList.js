import { useEffect, useState } from "react";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [autos, setAutos] = useState([]);

  const handleCancel = (id) => {
    fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
      method: "PUT",
    });
  };

  const handleFinish = (id) => {
    fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
      method: "PUT",
    });
  };

  async function fetchData() {
    const response = await fetch("http://localhost:8080/api/appointments/");
    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    } else {
      console.error(response);
    }
  }

  async function fetchDataInventory() {
    const response = await fetch("http://localhost:8100/api/automobiles/");
    if (response.ok) {
      const data = await response.json();
      setAutos(data.autos);
    } else {
      console.error(response);
    }
  }

  useEffect(() => {
    fetchData();
    fetchDataInventory();
  }, []);

  return (
    <>
      <h1>Service Appointments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointments) => {
            return (
              <tr key={appointments.vin}>
                <td>{appointments.vin}</td>
                <td>{appointments.isVIP ? "Yes" : "No"}</td>
                <td>{appointments.customer}</td>
                <td>{new Date(appointments.date_time).toLocaleDateString()}</td>
                <td>{new Date(appointments.date_time).toLocaleTimeString()}</td>
                <td>{appointments.technician.first_name}</td>
                <td>{appointments.reason}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleCancel(appointments.id)}
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleFinish(appointments.id)}
                  >
                    Finish
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AppointmentList;

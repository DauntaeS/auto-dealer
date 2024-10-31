import React, { useEffect, useState } from "react";

function AppointmentCreateForm() {
  const [appointments, setAppointments] = useState([]);
  const [vin, setVin] = useState("");
  const [customer, setCustomer] = useState("");
  const [date_time, setDateTime] = useState("");
  const [technician, setTechnician] = useState("");
  const [reason, setReason] = useState("");
  const [technicians, setTechnicians] = useState([]);

  const fetchData1 = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  const fetchData = async () => {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    }
  };

  useEffect(() => {
    fetchData();
    fetchData1();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.vin = vin;
    data.customer = customer;
    data.date_time = date_time;
    data.technician = technician;
    data.reason = reason;

    const appointmentUrl = "http://localhost:8080/api/appointments/";
    const fetchOptions = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const appointmentResponse = await fetch(appointmentUrl, fetchOptions);
    if (appointmentResponse.ok) {
      setDateTime("");
      setReason("");
      setVin("");
      setCustomer("");
      setTechnician("");
    }
    event.target.reset();
  };

  const handleChangeVin = (event) => {
    const value = event.target.value;
    setVin(value);
  };

  const handleChangeCustomer = (event) => {
    const value = event.target.value;
    setCustomer(value);
  };

  const handleChangeDateTime = (event) => {
    const value = event.target.value;
    setDateTime(value);
  };

  const handleChangeTechnician = (event) => {
    const value = event.target.value;
    setTechnician(value);
  };

  const handleChangeReason = (event) => {
    const value = event.target.value;
    setReason(value);
  };

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit} id="create-appointment-form">
                <h1 className="card-title">create a service appointment</h1>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        onChange={handleChangeVin}
                        required
                        placeholder=""
                        type="text"
                        id="vin"
                        name="vin"
                        className="form-control"
                      />
                      <label htmlFor="vin">Automobile VIN</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        onChange={handleChangeCustomer}
                        required
                        placeholder=""
                        type="text"
                        id="customer"
                        name="customer"
                        className="form-control"
                      />
                      <label htmlFor="customer">Customer</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        onChange={handleChangeDateTime}
                        required
                        placeholder=""
                        type="datetime-local"
                        id="date_time"
                        name="date_time"
                        className="form-control"
                      />
                      <label htmlFor="date_time">Date & Time</label>
                    </div>
                    <div className="mb-3">
                      <select
                        onChange={handleChangeTechnician}
                        name="technician"
                        id="techician"
                        required
                        className="form-control"
                      >
                        <option value="">Choose a Technician...</option>
                        {technicians.map((technicians) => {
                          return (
                            <option
                              key={technicians.employee_id}
                              value={technicians.employee_id}
                            >
                              {technicians.first_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        onChange={handleChangeReason}
                        required
                        placeholder="input image url"
                        type="text"
                        id="reason"
                        name="reason"
                        className="form-control"
                      />
                      <label htmlFor="image">Reason</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCreateForm;

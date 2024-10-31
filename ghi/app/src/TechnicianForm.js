import React, { useEffect, useState } from "react";

function TechnicianCreateForm() {
  const [first_name, setTechnicianFirst] = useState("");
  const [last_name, setTechnicianLast] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [technicians, setTechnicians] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.first_name = first_name;
    data.last_name = last_name;
    data.employee_id = employee_id;

    const technicianUrl = "http://localhost:8080/api/technicians/";
    const fetchOptions = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const technicianResponse = await fetch(technicianUrl, fetchOptions);
    if (technicianResponse.ok) {
      setTechnicianFirst("");
      setTechnicianLast("");
      setEmployeeId("");
    }
    event.target.reset();
  };

  const handleChangeFirst = (event) => {
    const value = event.target.value;
    setTechnicianFirst(value);
  };

  const handleChangeLast = (event) => {
    const value = event.target.value;
    setTechnicianLast(value);
  };

  const handleChangeId = (event) => {
    const value = event.target.value;
    setEmployeeId(value);
  };

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit} id="create-technician-form">
                <h1 className="card-title">Add a Technician</h1>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        onChange={handleChangeFirst}
                        required
                        placeholder="First name..."
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="form-control"
                      />
                      <label htmlFor="first_name">First Name:</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        onChange={handleChangeLast}
                        required
                        placeholder="Last name..."
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="form-control"
                      />
                      <label htmlFor="last_name">Last Name:</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        onChange={handleChangeId}
                        required
                        placeholder="Employee ID..."
                        type="text"
                        id="employee_id"
                        name="employee_id"
                        className="form-control"
                      />
                      <label htmlFor="employee_id">Employee ID:</label>
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

export default TechnicianCreateForm;

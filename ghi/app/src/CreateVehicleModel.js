import React, { useEffect, useState } from "react";

function VehicleModelCreateForm() {
  const [vehicleModels, setVehicleModels] = useState([]);
  const [name, setName] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [manufacturers, setManufacturers] = useState([]);

  const fetchData1 = async () => {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };

  const fetchData = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setVehicleModels(data.vehicleModels);
    }
  };

  useEffect(() => {
    fetchData();
    fetchData1();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = name;
    data.picture_url = picture_url;
    data.manufacturer_id = manufacturer;

    const vehicleModelUrl = "http://localhost:8100/api/models/";
    const fetchOptions = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const vehicleModelResponse = await fetch(vehicleModelUrl, fetchOptions);
    if (vehicleModelResponse.ok) {
      setName("");
      setPictureUrl("");
      setManufacturer("");
    }
    event.target.reset();
  };

  const handleChangeName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleChangeUrl = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
  };

  const handleChangeManufacturer = (event) => {
    const value = event.target.value;
    setManufacturer(value);
  };

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit} id="create-appointment-form">
                <h1 className="card-title">create a vehicle model</h1>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        onChange={handleChangeName}
                        required
                        placeholder=""
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                      />
                      <label htmlFor="name">Model Name...</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        onChange={handleChangeUrl}
                        required
                        placeholder=""
                        type="text"
                        id="picture_url"
                        name="picture_url"
                        className="form-control"
                      />
                      <label htmlFor="picture_url">Picture URL</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <select
                        onChange={handleChangeManufacturer}
                        name="manufacturer"
                        id="manufacturer"
                        required
                        className="form-control"
                      >
                        <option value="">Choose a Manufacturer...</option>
                        {manufacturers.map((manufacturers) => {
                          return (
                            <option
                              key={manufacturers.id}
                              value={manufacturers.id}
                            >
                              {manufacturers.name}
                            </option>
                          );
                        })}
                      </select>
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

export default VehicleModelCreateForm;

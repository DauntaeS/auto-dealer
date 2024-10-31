import React, { useEffect, useState } from "react";

function AutomobileCreateForm() {
  const [automobiles, setAutomobiles] = useState([]);
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);

  const fetchData1 = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  };

  const fetchData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  };

  useEffect(() => {
    fetchData();
    fetchData1();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.color = color;
    data.year = year;
    data.vin = vin;
    data.model_id = model;

    const automobileUrl = "http://localhost:8100/api/automobiles/";
    const fetchOptions = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const automobileResponse = await fetch(automobileUrl, fetchOptions);
    if (automobileResponse.ok) {
      setColor("");
      setYear("");
      setVin("");
      setModel("");
    }
    event.target.reset();
  };

  const handleChangeColor = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handleChangeYear = (event) => {
    const value = event.target.value;
    setYear(value);
  };

  const handleChangeVin = (event) => {
    const value = event.target.value;
    setVin(value);
  };

  const handleChangeModel = (event) => {
    const value = event.target.value;
    setModel(value);
  };

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit} id="create-automobile-form">
                <h1 className="card-title">Add an automobile to inventory</h1>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        onChange={handleChangeColor}
                        required
                        placeholder=""
                        type="text"
                        id="color"
                        name="color"
                        className="form-control"
                      />
                      <label htmlFor="color">Color...</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        onChange={handleChangeYear}
                        required
                        placeholder=""
                        type="text"
                        id="year"
                        name="year"
                        className="form-control"
                      />
                      <label htmlFor="year">Year...</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        onChange={handleChangeVin}
                        required
                        placeholder=""
                        type="text"
                        max="17"
                        id="vin"
                        name="vin"
                        className="form-control"
                      />
                      <label htmlFor="vin">Vin...</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <select
                        onChange={handleChangeModel}
                        name="model"
                        id="model"
                        required
                        className="form-control"
                      >
                        <option value="">Choose a Model...</option>
                        {models.map((models) => {
                          return (
                            <option key={models.id} value={models.id}>
                              {models.name}
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

export default AutomobileCreateForm;

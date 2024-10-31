import React, { useEffect, useState } from 'react';

const ModelsList = () => {
  const [models, setModels] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  }



  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <h1>Models</h1>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Manufacturer</th>
          <th>Picture</th>
        </tr>
      </thead>
      <tbody>
        {models.map(model => (
          <tr key={model.href}>
            <td>{model.name}</td>
            <td>{model.manufacturer.name}</td>
            <td><img src={model.picture_url} alt="Vehicle Picture" /></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};
export default ModelsList;

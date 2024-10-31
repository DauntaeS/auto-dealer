import React, { useState } from 'react';


const CreateManufacturer = () => {
    const [formData, setFormData] = useState({
        name: ' ',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const manufacturerUrl ='http://localhost:8100/api/manufacturers/';

        const fetchConfig = {
            method: 'post',
            body:JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(manufacturerUrl, fetchConfig);

        if (response.ok) {
            setFormData({
                name: ' ',
            });
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }
return (
        <div className="row">
            <div className="offset-3 col-9">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Manufacturer</h1>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                        <label htmlFor="name">Manufacturer Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default CreateManufacturer;

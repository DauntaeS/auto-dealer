import React, { useState } from 'react';


const CreateSalesperson = () => {
    const [formData, setFormData] = useState({
        first_name: ' ',
        last_name: ' ',
        employee_id: ' ',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const salespersonUrl ='http://localhost:8090/api/salespeople/';

        const fetchConfig = {
            method: 'post',
            body:JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salespersonUrl, fetchConfig);

        if (response.ok) {
            setFormData({
                first_name: ' ',
                last_name: ' ',
                employee_id: ' ',
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
                    <h1>Add a Salesperson </h1>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.first_name} placeholder="First_Name" required type="text" name="first_name" id="first_name" className="form-control" />
                        <label htmlFor="name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.last_name} placeholder="Last_Name" required type="text" name="last_name" id="last_name" className="form-control" />
                        <label htmlFor="name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.employee_id} placeholder="Employee_id" required type="text" name="employee_id" id="employee_id" className="form-control" />
                        <label htmlFor="name">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default CreateSalesperson;

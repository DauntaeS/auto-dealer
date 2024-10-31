import React, { useState } from 'react';


const CreateCustomer = () => {
    const [formData, setFormData] = useState({
        first_name: ' ',
        last_name: ' ',
        address: ' ',
        phone_number: ' ',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const customerUrl ='http://localhost:8090/api/customers/';

        const fetchConfig = {
            method: 'post',
            body:JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(customerUrl, fetchConfig);

        if (response.ok) {
            setFormData({
                first_name: ' ',
                last_name: ' ',
                address: ' ',
                phone_number: ' ',
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
                    <h1>Add a Customer </h1>
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
                        <input onChange={handleFormChange} value={formData.address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                        <label htmlFor="name">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.phone_number} placeholder="Phone_Number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                        <label htmlFor="name">Phone Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default CreateCustomer;

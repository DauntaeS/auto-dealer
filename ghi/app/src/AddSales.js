import React, { useEffect, useState } from "react";

const SaleForm = () => {
    const [automobiles, setAutomobiles] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [salespeople, setSalespeople] = useState([]);


    const [formData, setFormData] = useState({

        vin: '',

        address_entry: '',


        employee_id_entry: '',


        price: ''

    });

    const getDataAutomobile = async() => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        };
    };

    const getDataCustomer = async() => {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        };
    };

    const getDataSalespeople = async() => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespersons);
        };
    };

    useEffect(() => {
        getDataAutomobile();
        getDataCustomer();
        getDataSalespeople();
    },[]);

    const handleSubmit = async(event) =>{
        event.preventDefault();

        const saleUrl='http://localhost:8090/api/sales/'
        const automobileUrl=`http://localhost:8100/api/automobiles/${formData.vin}/`

        const fetchConfig = {
            method:"post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const fetchConfigPut = {
            method: 'put',
            body: JSON.stringify({ sold: true }),
            headers: {
              'Content-Type': 'application/json',
            },
          };



    const response = await fetch(saleUrl, fetchConfig);
    const responsePut = await fetch(automobileUrl, fetchConfigPut);


    if (response.ok && responsePut.ok){
        setFormData({

            vin: '',


            address_entry: '',


            employee_id_entry: '',


            price: ''
        });
    };


    };



    const handleFormChange = (e) =>{
        const value = e.target.value;
        const inputName=e.target.name;

        setFormData({

            ...formData,


            [inputName]: value
        }

        );
    }



    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a sale</h1>
                    <div className="mb-3">
                        <select onChange={handleFormChange} value={formData.vin} required name="vin" id="vin" className="form-select">
                        <option value="">Select Automobile VIN</option>
                        {automobiles.map((automobile) => {

                            return (
                                <option key={automobile.vin} value={automobile.vin}>{automobile.vin}</option>
                            )
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleFormChange} value={formData.address_entry} required name="address_entry" id="address_entry" className="form-select">
                        <option value="">Select Customer Address</option>
                        {customers.map((customer) => {

                            return (
                                <option key={customer.address} value={customer.address}>{customer.first_name} {customer.last_name}</option>

                            )

                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleFormChange} value={formData.employee_id_entry} required name="employee_id_entry" id="employee_id_entry" className="form-select">
                        <option value="">Select Employee ID</option>
                        {salespeople.map((salesperson) => {

                            return (
                                <option key={salesperson.employee_id_entry} value={salesperson.employee_id_entry}>{salesperson.first_name} {salesperson.last_name}</option>

                            )

                            })}
                        </select>
                    </div>
                    <form onSubmit={handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.price} placeholder="price" required type="number" name="price" id="price" className="form-control" />
                        <label htmlFor="color">Price of Car</label>
                    </div>

                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>


    );

}

export default SaleForm;

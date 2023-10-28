import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
    const { id } = useParams();
    const [values, setValues] = useState({
        id: '',
        customer_name: '',
        customer_email: '',
        product: '',
        quantity: 0
    });

    useEffect(() => {
        axios.get('http://localhost:3000/users/' + id)
            .then((res) => {
                setValues(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        if (!isValidInput(values)) {
            alert('Please fill in the form correctly.');
            return;
        }

        axios.put('http://localhost:3000/users/' + id, values)
            .then((res) => {
                navigate('/');
            })
            .catch((err) => console.log(err));
    }

    const isValidInput = (values) => {
        // Basic validation for email and quantity
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (
            !values.customer_name ||
            !values.customer_email.match(emailRegex) ||
            !values.product ||
            values.quantity <= 0
        ) {
            return false;
        }
        return true;
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="id">Order ID:</label>
                        <input
                            type="text"
                            name='id'
                            className='form-control'
                            placeholder='Order ID'
                            value={values.id}
                            onChange={(e) => setValues({ ...values, id: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="customer_name">Customer Name:</label>
                        <input
                            type="text"
                            name='customer_name'
                            className='form-control'
                            placeholder='Enter Name'
                            value={values.customer_name}
                            onChange={(e) => setValues({ ...values, customer_name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="customer_email">Customer Email:</label>
                        <input
                            type="email"
                            name='customer_email'
                            className='form-control'
                            placeholder='Enter Email'
                            value={values.customer_email}
                            onChange={(e) => setValues({ ...values, customer_email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="product">Product:</label>
                        <select
                            name='product'
                            className='form-control'
                            value={values.product}
                            onChange={(e) => setValues({ ...values, product: e.target.value })}
                        >
                            <option value="Product 1">Product 1</option>
                            <option value="Product 2">Product 2</option>
                            <option value="Product 3">Product 3</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            name='quantity'
                            className='form-control'
                            placeholder='Quantity'
                            value={values.quantity}
                            onChange={(e) => setValues({ ...values, quantity: parseInt(e.target.value) })}
                        />
                    </div>
                    <br />
                    <button className='btn btn-info'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default Update;

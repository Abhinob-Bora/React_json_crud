import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Create() {
  const [inputData, setInputData] = useState({
    id: '', // Order ID
    customer_name: '',
    customer_email: '',
    product: '',
    quantity: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValidInput(inputData)) {
      axios.post('http://localhost:3000/users', inputData)
        .then((res) => {
          alert('Data Posted Successfully!');
          navigate('/');
        })
        .catch((err) => console.log(err));
    } else {
      alert('Please fill in the form correctly.');
    }
  };

  const isValidInput = (data) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (
      !data.id || // Order ID should not be empty
      !data.customer_name || // Customer Name should not be empty
      !data.customer_email.match(emailRegex) || // Valid email format
      !['Product 1', 'Product 2', 'Product 3'].includes(data.product) || // Product should be one of the specified options
      data.quantity <= 0 // Quantity should be greater than 0
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
            <label htmlFor='id'>Order ID:</label>
            <input
              type='text'
              name='id'
              className='form-control'
              onChange={(e) => setInputData({ ...inputData, id: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='customer_name'>Customer Name:</label>
            <input
              type='text'
              name='customer_name'
              className='form-control'
              onChange={(e) => setInputData({ ...inputData, customer_name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='customer_email'>Customer Email:</label>
            <input
              type='email'
              name='customer_email'
              className='form-control'
              onChange={(e) => setInputData({ ...inputData, customer_email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='product'>Product:</label>
            <select
              name='product'
              className='form-control'
              onChange={(e) => setInputData({ ...inputData, product: e.target.value })}
            >
              <option value=''>Select a Product</option>
              <option value='Product 1'>Product 1</option>
              <option value='Product 2'>Product 2</option>
              <option value='Product 3'>Product 3</option>
            </select>
          </div>
          <div>
            <label htmlFor='quantity'>Quantity:</label>
            <input
              type='number'
              name='quantity'
              className='form-control'
              onChange={(e) => setInputData({ ...inputData, quantity: parseInt(e.target.value) })}
            />
          </div>
          <br />
          <button className='btn btn-info'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;

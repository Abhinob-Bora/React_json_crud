import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);



  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []); // An empty dependency array ensures this effect runs once

  function handleDelete(id) {
    const confirmDelete = window.confirm("Do you want to delete this record?");
    if (confirmDelete) {
      axios.delete(`http://localhost:3000/users/${id}`)
        .then((res) => {
          alert("Record Deleted");
          window.location.reload();
        });
    }
  }


  return (
    <div className="container">
      <h2>Crud App with JSON Server</h2>
      <Link to="/create" className="btn btn-success my-3">
        Create +
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.customer_name}</td>
              <td>{d.customer_email}</td>
              <td>{d.product}</td>
              <td>{d.quantity}</td>
              <td>
                <Link
                  className="text-decoration-none btn btn-sm btn-success"
                  to={`/update/${d.id}`}
                >
                  Update
                </Link>
                <button
                  className="text-decoration-none btn btn-sm btn-danger mx-1"
                  onClick={() => handleDelete(d.id)}
                >
                  Delete
                </button>
                <Link
                  className="text-decoration-none btn btn-sm btn-primary"
                  to={`/read/${d.id}`}
                >
                  Read
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;

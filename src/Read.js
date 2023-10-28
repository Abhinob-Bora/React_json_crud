import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import './read.css'; // Import your CSS file
import axios from 'axios';

function Read() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/users/' + id)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className='read-container'>
            <div className='read-card'>
                <h3>User Detail</h3>
                <div>
                    <p>{Data.id}</p>
                    <p>{Data.customer_name}</p>
                    <p>{Data.customer_email}</p>
                    <p>{Data.product}</p>
                    <p>{Data.quantity}</p>

                    <Link to="/" className='read-back-button'>
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Read;

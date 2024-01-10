import React, { useState } from 'react';

import { Link,useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import AppNavbar from '../Navbar/navbar';
import '../login.css';

const LogIn = () => {

   ////////// home flight data pass
   
   const location = useLocation();
   const selectedDate = location.state?.selectedDate;
   console.log(selectedDate);
   
   

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [isChecked, setIsChecked] = useState(false); // New state for the checkbox
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const [selectedFlight, setSelectedFlight] = useState([]); // Updated state for selectedFlight


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      alert('Please agree to the Policy and Terms of Use.');
      return;
    }

    try {
      const response = await Axios.post('http://localhost:3001/login', {
        email: credentials.email,
        password: credentials.password,
      });

      console.log(response.data);

      if (response.data.success) {

        alert('Login successful!');

         // Check if flight data is present in location state
         if (location.state && location.state.selectedFlight) {
          // Redirect to Passenger component
          navigate('/booking', {
            state: {
              username: response.data.username,
              selectedFlight: location.state.selectedFlight,
              selectedDate:selectedDate,
            },
          });
          console.log(setSelectedFlight);
          console.log(selectedFlight);
        }
        else {
          // Redirect to userSuccess component
          navigate('/userSuccess', {
            state: {
              username: response.data.username,
            },
          });
        }

      }
      else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login. Please try again.');
    }
  };

  return (
    <div>
      <AppNavbar />
      <div className="container" style={{ marginTop: "50px" }}>
        <div className='card text-black m-5' style={{ borderRadius: '25px' }}>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center '>

                <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4 ">LogIn</p>

                <form onSubmit={handleLogin}>
                  <div className="form-group mb-4">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      placeholder='Your Email'
                      value={credentials.email}
                      onChange={handleChange}
                      className='form-control'
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      placeholder='Your Password'
                      value={credentials.password}
                      onChange={handleChange}
                      className='form-control'
                      required
                    />
                  </div>

                  <div className='form-check mb-4'>
                    <input
                      type='checkbox'
                      id='flexCheckDefault'
                      className='form-check-input'
                      onChange={handleCheckboxChange} // Use handleCheckboxChange for checkbox
                    />
                    <label className='form-check-label ms-2' htmlFor='flexCheckDefault'>
                      Agree with the Policy and Terms of Use
                    </label>
                  </div>

                  <button className='btn btn-primary mb-4'>LogIn</button>
                  <Link to="/signup">
                    <h5 className="text-green-600" >Create New Account</h5>
                  </Link>
                </form>

              </div>

              <div className='col-md-10 col-lg-6 order-1 order-lg-2 d-flex align-items-center'>
                <img
                  src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                  alt='Registration'
                  className='img-fluid'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

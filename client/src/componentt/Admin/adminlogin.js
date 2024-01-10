import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar/navbar';
import '../login.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      alert('Please agree to the Policy and Terms of Use.');
      return;
    }

    try {
      const response = await Axios.post('http://localhost:3001/adminlogin', {
        username: credentials.username,
        password: credentials.password,
      });

      console.log(response.data);

      if (response.data.success) {
        alert('Login successful!');
        navigate('/adminhome',{state:{username:response.data.username}});
      } else {
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
      <div className="container" style={{marginTop:"50px" }}>
        <div className='card text-black m-5' style={{ borderRadius: '25px' }}>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center '>

                <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4 ">Admin LogIn</p>

                <form onSubmit={handleLogin}>
                  <div className="form-group mb-4">
                    <label>Username:</label>
                    <input
                      type="text"
                      name="username"
                      placeholder='Enter Username'
                      value={credentials.username}
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

export default AdminLogin;

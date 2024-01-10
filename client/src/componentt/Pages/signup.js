import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../Navbar/navbar';
import Swal from "sweetalert2";
import Axios from 'axios';
import '../signup.css';

const Signup = () => {


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    subscribe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  ////////////////////  encrypt pass cheking

  const encrypt = (text) => {
    let s = 4;
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (char.toUpperCase() !== char.toLowerCase()) {
        let ch = String.fromCharCode((char.charCodeAt(0) + s - 65) % 26 + 65);
        result += ch;
      } else {
        result += char;
      }
    }
    return result;
  };

  /////////////////////handleSubmit function accordingly:

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encryptedPassword = encrypt(formData.password);

    if (encryptedPassword !== encrypt(formData.repeatPassword)) {
      Swal.fire("Password doesn't match confirm password!", "", "error");
    } else if (!formData.subscribe) {
      Swal.fire("Please agree to the Policy and Terms of Use.", "", "error");
    } else {
      try {
        const response = await Axios.post("http://localhost:3001/signup", {
          name: formData.name,
          email: formData.email,
          password: encryptedPassword,
        });

        console.log(response.data);

        Swal.fire("Registered Successfully!", "", "success");
        // Redirect or do something after successful registration
        navigate('/login', { state: { username: formData.name } });
      } catch (error) {
        console.error(error);
        Swal.fire("Error in Signup!", "", "error");
      }
    }
  };



  return (
    <div>
      <AppNavbar />
      <div className="container" style={{ marginTop:'80px' }}>
        <div className='card text-black m-1' style={{ borderRadius: '25px' }}>
          <div className='card-body p-0'>
            <div className='row'>
              <div className='col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center '>
                <p className="text-center h2 fw-bold mb-2 mx-1 mx-md-4 mt-1">Sign up</p>

                <div className="mb-0">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <div className="input-group">
                    <input
                      id="name"
                      name='name'
                      type='text'
                      placeholder='Your Name'
                      className='form-control rounded-3'
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-0">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <div className="input-group">
                    <input
                      id="email"
                      name='email'
                      type='email'
                      placeholder='Your Email'
                      value={formData.email}
                      onChange={handleChange}
                      className='form-control rounded-3'
                    />
                  </div>
                </div>

                <div className="mb-0">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <div className="input-group">
                    <input
                      id="password"
                      name='password'
                      type='password'
                      placeholder='Password'
                      value={formData.password}
                      onChange={handleChange}
                      className='form-control rounded-3'
                    />
                  </div>
                </div>

                <div className="mb-0">
                  <label htmlFor="repeatPassword" className="form-label">Repeat Password:</label>
                  <div className="input-group">
                    <input
                      id="repeatPassword"
                      name='repeatPassword'
                      type='password'
                      placeholder='Repeat your password'
                      value={formData.repeatPassword}
                      onChange={handleChange}
                      className='form-control rounded-3'
                    />
                  </div>
                </div>

                <div className='mb-0'>
                  <input
                    type='checkbox'
                    id='subscribe'
                    name='subscribe'
                    checked={formData.subscribe}
                    onChange={handleChange}
                  /><label className='form-check-label ms-2 d-inline' htmlFor='subscribe'>Agree with the Policy and Terms of Use</label>
                </div>


                <button className='btn btn-primary mb-0' onClick={handleSubmit}>Register</button>
                <div>
                <Link to="/login">
                  <h5 className="text-green-600" > Already a User ? Login</h5>
                </Link>
                </div>
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

export default Signup;

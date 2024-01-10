import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/navbar';

const Roundtrip = () => {
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Add logic for handling form submission or navigation
      // For example: window.location.href = 'flightshow';
  
      // Redirect to the specified page using the navigate function
      navigate('/flightshow');
    };
  
    const hClick = () => {
      // Redirect to the specified page using the navigate function
      navigate('/');
    };
     return (
            <div>
                <Navbar />

                <div style={{marginTop:"50px" }}>
                    <form onSubmit={handleSubmit}>
                        <div id="mydata">
                            <center>
                                <table cellPadding="12">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <button type="button" className="A" >Round-way Trip</button>
                                                <button type="button" className="A" onClick={hClick}>
                                                    Round-way Trip
                                                </button>                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Origin</td>
                                            <td>
                                                <select name="u1" className="Aa">
                                                    <option>Ujjain</option>
                                                    <option>Surat</option>
                                                    {/* Add other options */}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Destination</td>
                                            <td>
                                                <select name="u2" className="Aa">
                                                    <option>Indore</option>
                                                    <option>Surat</option>
                                                    {/* Add other options */}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Departure</td>
                                            <td><input type="date" placeholder="dd/mm/yyyy" className="Aa" name="u4" /></td>
                                        </tr>
                                        <tr>
                                            <td>Return</td>
                                            <td><input type="date" placeholder="dd/mm/yyyy" className="Aa" name="u5" /></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="2"><input type="submit" className="btn btn-success" value="SEARCH" /></th>
                                        </tr>
                                    </tbody>
                                </table>
                            </center>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
export default Roundtrip;

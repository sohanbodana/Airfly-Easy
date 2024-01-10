import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import UserNavbar from '../Navbar/userNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import '../bookings.css';

const Booking = () => {
    const navigate = useNavigate();
 
    /// after save data  user and passenger   
    const location = useLocation();
    console.log('location.state:', location.state);
    const selectedFlight = location.state?.selectedFlight || {};
    const selectedDate = location.state?.selectedDate;
    

    // const userID = location.state?.userID; // Assuming you pass the userID from the user login/registration
    
    // const PNR = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
    
    const [formData, setFormData] = useState({
        PNR:'',
        name: '',
        age: '',
        gender: '',
        address: '',
        state: '',
        email: '',
        contact: '',
        fclass: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            navigate('/confirmation',{state:{selectedFlight,formData,selectedDate}});
            // navigate('/userSuccess');
        } catch (error) {
            console.error(error);
            Swal.fire("Error in Booking!", "", "error");
        }
    };

    const savebutton = async (e) => {
        e.preventDefault();
        try {
            window.location.reload();
        } catch (error) {
            console.error(error);
            Swal.fire("Error in Booking!", "", "error");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div>
            <UserNavbar />
            <body style={{marginTop:"50px" }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <center>
                            <tbody>
                            <table cellPadding="12">

                                <tr>
                                    <td>
                                        <h1>Passenger Details</h1>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Passenger's Name</td>
                                    <td><input type="text" placeholder="Enter Name" name="name" value={formData.name} onChange={handleChange} /></td>
                                </tr>

                                <tr>
                                    <td>Passenger's Age</td>
                                    <td><input type="text" placeholder="Enter Age" name="age" value={formData.age} onChange={handleChange} /></td>
                                </tr>

                                <tr>
                                    <td>Gender</td>
                                    <td>
                                        <select name="gender" value={formData.gender} onChange={handleChange} >
                                            <option>Select</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Address & PIN</td>
                                    <td><input type="text" placeholder="Address & PIN" name="address" value={formData.address} onChange={handleChange} /></td>
                                </tr>

                                <tr>
                                    <td>STATE</td>
                                    <td>
                                        <select name="state" value={formData.state} onChange={handleChange} >
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                            <option value="Daman and Diu">Daman and Diu</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Odisha">Odisha</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Uttarakhand">Uttarakhand</option>
                                            <option value="West Bengal">West Bengal</option>
                                        </select>
                                    </td>
                                </tr>


                                <tr>
                                    <td>Mail-Id</td>
                                    <td><input type="email" placeholder="email" name="email" value={formData.email} onChange={handleChange} /></td>
                                </tr>



                                <tr>
                                    <td>Contact No:</td>
                                    <td><input type="text" placeholder="Contact No" className="Aa" name="contact" value={formData.contact} onChange={handleChange} /></td>
                                </tr>

                                <tr>
                                    <td>Travel Class</td>
                                    <td>
                                        <select className="Aa" name="fclass" value={formData.fclass} onChange={handleChange}>
                                            <option>EconomyClass</option>
                                            <option>PremiumEconomyClass</option>
                                            <option>FirstClass</option>
                                            <option>BusinessClass</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr style={{ textAlign: 'center' }} >
                                    <th colSpan="2"> <button type="submit" className="B"  onClick={savebutton}>Add More</button></th>
                                </tr>

                                <tr style={{ textAlign: 'center' }} >
                                    <th colSpan="2"><button type="submit" className="B" onClick={handleSubmit}>Submit</button></th>
                                </tr>

                            </table>
                            </tbody>
                        </center>
                    </div>
                </form>
            </body>
        </div>
    );
};

export default Booking;

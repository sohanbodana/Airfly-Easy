// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Swal from "sweetalert2";
// import Axios from 'axios';
// import '../bookings.css';
// import AdminNavbar from '../Navbar/adminNavbar';

// const PassengerData2 = () => {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: '',
//         age: '',
//         gender: '',
//         address: '',
//         state: '',
//         email: '',
//         contact: '',
//         FClass: '',
//     });

//     const [passengerList, setPassengerList] = useState([]);
//     const [editingPassenger, setEditingPassenger] = useState(null);


//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try {
//             const response = await (editingPassenger
//                 ? Axios.put(`http://localhost:3001/passengerdata/${editingPassenger.PNR}`, formData)
//                 : Axios.post('http://localhost:3001/bookings', formData));
    
//             setEditingPassenger(null);
//             setPassengerList((passengers) =>
//                 editingPassenger
//                     ? passengers.map((passenger) => (passenger.PNR === editingPassenger.PNR ? formData : passenger))
//                     : [...passengers, response.data]
//             );
    
//             setFormData({
//                 name: '',
//                 age: '',
//                 gender: '',
//                 address: '',
//                 state: '',
//                 email: '',
//                 contact: '',
//                 FClass: '',
//             });
    
//             Swal.fire("Operation Successful!", "", "success");
//             navigate('/passengerdata');
//             window.location.reload();
//         } catch (error) {
//             console.error(error);
//             Swal.fire("Error in Passenger data operation!", "", "error");
//         }
//     };
    

    


//     ////////////////////  edit passenger


    
//       const handleEdit = (passenger) => {
//         // Set the form data to the values of the passenger being edited
//         setFormData({ ...passenger });
//         // Set the passenger being edited
//         setEditingPassenger(passenger);
//       };

//     const handleDelete = async (PNR) => {
//         try {
//             // Make the Axios request to delete the flight
//             const response = await Axios.delete(`http://localhost:3001/PassengerDelete/${PNR}`);

//             if (response.data.err) {
//                 throw new Error(response.data.err);
//             }

//             // Update the flights state after successful deletion
//             setPassengerList((prevFlights) => prevFlights.filter((flight) => flight.PNR !== PNR));

//             // Display success message using SweetAlert or other notification library
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Flight Deleted Successfully',
//             });
//             window.location.reload();

//         } catch (error) {
//             // Display error message using SweetAlert or other notification library
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: error.message,
//             });
//         }
//     };

//     useEffect(() => {
//         // Fetch flights data from the server when the component mounts
//         fetchpassenger();
//     }, []);

//     const fetchpassenger = async () => {
//         try {
//             const response = await Axios.get("http://localhost:3001/passengerdata");
//             setPassengerList(response.data);
//         } catch (error) {
//             console.error("Error fetching flights:", error);
//         }
//     }
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     return (
//         <div>
//             <AdminNavbar />
//             <div>
//                 <body style={{ marginTop: "50px" }}>
//                     <form onSubmit={handleSubmit}>
//                         <div>
//                             <center>
//                                 <tbody>
//                                     <table cellPadding="12">
//                                         <tr>
//                                             <td>
//                                                 <h1>Passenger Details</h1>
//                                             </td>
//                                         </tr>

//                                         <tr>
//                                             <td>Passenger's Name</td>
//                                             <td><input type="text" placeholder="Enter Name" name="name" value={formData.name} onChange={handleChange} /></td>
//                                         </tr>

//                                         <tr>
//                                             <td>Passenger's Age</td>
//                                             <td><input type="text" placeholder="Enter Age" name="age" value={formData.age} onChange={handleChange} /></td>
//                                         </tr>

//                                         <tr>
//                                             <td>Gender</td>
//                                             <td>
//                                                 <select name="gender" value={formData.gender} onChange={handleChange} >
//                                                     <option>Select</option>
//                                                     <option>Male</option>
//                                                     <option>Female</option>
//                                                 </select>
//                                             </td>
//                                         </tr>

//                                         <tr>
//                                             <td>Address & PIN</td>
//                                             <td><input type="text" placeholder="Address & PIN" name="address" value={formData.address} onChange={handleChange} /></td>
//                                         </tr>

//                                         <tr>
//                                             <td>STATE</td>
//                                             <td>
//                                                 <select name="state" value={formData.state} onChange={handleChange} >
//                                                     <option value="Andhra Pradesh">Andhra Pradesh</option>
//                                                     <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
//                                                     <option value="Arunachal Pradesh">Arunachal Pradesh</option>
//                                                     <option value="Assam">Assam</option>
//                                                     <option value="Bihar">Bihar</option>
//                                                     <option value="Chandigarh">Chandigarh</option>
//                                                     <option value="Chhattisgarh">Chhattisgarh</option>
//                                                     <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
//                                                     <option value="Daman and Diu">Daman and Diu</option>
//                                                     <option value="Delhi">Delhi</option>
//                                                     <option value="Lakshadweep">Lakshadweep</option>
//                                                     <option value="Puducherry">Puducherry</option>
//                                                     <option value="Goa">Goa</option>
//                                                     <option value="Gujarat">Gujarat</option>
//                                                     <option value="Haryana">Haryana</option>
//                                                     <option value="Himachal Pradesh">Himachal Pradesh</option>
//                                                     <option value="Jammu and Kashmir">Jammu and Kashmir</option>
//                                                     <option value="Jharkhand">Jharkhand</option>
//                                                     <option value="Karnataka">Karnataka</option>
//                                                     <option value="Kerala">Kerala</option>
//                                                     <option value="Madhya Pradesh">Madhya Pradesh</option>
//                                                     <option value="Maharashtra">Maharashtra</option>
//                                                     <option value="Manipur">Manipur</option>
//                                                     <option value="Meghalaya">Meghalaya</option>
//                                                     <option value="Mizoram">Mizoram</option>
//                                                     <option value="Nagaland">Nagaland</option>
//                                                     <option value="Odisha">Odisha</option>
//                                                     <option value="Punjab">Punjab</option>
//                                                     <option value="Rajasthan">Rajasthan</option>
//                                                     <option value="Sikkim">Sikkim</option>
//                                                     <option value="Tamil Nadu">Tamil Nadu</option>
//                                                     <option value="Telangana">Telangana</option>
//                                                     <option value="Tripura">Tripura</option>
//                                                     <option value="Uttar Pradesh">Uttar Pradesh</option>
//                                                     <option value="Uttarakhand">Uttarakhand</option>
//                                                     <option value="West Bengal">West Bengal</option>
//                                                 </select>
//                                             </td>
//                                         </tr>


//                                         <tr>
//                                             <td>Mail-Id</td>
//                                             <td><input type="email" placeholder="email" name="email" value={formData.email} onChange={handleChange} /></td>
//                                         </tr>



//                                         <tr>
//                                             <td>Contact No:</td>
//                                             <td><input type="text" placeholder="Contact No" className="Aa" name="contact" value={formData.contact} onChange={handleChange} /></td>
//                                         </tr>

//                                         <tr>
//                                             <td>Travel Class</td>
//                                             <td>
//                                                 <select className="Aa" name="fclass" value={formData.fclass} onChange={handleChange}>
//                                                     <option>Economy Class</option>
//                                                     <option>Premium Economy Class</option>
//                                                     <option>First Class</option>
//                                                     <option>Business Class</option>
//                                                 </select>
//                                             </td>
//                                         </tr>

//                                         <tr style={{ textAlign: 'center' }} >
//                                             <th colSpan="2">
//                                                 <button type="submit" className="btn btn-success" onClick={handleSubmit}>Add More</button>
//                                             </th>
//                                         </tr>

//                                         <tr style={{ textAlign: 'center' }} >
//                                             <th colSpan="2">
//                                                 <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
//                                             </th>
//                                         </tr>
//                                     </table>
//                                 </tbody>
//                             </center>
//                         </div>
//                     </form>
//                 </body>
//             </div>

//             {/* Table for passenger data showing */}
//             <div>
//                 <div className="tbshow m-3">
//                     <div className="table-responsive">
//                         <table className="styled-table">
//                             <thead>
//                                 <tr>
//                                     <th style={{ textAlign: "center" }}>PNR</th>
//                                     <th style={{ textAlign: "center" }}>Name</th>
//                                     <th style={{ textAlign: "center" }}>Age</th>
//                                     <th style={{ textAlign: "center" }}>Gender</th>
//                                     <th style={{ textAlign: "center" }}>Address</th>
//                                     <th style={{ textAlign: "center" }}>State</th>
//                                     <th style={{ textAlign: "center" }}>Email</th>
//                                     <th style={{ textAlign: "center" }}>contact</th>
//                                     <th style={{ textAlign: "center" }}>FlightClass</th>
//                                     <th style={{ textAlign: "center" }}>Action</th>
//                                     <th style={{ textAlign: "center" }}>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody  className="bg-white text-black">
//                                 {passengerList.map((flightab, index) => (
//                                     <tr key={index} >
//                                         <td>{flightab.PNR}</td>
//                                         <td>{flightab.name}</td>
//                                         <td>{flightab.age}</td>
//                                         <td>{flightab.gender}</td>
//                                         <td>{flightab.address}</td>
//                                         <td>{flightab.state}</td>
//                                         <td>{flightab.email}</td>
//                                         <td>{flightab.contact}</td>
//                                         <td>{flightab.FClass}</td>
//                                         <td>
//                                             <button className="btn btn-success m-1" onClick={() => handleEdit(flightab)}>
//                                                 Edit
//                                             </button>
//                                         </td>
//                                         <td>
//                                             <Link to={"#"}>
//                                                 <button onClick={() => handleDelete(flightab.PNR)}
//                                                     className="btn btn-success m-1"
//                                                 >Delete</button>
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PassengerData2;

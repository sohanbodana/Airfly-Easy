import React, {useEffect, useState } from "react";
// import UserNavbar from "../Navbar/userNavbar";
import Swal from "sweetalert2";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../userSuccess.css';
import '../home.css';
import AdminNavbar from "../Navbar/adminNavbar";

const Ticketdetail = () => {

        //// serach flight search functionality and display available flights
        const [searchCriteria, setSearchCriteria] = useState({
                origin: '',
        });
        const [flights, setFlights] = useState([]);

        const handleSearch = async (e) => {
                e.preventDefault();
                try {
                        const response = await Axios.post("http://localhost:3001/searchTicket", {
                                origin: searchCriteria.origin,
                        });

                        setFlights(response.data);
                        console.log(response.data);


                } catch (error) {
                        console.error(error);
                        Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: error.message,
                        });
                }
        };
        
        const handleDelete = async (PNR) => {
                try {
                    // Make the Axios request to delete the flight
                    const response = await Axios.delete(`http://localhost:3001/cancelbooking/${PNR}`);
        
                    if (response.data.err) {
                        throw new Error(response.data.err);
                    }
        
                    // Update the flights state after successful deletion
                    setFlights((prevFlights) => prevFlights.filter((flight) => flight.origin !== origin));
        
                    // Display success message using SweetAlert or other notification library
                    Swal.fire({
                        icon: 'success',
                        title: 'Flight Deleted Successfully',
                    });
                    window.location.reload();
        
                } catch (error) {
                    // Display error message using SweetAlert or other notification library
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message,
                    });
                }
            };

        // const navigate = useNavigate();

        useEffect(() => {
                // Fetch flights data from the server when the component mounts
                fetchFlights();
            }, []);
        
        const fetchFlights = async () => {
                try {
                    const response = await Axios.get("http://localhost:3001/searchTicketShow");
                    setFlights(response.data);
                } catch (error) {
                    console.error("Error fetching flights:", error);
                }
        }

        const handleChange = (e) => {
                const { name, value } = e.target;
                setSearchCriteria({
                        ...searchCriteria,
                        [name]: value,
                });
        };

        const inlinecss = {
                padding: '10px',
                marginTop: '10px',
        };

        const inlinecss2 = {
                margin_top: '20px',
                color: 'black',
        };

        return (
                <div>
                        <AdminNavbar/>
                        <div>
                                <form onSubmit={handleSearch}>
                                        <div id="mydata" style={inlinecss}>
                                                <center>
                                                        <h4 className="text-white">Easy Search - PassengerData </h4>
                                                        <table cellPadding="20" style={{ inlinecss2 }}>
                                                                <tbody style={{ margin: '20px', color: 'white' }}>
                                                                        <tr>
                                                                                <td>Search</td>
                                                                                <td>
                                                                                        <label className="tbtd">You can search using Name & PNR & Contact</label>
                                                                                        <input
                                                                                                type="text"
                                                                                                placeholder="Name/PNR/contact/"
                                                                                                className="Aa"
                                                                                                name="origin"
                                                                                                value={searchCriteria.origin}
                                                                                                onChange={handleChange}
                                                                                        />
                                                                                </td>
                                                                        </tr>

                                                                        <tr className="text-center">
                                                                                <td colSpan="2" >
                                                                                        <button type="submit" className="btn btn-success ">
                                                                                                SEARCH
                                                                                        </button>
                                                                                </td>
                                                                        </tr>
                                                                </tbody>
                                                        </table>
                                                </center>
                                        </div>
                                </form>
                        </div>
                        
                        <div className="tbshow">

                                <div className="table-responsive">
                                        <table className="styled-table bg-white  " style={{ color: 'black' }} >
                                                <thead>
                                                        <tr>
                                                                <th style={{ textAlign: "center" }}>PNR</th>
                                                                <th style={{ textAlign: "center" }}>NAME</th>
                                                                <th style={{ textAlign: "center" }}>AGE</th>
                                                                <th style={{ textAlign: "center" }}>EMAIL</th>
                                                                <th style={{ textAlign: "center" }}>CONTACT</th>
                                                                <th style={{ textAlign: "center" }}>FID</th>
                                                                <th style={{ textAlign: "center" }}>AIRLINE</th>
                                                                <th style={{ textAlign: "center" }}>DepartTime</th>
                                                                <th style={{ textAlign: "center" }}>ArrivalTime</th>
                                                                <th style={{ textAlign: "center" }}>Departure</th>
                                                                <th style={{ textAlign: "center" }}>Arrival</th>
                                                                <th style={{ textAlign: "center" }}>FClass</th>
                                                                <th style={{ textAlign: "center" }}>Action</th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                        {flights.map((flight, index) => (
                                                                <tr key={index} >
                                                                        <td>{flight.PNR}</td>
                                                                        <td>{flight.name}</td>
                                                                        <td>{flight.age}</td>
                                                                        <td>{flight.email}</td>
                                                                        <td>{flight.contact}</td>
                                                                        <td>{flight.FID}</td>
                                                                        <td>{flight.AIRLINE}</td>
                                                                        <td>{flight.DepartTime}</td>
                                                                        <td>{flight.ArrivalTime}</td>
                                                                        <td>{flight.Origin}</td>
                                                                        <td>{flight.Destination}</td>
                                                                        <td>{flight.FClass}</td>
                                                                        <td >
                                                                                <button onClick={() => handleDelete(flight.PNR)}
                                                                                        className="btn btn-primary"
                                                                                >Delete</button>
                                                                        </td>
                                                                </tr>
                                                        ))}
                                                </tbody>
                                        </table>
                                </div>
                        </div>

                </div>
        );
};

export default Ticketdetail;



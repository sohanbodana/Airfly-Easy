import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";

import './styles/AddEdit.css';
import Swal from 'sweetalert2';
import AdminNavbar from "../Navbar/adminNavbar";



const initialState = {
    FID: "",
    AIRLINE: "",
    DepartTime: "",
    ArrivalTime: "",
    Origin: "",
    Destination: "",
    FirstClass: "",
    BusinessClass: "",
    PremiumEconomyClass: "",
    EconomyClass: "",
    
};

const AddFlight = () => {
    const [state, setState] = useState(initialState);

    const [flights, setFlights] = useState([]); // Array to store flight data


    const {
        FID,
        AIRLINE,
        DepartTime,
        ArrivalTime,
        Origin,
        Destination,
        FirstClass,
        BusinessClass,
        PremiumEconomyClass,
        EconomyClass,
    } = state;

    const navigate = useNavigate();

    ///////////////////  seaching perticular flights
    const [searchCriteria, setSearchCriteria] = useState({
        origin: '',
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post("http://localhost:3001/searchTicketShow", {
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
    //////end of searching

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (
                !FID ||
                !AIRLINE ||
                !DepartTime ||
                !ArrivalTime ||
                !Origin ||
                !Destination ||
                !FirstClass ||
                !BusinessClass ||
                !PremiumEconomyClass ||
                !EconomyClass
            ) {
                throw new Error("Required Fields are empty");
            }

            // Make the Axios request

            const response = await Axios.post("http://localhost:3001/addflights", {
                FID,
                AIRLINE,
                DepartTime,
                ArrivalTime,
                Origin,
                Destination,
                FirstClass,
                BusinessClass,
                PremiumEconomyClass,
                EconomyClass,
            });

            if (response.data.err) {
                throw new Error(response.data.err);
            }

            // Reset the form
            setState(initialState);

            // Display success message using SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Flight Added Successfully',
            });

            // Redirect to the desired page after a delay
            setTimeout(() => navigate("/addflights"), 500);
            // Reload the page (you may consider using React Router's <Redirect> instead)
            window.location.reload();
        } catch (error) {
            // Display error message using SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    };

    const handleDelete = async (fid) => {
        try {
            // Make the Axios request to delete the flight
            const response = await Axios.delete(`http://localhost:3001/deleteflight/${fid}`);

            if (response.data.err) {
                throw new Error(response.data.err);
            }

            // Update the flights state after successful deletion
            setFlights((prevFlights) => prevFlights.filter((flight) => flight.FID !== fid));

            // Display success message using SweetAlert or other notification library
            Swal.fire({
                icon: 'success',
                title: 'Flight Deleted Successfully',
            });
        } catch (error) {
            // Display error message using SweetAlert or other notification library
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    };


    ///////  searching flight
    useEffect(() => {
        // Fetch flights data from the server when the component mounts
        fetchFlights();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({
            ...searchCriteria,
            [name]: value,
        });
    };

    ////////////end of sf

    const fetchFlights = async () => {
        try {
            const response = await Axios.get("http://localhost:3001/flightshow");
            setFlights(response.data);
        } catch (error) {
            console.error("Error fetching flights:", error);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "DepartTime" || name === "ArrivalTime") {
            // Format time to HH:MM:SS
            const formattedTime = value.substring(0, 5) + ":00";

            setState({ ...state, [name]: formattedTime });
        } else {
            // For other fields, update state directly
            setState({ ...state, [name]: value })
        }
    };

    //////////////////////  inline css 

    const inlinecss = {
        padding: '10px',
        margin: '10px',
    };

    const inlinecss2 = {
        margin_top: '20px',
        color: 'black',
    };



    return (
        <div>
            <AdminNavbar />
    
            {/* /////// searchin flights */}
            <div>
                <form onSubmit={handleSearch}>
                    <div id="mydata" style={inlinecss}>
                        <center>
                            <h4 className="text-white">Easy Search -Flightdata</h4>
                            <table cellPadding="8" style={{ inlinecss2 }}>
                                <tbody style={{ margin: '20px', color: 'white' }}>
                                    <tr>
                                        <td>Search</td>
                                        <td>
                                            <label className="tbtd">You can search using Name & PNR & Contact</label>
                                            <input
                                                type="text"
                                                placeholder="ID/AIRLINE/CITY/"
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
            {/*///end of searching */}


            <div style={{ marginTop: "0px" }}>
                <form
                    style={{
                        margin: "auto",
                        padding: "15px",
                        maxWidth: "600px",
                        alignContent: "center",
                        backgroundColor: "grey",
                        borderRadius: "10px",
                    }}
                    onSubmit={handleSubmit}
                >

                    <label htmlFor="AIRLINE">AIRLINE</label>
                    <input
                        type="text"
                        name="FID"
                        value={FID || ""}
                        placeholder="Flight ID"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="AIRLINE">AIRLINE</label>
                    <input
                        type="text"
                        name="AIRLINE"
                        value={AIRLINE || ""}
                        placeholder="AIRLINE"
                        onChange={handleInputChange}
                    />

                    <label htmlFor="DepartTime">DepartTime</label>
                    <input
                        type="time"
                        name="DepartTime"
                        value={DepartTime || "00:00:00"}
                        step="1"
                        placeholder="DepartTime"
                        onChange={handleInputChange}
                        style={{ WebkitAppearance: 'textfield', display: 'inline-block' }}
                    />

                    <label htmlFor="ArrivalTime">ArrivalTime</label>
                    <input
                        type="time"
                        name="ArrivalTime"
                        value={ArrivalTime || "00:00:00"}
                        step="1"
                        placeholder="ArrivalTime"
                        onChange={handleInputChange}
                        style={{ WebkitAppearance: 'textfield', display: 'inline-block' }}

                    />
                    <br />
                    <label htmlFor="Origin">Origin</label>
                    <input
                        type="text"
                        name="Origin"
                        value={Origin || ""}
                        placeholder="Origin"
                        onChange={handleInputChange}
                    />

                    <label htmlFor="Destination">Destination</label>
                    <input
                        type="text"
                        name="Destination"
                        value={Destination || ""}
                        placeholder="Destination"
                        onChange={handleInputChange}
                    />

                    <label htmlFor="FirstClass">FirstClass</label>
                    <input
                        type="text"
                        name="FirstClass"
                        value={FirstClass || ""}
                        placeholder="FirstClass"
                        onChange={handleInputChange}
                    />

                    <label htmlFor="BusinessClass">BusinessClass</label>
                    <input
                        type="text"
                        name="BusinessClass"
                        value={BusinessClass || ""}
                        placeholder="BusinessClass"
                        onChange={handleInputChange}
                    />

                    <label htmlFor="PremiumEconomyClass">PremiumEconomyClass</label>
                    <input
                        type="text"
                        name="PremiumEconomyClass"
                        value={PremiumEconomyClass || ""}
                        placeholder="PremiumEconomyClass"
                        onChange={handleInputChange}
                    />

                    <label htmlFor="EconomyClass">EconomyClass</label>
                    <input
                        type="text"
                        name="EconomyClass"
                        value={EconomyClass || ""}
                        placeholder="EconomyClass"
                        onChange={handleInputChange}
                    />

                    <input type="submit" value="Add" />
                    <Link to="/adminhome">
                        <input type="button" value="Back"></input>
                    </Link>
                </form>
            </div>

            {/* //////////////  All flightshow */}


            <div className="tbshow m-3">

                <div className="table-responsive">
                    <table className="styled-table bg-white  " style={{ color: 'black' }} >
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>Airplane ID</th>
                                <th style={{ textAlign: "center" }}>DepartTime</th>
                                <th style={{ textAlign: "center" }}>ArrivalTime</th>
                                <th style={{ textAlign: "center" }}>AIRLINE</th>
                                <th style={{ textAlign: "center" }}>Departure</th>
                                <th style={{ textAlign: "center" }}>Arrival</th>
                                <th style={{ textAlign: "center" }}>FirstClass</th>
                                <th style={{ textAlign: "center" }}>BusinessClass</th>
                                <th style={{ textAlign: "center" }}>PremiumEconomy</th>
                                <th style={{ textAlign: "center" }}>EconomyClass</th>
                                <th style={{ textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map((flight, index) => (
                                <tr key={index} >
                                    <td>{flight.FID}</td>
                                    <td>{flight.DepartTime}</td>
                                    <td>{flight.ArrivalTime}</td>
                                    <td>{flight.AIRLINE}</td>
                                    <td>{flight.Origin}</td>
                                    <td>{flight.Destination}</td>
                                    <td>{flight.FirstClass}</td>
                                    <td>{flight.BusinessClass}</td>
                                    <td>{flight.PremiumEconomyClass}</td>
                                    <td>{flight.EconomyClass}</td>
                                    <td >
                                        <button onClick={() => handleDelete(flight.FID)}
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

export default AddFlight;
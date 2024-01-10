import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import './styles/AddEdit.css';
import Swal from 'sweetalert2';
import AdminNavbar from "../Navbar/adminNavbar";



const initialState = {
    id: "",
    name: "",
    email: "",
    password: "",
};

const AddUser = () => {
    const [state, setState] = useState(initialState);

    const [flights, setFlights] = useState([]); // Array to store flight data

    const {
        id,
        name,
        email,
        password,
    } = state;

    const navigate = useNavigate();

     ///////////////////  seaching perticular flights
     const [searchCriteria, setSearchCriteria] = useState({
        origin: '',
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post("http://localhost:3001/searchUserShow", {
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
                !id ||
                !name ||
                !email ||
                !password 
            ) {
                throw new Error("Required Fields are empty");
            }

            // Make the Axios request
            const response = await Axios.post("http://localhost:3001/adduserdata", {
                id,
                name,
                email,
                password,
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
            setTimeout(() => navigate("/adduser"), 500);
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
            const response = await Axios.delete(`http://localhost:3001/deleteuser/${fid}`);

            if (response.data.err) {
                throw new Error(response.data.err);
            }

            // Update the flights state after successful deletion
            setFlights((prevFlights) => prevFlights.filter((flight) => flight.id !== id));

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

    ///////  searching flight
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({
            ...searchCriteria,
            [name]: value,
        });
    };

    ////////////end of sf

    useEffect(() => {
        // Fetch flights data from the server when the component mounts
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const response = await Axios.get("http://localhost:3001/searchuser");
            setFlights(response.data);
        } catch (error) {
            console.error("Error fetching flights:", error);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value })
        
    };
    return (
        <div className="text-black">
            <AdminNavbar />
           
            {/* /////// searchin flights */}
            <div style={{marginTop:"10px"}}>
                <form onSubmit={handleSearch}>
                    <div id="mydata" >
                        <center>
                            <h4 className="text-white">Easy Search -Flightdata</h4>
                            <table cellPadding="8" >
                                <tbody style={{ margin: '20px', color: 'white' }}>
                                    <tr>
                                        <td>Search</td>
                                        <td>
                                            <label className="tbtd">You can search using Name & Email </label>
                                            <input
                                                type="text"
                                                placeholder="Name/Email"
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
            <div style={{ marginTop: "15px" }}>
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

                    <label >ID</label>
                    <input
                        type="text"
                        name="id"
                        value={id|| ""}
                        placeholder="Enter ID"
                        onChange={handleInputChange}
                    />
                    <label >Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name || ""}
                        placeholder="Enter Name"
                        onChange={handleInputChange}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email }
                        step="1"
                        placeholder="Enter Email"
                        onChange={handleInputChange}
                    />

                    <label >Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password  }
                        placeholder="Enter Password"
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
                    <h2 className="justify text-center text-white">User's Data</h2>
                    <table className="styled-table " style={{background:'white', color : 'black' }} >
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>ID</th>
                                <th style={{ textAlign: "center" }}>Name</th>
                                <th style={{ textAlign: "center" }}>Email</th>
                                <th style={{ textAlign: "center" }}>Password</th>
                                <th style={{ textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-black">
                            {flights.map((flight, index) => (
                                <tr key={index} >
                                    <td>{flight.id}</td>
                                    <td>{flight.name}</td>
                                    <td>{flight.email}</td>
                                    <td>{flight.password}</td>
                                    <td >
                                        <button onClick={() => handleDelete(flight.id)}
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

export default AddUser;
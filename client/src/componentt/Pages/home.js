/////////////             Home.js

import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Axios from "axios";
import AppNavbar from '../Navbar/navbar';
import '../home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {

  const [selectedFlight, setSelectedFlight] = useState([]); // Updated state for selectedFlight


  //// serach flight search functionality and display available flights
  const [searchCriteria, setSearchCriteria] = useState({
    origin: '',
    destination: '',
  });
  const [flights, setFlights] = useState([]);
  const navigates=useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/searchFlights", {
        origin: searchCriteria.origin,
        destination: searchCriteria.destination,
      });

      setFlights(response.data);

      setSelectedFlight(response.data[0]);  // for login send
      console.log(selectedFlight);
      

    } catch (error) {
      console.error(error);
    }
  };

  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };

  // const hClick = () => {
  //   navigate('/roundtrip');
  // };

  const cities = [
    'Select City',
    'Ujjain',
    'Indore',
    'Hyderabad ',
    'Mumbai',
    'Chennai',
    'Jaipur',
    'Kolkata',
    'Chandigarh',
    'Pune  ',
    'Bhopal',
    'Vadodara',
    'Guwahati',
    'Coimbatore',
    'Ahmedabad',
    'Delhi ',
    'Goa   ',
    'Bangalore',
    'Trivandrum',
    'Varanasi',
    'Surat ',
    'Nagpur',
    'Ranchi',
    'Bhubaneswar',
    'Patna',
    'Lucknow',
    'Kochi'
  ];

  const inlinecss = {
    padding: '3px',
    margin: '2px',
  }
  const inlinecss2 = {
    margin_top: '20px',
    color: 'black',
  }

  return (
    <div>
      <AppNavbar />
      <div style={{ marginTop: "55px" }}>
        <div>
          <section id="hero" className="d-flex align-items-center justify-content-center mt-auto">
            <div className="container" data-aos="fade-up">
              <div className="row justify-content-center ">
                <div className="">
                  <h1 className="" >
                    Fly Smart, Fly Swift: Your Journey, Elevated with AirEasy!<span>.</span></h1>
                  <h2>Elevating Every Journey, One Seamless Experience at a Time!</h2>
                </div>
              </div>
              <div className="row gy-4 mt-5 justify-content-center" data-aos="zoom-in" data-aos-delay="250">
                <div className="m-4">
                  <div className="icon-box">
                    <i className="ri-store-line"></i>

                    <h3 id="targetSection">Search Flights</h3>
                    <a href="#targetSection" className="btn btn-success">Go Serach</a>

                  </div>
                </div>
                <div className="">
                  <div className="icon-box">
                    <i className="ri-bar-chart-box-line"></i>
                    <h3>Signup</h3>
                    <Link to={"/signup"}>
                      <button className="btn btn-success" style={{ fontSize: "14px" }}>
                        Signup
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="">
                  <div className="icon-box">
                    <i className="ri-database-2-line"></i>
                    <h3>LogIn</h3>
                    <Link to={"/login"}>
                      <button className="btn btn-success" style={{ fontSize: "14px" }}>
                        LogIn
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div >
          <form onSubmit={handleSearch}>
            <div id="mydata" style={inlinecss} >
              <center>
                <div className="Aaa text-white">
                  <h4 id="targetSection">Search Flight</h4>
                </div>
                <table cellPadding="8" style={inlinecss2}>
                  <tbody>
                    <tr>
                      <td>
                        {/* <button type="button" className="A" onClick={hClick}>
                        Round-way Trip
                      </button> */}
                        <button type="button" className="A">
                          One-way Trip
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="tbtd">Origin</td>
                      <td>
                        <select
                          name="origin"
                          className="Aa"
                          value={searchCriteria.origin}
                          onChange={handleChange}
                        >
                          {cities.map((city, index) => (
                            <option key={index}>{city}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tbtd">Destination</td>
                      <td>
                        <select
                          name="destination"
                          className="Aa"
                          value={searchCriteria.destination}
                          onChange={handleChange}
                        >
                          {cities.map((city, index) => (
                            <option key={index}>{city}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tbtd">Departure</td>
                      <td>
                        <input
                          type="date"
                          placeholder="dd/mm/yyyy"
                          className="Aa"
                          name="departureDate"
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className='text-center'>
                        <button type="submit" className="btn btn-success">
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
      </div>
      {/* ////////////////  flighshow */}

      <div className="tbshow m-3">

        <div className="table-responsive">
          <table className="styled-table ">
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
                  <td>
                  <button
                      className="btn btn-success"
                      style={{ fontSize: "14px" }}
                      onClick={() => {
                        // navigates('/login', { state: { selectedFlight } });
                        navigates('/login', { state: { selectedFlight, selectedDate: searchCriteria.departureDate } });

                      }}
                    >
                      Book
                    </button>
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

export default Home;
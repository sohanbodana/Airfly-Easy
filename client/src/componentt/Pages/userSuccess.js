import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavbar from "../Navbar/userNavbar";
import Axios from "axios";
import '../userSuccess.css';


const UserSuccess = () => {

  const navigates = useNavigate();
  //// serach flight search functionality and display available flights
  const [searchCriteria, setSearchCriteria] = useState({
    origin: '',
    destination: '',
  });
  const [flights, setFlights] = useState([]);
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/searchFlights", {
        origin: searchCriteria.origin,
        destination: searchCriteria.destination,
      });

      setFlights(response.data);

    } catch (error) {
      console.error(error);
    }
  };




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
      <UserNavbar />
      <div style={{ marginTop: "55px" }}>
        <section id="hero" className="d-flex align-items-center justify-content-center">
          <div className="container" data-aos="fade-up">
            <div className="row justify-content-center ">
              <div className="">
                <h1 className="" >
                  Welcome to AirEasy Flight Reservation System<span>.</span></h1>
                <h2>Elevating Every Journey, One Seamless Experience at a Time!</h2>
              </div>
            </div>
            <div className="row gy-4 mt-5 justify-content-center" data-aos="zoom-in" data-aos-delay="250">

              <div className="">
                <div className="icon-box">
                  <i className="ri-bar-chart-box-line"></i>
                  <h3>Search & BOOK</h3><p>First you have to search the flight then you will be able to book it.</p>

                  <button className="btn btn-success ">
                    <a href="#targetSection" style={{ fontSize: "14px", color: "white" }}>Search</a>
                  </button>

                </div>
              </div>
              
              <div className="m-4">
                <div className="icon-box">
                  <i className="ri-store-line"></i>
                  <h3>FLIGHTDETAILS</h3>
                  <Link to={"/flightdetail"}>
                    <button className="btn btn-success" style={{ fontSize: "14px" }}>
                      ViewFlights
                    </button>
                  </Link>
                </div>
              </div>

              {/* <div className="m-4">
                <div className="icon-box">
                  <i className=" ri-store-line"></i>
                  <Link to={"/Search&Edit"}>
                    <h3 className="text-white">Search & Edit Passenger</h3>
                    <button className="btn btn-success" style={{ fontSize: "14px" }}>
                      Edit
                    </button>
                  </Link>
                </div>
              </div> */}

              <div className="">
                <div className="icon-box">
                  <i className="ri-bar-chart-box-line"></i>
                  <h3>CANCEL BOOKING</h3>
                  <Link to={"/flightdetail"}>
                    <button className="btn btn-success" style={{ fontSize: "14px" }}>
                      CANCEL
                    </button>
                  </Link>
                </div>
              </div>

              <div className="">
                <div className="icon-box">
                  <i className="ri-database-2-line"></i>
                  <h3> Passenger Flight Edit</h3>
                  <Link to={"#"}>
                    <button className="btn btn-success" style={{ fontSize: "14px" }}>
                      Edit_Flight
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* //////////////////////  serach flight section */}

      <div>
        <div>
          <form onSubmit={handleSearch}>
            <div id="mydata" style={inlinecss} >
              <center>
                <h4 className="Aaa text-white" id="targetSection">Search Flight</h4>
                <table cellPadding="8" style={inlinecss2}>
                  <tbody>
                    <tr>
                      <td>
                        {/* <button type="button" className="A" onClick={hClick}>
                        Round-way Trip
                      </button> */}
                        <button type="button" className="p-1 m-0 A">
                          One-way Trip
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Origin</td>
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
                      <td>Destination</td>
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
                      <td>Departure</td>
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
                      <td colSpan="2">
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
                        navigates('/Booking', { state: { selectedFlight: flight ,selectedDate: searchCriteria.departureDate } });
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

export default UserSuccess;

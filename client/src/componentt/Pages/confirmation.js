import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar/navbar';
import Swal from "sweetalert2";
import Axios from 'axios';

const BookingConfirmation = () => {

  const navigate = useNavigate();
  const location = useLocation();
  
  
  // Check if location.state and location.state.selectedFlight are not null
  const selectedFlight = location.state?.selectedFlight || {};
  const selectedDate = location.state?.selectedDate || {};
  const formData = location.state?.formData || {};

  const PNR = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

  const savebutton = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/tickets", {
        ...formData,
        ...selectedFlight, // usersuccess data
        PNR: PNR,
        flightDuration:flightDuration,
        selectedDate:selectedDate,
      });
      console.log(response.data);

      Swal.fire("Successfull Booking!", "", "Success");
      navigate('/userSuccess');

    } catch (error) {
      console.error(error);
      Swal.fire("Error in Booking!", "", "error");
    }
  };


  ////////// CALCULATE THE FLIGHT ARIVE TOTAL TIME THAT WHICH TIME TAKEN BY FLIGHT RICH THE DESTINATION
   // Calculate flight duration
   const departureDateTime = new Date(`2000-01-01 ${selectedFlight.DepartTime}`);
   const arrivalDateTime = new Date(`2000-01-01 ${selectedFlight.ArrivalTime}`);
   const timeDifference = arrivalDateTime - departureDateTime;
   const hours = Math.floor(timeDifference / (60 * 60 * 1000));
   const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
   const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

   // Format the duration as HH:mm:ss
   const flightDuration = `${hours}:${minutes}:${seconds}`;
  return (
    <div>
      <AppNavbar />
      <div className="container" style={{ marginTop: "50px", color: "white" }}>
        <h2 >Booking Confirmation</h2>
        <p>Hello, {formData.name || 'Guest'}! Your booking for the following flight has been confirmed:</p>
        <hr />
        <div >
          {/* {data.map((item, index) => {
                return ( */}
          <div>
            {/* <center> */}
            <h3 >Flight Details</h3> <hr />
            {/* </center> */}
            <p>Your PNR number is : <strong style={{ fontFamily: "cursive" }}> {PNR}</strong></p>
            <p>Passenger Name     : <strong style={{ fontFamily: "cursive" }}> {formData.name}</strong></p>
            <p>Airplane           : <strong style={{ fontFamily: "cursive" }}> {selectedFlight.AIRLINE} </strong></p>
            <p>Airplane ID        : <strong style={{ fontFamily: "cursive" }}> {selectedFlight.FID} </strong></p>
            <p>City               : <strong style={{ fontFamily: "cursive" }}>{selectedFlight.Origin} To {selectedFlight.Destination}</strong></p>
            <p>Departure Time     : <strong style={{ fontFamily: "cursive" }}> {selectedFlight.DepartTime}</strong></p>
            <p>Arrival Time       : <strong style={{ fontFamily: "cursive" }}> {selectedFlight.ArrivalTime}</strong></p>
            <p>Flight Duration    : <strong style={{ fontFamily: "cursive" }}>{flightDuration} HH:MM:SS</strong></p>
            {/* <p>Date               : <strong style={{ fontFamily: "cursive" }}>{selectedDate} </strong></p> */}
            <p>Date               : <strong style={{ fontFamily: "cursive" }}>{new Date(selectedDate).toLocaleDateString()} MM:DD:YY</strong></p>
          </div>
          <center>
            <h3 style={{ background: 'green', padding: "5px" }}>PAYMENT : {selectedFlight[formData.fclass]}</h3> <br />
            <button type="submit" className="btn btn-success" onClick={savebutton}>BOOK</button>
          </center>

          {/* );
          })} */}
        </div> <hr />
        <p>Thank you for choosing AirEasy. Have a pleasant journey!</p>
      </div>
    </div>
  );
};

export default BookingConfirmation;

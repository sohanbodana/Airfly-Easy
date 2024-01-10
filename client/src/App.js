import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./componentt/Pages/home";
import About from "./componentt/Pages/about";
import SignUp from "./componentt/Pages/signup";
import Support from "./componentt/Pages/support";
import LogIn from "./componentt/Pages/login";
import Footer from "./componentt/Pages/footer";
import Roundtrip from "./componentt/Pages/roundtrip";
import Flightshow from "./componentt/Pages/flightshow";
import UserSuccess from "./componentt/Pages/userSuccess";
import UserNavbar from "./componentt/Navbar/userNavbar";
import Logout from "./componentt/Pages/logout";
import Booking from "./componentt/Pages/booking";
import Cancel from "./componentt/Pages/cancel";
import UserContact from "./componentt/Navbar/usercontact";
import FightDetail from "./componentt/Pages/flightdetail";
import AdminLogin from "./componentt/Admin/adminlogin";
import AdminHome from "./componentt/Admin/adminhome";
import AdminNavbar from "./componentt/Navbar/adminNavbar";
import AddFlight from "./componentt/Admin/addflights";
import AddUser from "./componentt/Admin/adduser";
import DeleteFlight from "./componentt/Admin/deleteflights";
import Deletepass from "./componentt/Admin/deletepass";
import DeleteUser from "./componentt/Admin/deleteuser";
import PassengerData from "./componentt/Admin/passengerdata";
import ViewFlights from "./componentt/Admin/viewFlights";
import SearchEdit from "./componentt/Pages/Search&Edit";
import Ticketdetail from "./componentt/Admin/tickets";
import BookingConfirmation from "./componentt/Pages/confirmation";

const App = () => {
  const [searchCriteria] = useState({
    origin: '',
    destination: '',
  });

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Support />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/roundtrip" element={<Roundtrip />} />
          <Route path="/flightshow" element={<Flightshow searchCriteria={searchCriteria} />} />
          <Route path="/userSuccess" element={<UserSuccess />} />
          <Route path="/userNavbar" element={<UserNavbar />} />

          <Route path="/Search&Edit" element={<SearchEdit/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/flightdetail" element={<FightDetail/>} />
          <Route path="/cancel" element={<Cancel/>} />
          <Route path="/usercontact" element={<UserContact/>} />

          
          <Route path="/adminlogin" element={<AdminLogin/>} />
          <Route path="/adminhome" element={<AdminHome/>} />
          <Route path="/adminNavbar" element={<AdminNavbar/>} />

          <Route path="/addflights" element={<AddFlight/>} />
          <Route path="/adduser" element={<AddUser/>} />
          <Route path="/deleteflights" element={<DeleteFlight/>} />
          <Route path="/deletepass" element={<Deletepass/>} />
          <Route path="/deleteuser" element={<DeleteUser/>} />
          <Route path="/passengerdata" element={<PassengerData/>} />
          <Route path="/viewFlights" element={<ViewFlights/>} />
          <Route path="/tickets" element={<Ticketdetail/>} />
          <Route path="/confirmation" element={<BookingConfirmation/>} />
          


          
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;

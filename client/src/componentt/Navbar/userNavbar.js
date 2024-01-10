import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../navbar.css';
const UserNavbar = () => {
  const textStyle = {
    color: 'white',
    fontSize: '15px',
  };

  return (
    <div className="navbar11">
    <Navbar bg="dark" variant="dark" expand="lg" >
      <Navbar.Brand as={Link} to={`${process.env.PUBLIC_URL}/userSuccess`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-airplane-engines-fill" viewBox="0 0 16 16">
          <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.347 4.347 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0Z" />
        </svg> AIR-EASY  <span>WELCOMEUSER</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto ">
          <Nav.Link className="hv" as={Link} to="/userSuccess" style={textStyle}><strong>Home</strong></Nav.Link>
          <Nav.Link className="hv" as={Link} to="/usercontact" style={textStyle}><strong>Contact</strong></Nav.Link>
          {/* <Nav.Link as={Link} to="/booking" style={textStyle}><strong>Booking</strong></Nav.Link> */}
          <Nav.Link className="hv" as={Link} to="/flightdetail" style={textStyle}><strong>FightDetail</strong></Nav.Link>
          <Nav.Link className="hv" as={Link} to="/cancel" style={textStyle}><strong>Cancel-Booking</strong></Nav.Link>
          <Nav.Link className="hv" as={Link} to="/Search&Edit" style={textStyle}><strong>Search_Passenger</strong></Nav.Link>
          <Nav.Link className="hv" as={Link} to="/Search&Edit" style={textStyle}><strong>Edit_Passenger</strong></Nav.Link>
          <Nav.Link className="hv" as={Link} to="/" style={textStyle}><strong>Logout </strong><i className="fas fa-user"></i></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
};

export default UserNavbar;


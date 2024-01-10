import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../Navbar/adminNavbar';
import '../adminhome.css';

class AdminHome extends React.Component {
    render() {
        return (
            <div>
                <AdminNavbar />
                <div style={{ textAlign: "center", color: 'white', backgroundColor: 'black', marginBottom: "0px", marginTop: "55px" }} >
                    <h3 style={{ display: "inline-block" }}>WELCOME ADMIN </h3>

                </div>
                <div>
                    <section id="hero" className="d-flex align-items-center justify-content-center">
                        <div className="container" data-aos="fade-up">
                            <div className="row justify-content-center ">
                                <div className="">
                                    <h1 className="font-light" >
                                        Fly Smart, Fly Swift: Your Journey, Elevated with AirEasy!<span>.</span></h1>
                                    <h2>Elevating Every Journey, One Seamless Experience at a Time!</h2>
                                </div>
                            </div>
                            <div className="row gy-4 mt-5 justify-content-center" data-aos="zoom-in" data-aos-delay="250">

                                <div className="m-4">
                                    <div className="icon-box">
                                        <i className="ri-store-line"></i>
                                        <h3>All Flights</h3>
                                        <Link to={"/addflights"}>
                                            <button className="btn btn-success" style={{ fontSize: "14px" }}>
                                                ViewFlights
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="icon-box">
                                        <i className="ri-bar-chart-box-line"></i>
                                        <h3>Ticketdetail</h3>
                                        <Link to={"/tickets"}>
                                            <button className="btn btn-success" style={{ fontSize: "14px" }}>
                                                Tickets
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="icon-box">
                                        <i className="ri-bar-chart-box-line"></i>
                                        <h3>All User</h3>
                                        <Link to={"/adduser"}>
                                            <button className="btn btn-success" style={{ fontSize: "14px" }}>
                                                ViewUsers
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="icon-box">
                                        <i className="ri-calendar-todo-line"></i>
                                        <h3>Delete_Flights</h3>
                                        <Link to={"/addflights"}>
                                            <button className="btn btn-success" style={{ fontSize: "14px" }}>
                                                Delete
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="icon-box">
                                        <i className="ri-paint-brush-line"></i>
                                        <h3>Delete_User</h3>
                                        <Link to={"/adduser"}>
                                            <button className="btn btn-success" style={{ fontSize: "14px" }}>
                                                Delete
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="icon-box">
                                        <i className="ri-database-2-line"></i>
                                        <h3>PassengerData</h3><p>Admin can be delete and edit passenger data.</p>
                                        <Link to={"/passengerdata"}>
                                            <button className="btn btn-success" style={{ fontSize: "14px" }}>
                                                PassengerData
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default AdminHome;

import React from 'react';
import AppNavbar from '../Navbar/navbar';
class About extends React.Component {
    render() {
        return (
            <div>
                <AppNavbar />

                <div style={{ marginTop: "50px", color: "white" }}>
                    <body>
                        <section class="showcase">
                            <div class="container">
                                <div class="row row1 ">
                                    <div class="img-box">
                                        {/* <img src="" alt="Image description" /> */}
                                    </div>
                                    <div class="text-box">
                                        <h2 class="lg-heading1">AirFLy Reservation System </h2>
                                        <p >The AirFLy Reservation System is a comprehensive and user-friendly web application designed to streamline the airline reservation process, 
                                            providing a seamless experience for both passengers and administrators. This project aims to enhance the efficiency and convenience of 
                                            managing flight bookings, passenger details, and overall flight operations.</p>
                                        <button class="btn btn-success">MORE</button>
                                    </div>
                                </div>

                            </div>

                        </section>



                    </body>

                </div>
            </div>
        );
    }
}

export default About;
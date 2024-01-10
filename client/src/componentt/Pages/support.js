import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../support.css';
import AppNavbar from '../Navbar/navbar';

import Swal from "sweetalert2";
import Axios from 'axios';

const Support = () => {

    const [formData, setFormData] = useState({
        NAME: '',
        EMAIL: '',
        CONTACT_NO: '',
        MESSAGE: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await Axios.post("http://localhost:3001/support", {
                NAME: formData.NAME,
                EMAIL: formData.EMAIL,
                CONTACT_NO: formData.CONTACT_NO,
                MESSAGE: formData.MESSAGE,
            });

            console.log(response.data);
            Swal.fire("Message Successfully Send", "", "success");

        } catch (error) {
            console.error(error);
            Swal.fire("Error in Sending!", "", "error");
        }


    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div>
            <AppNavbar />
            <div className="container" style={{ marginTop: "50px"}}>
                <div className="screen  ">
                    <div className="screen-header">
                        <div className="screen-header-left">
                            <div className="screen-header-button close"></div>
                            <div className="screen-header-button maximize"></div>
                            <div className="screen-header-button minimize"></div>
                        </div>
                        <div className="screen-header-right">
                            <div className="screen-header-ellipsis"></div>
                            <div className="screen-header-ellipsis"></div>
                            <div className="screen-header-ellipsis"></div>
                        </div>
                    </div>
                    <div className="screen-body ">
                        <div className="screen-body-item left">
                            <div className="app-title text-sm">
                                <span>CONTACT</span>
                                <span>US</span>
                            </div>
                            <div className="app-contact ">CONTACT INFO : +91 81 314 928 595</div>
                        </div>
                        <div className="screen-body-item ">
                            <div className="app-form">
                                <div className="app-form-group">
                                    <input
                                        id="NAME"
                                        name='NAME'
                                        type='text'
                                        placeholder='Your Name'
                                        className="app-form-control"
                                        value={formData.NAME}
                                        onChange={handleChange}

                                    />
                                </div>
                                <div className="app-form-group">
                                    <input
                                        id="EMAIL"
                                        name='EMAIL'
                                        type='text'
                                        placeholder='EMAIL'
                                        className="app-form-control"
                                        value={formData.EMAIL}
                                        onChange={handleChange}

                                    />
                                </div>
                                <div className="app-form-group">
                                    <input
                                        id="CONTACT_NO"
                                        name='CONTACT_NO'
                                        type='text'
                                        placeholder='Contact_No'
                                        className="app-form-control"
                                        value={formData.CONTACT_NO}
                                        onChange={handleChange}

                                    />
                                </div>
                                <div className="app-form-group">
                                    <input
                                        id="MESSAGE"
                                        name='MESSAGE'
                                        type='text'
                                        placeholder='type your Massege'
                                        className="app-form-control"
                                        value={formData.MESSAGE}
                                        onChange={handleChange}

                                    />
                                </div>
                                <div className="app-form-group buttons">
                                    {/* <button className="btn btn-secondary p-1 m-1">CANCEL</button> */}
                                    <button className='btn btn-primary' onClick={handleSubmit}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="credits">
                    {' '}
                    <a
                        className="credits-link"
                        href="https://dribbble.com/shots/2666271-Contact"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg className="dribbble" viewBox="0 0 200 200">
                            <g stroke="#ffffff" fill="none">
                                <circle cx="100" cy="100" r="90" strokeWidth="20"></circle>
                                <path d="M62.737004,13.7923523 C105.08055,51.0454853 135.018754,126.906957 141.768278,182.963345" strokeWidth="20"></path>
                                <path d="M10.3787186,87.7261455 C41.7092324,90.9577894 125.850356,86.5317271 163.474536,38.7920951" strokeWidth="20"></path>
                                <path d="M41.3611549,163.928627 C62.9207607,117.659048 137.020642,86.7137169 189.041451,107.858103" strokeWidth="20"></path>
                            </g>
                        </svg>
                        SOHAN BODANA
                    </a>
                </div>
            </div>
        </div>
    );
}


export default Support;

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import '../Tables.css';
import AppNavbar from "../Navbar/navbar";


const Flightshow = ({searchCriteria}) => {
  const [data, setData] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const response = await Axios.get(`http://localhost:3001/flightshow?origin=${searchCriteria.origin}&destination=${searchCriteria.destination}`);
      console.log('Response data:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching available flights:', error.message);
    }
  }, [searchCriteria]);
  
  useEffect(() => {
    console.log('Search criteria:', searchCriteria);
    loadData();
  }, [searchCriteria, loadData]);
  
  console.log('Data:', data);

  const { id } = useParams();


  return (
    <div>
      <AppNavbar />
      <div className="bg-pic " style={{marginTop:"50px" }}>
        <button
          style={{ width: "50%", visibility: "hidden" }}
          className="btn btn-client"
        ></button>
        <div className="table-responsive">
          <table className="styled-table">
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
              {data.map((item, index) => {
                return (
                  <tr style={{ backgroundColor: "white" }} key={index}>
                    <td>{item.AirId}</td>
                    <td>{item.departT}</td>
                    <td>{item.arrivalT}</td>
                    <td>{item.AIRLINE}</td>
                    <td>{item.Origin}</td>
                    <td>{item.Destination}</td>
                    <td>{item.FirstClass}</td>
                    <td>{item.BusinessClass}</td>
                    <td>{item.PremiumEconomyClass}</td>
                    <td>{item.EconomyClass}</td>
                    
                    <td>
                      <Link
                        to={
                          id > 0
                            ? `/Invoice/${item.schedule_id + id}`
                            : "/login"
                        }
                      >
                        <button
                          className={
                            id > 0 ? "btn btn-book" : "btn btn-login"
                          }
                          style={{ fontSize: "18px" }}
                        >
                          {id > 0 ? "Book" : "Login"}
                        </button>
                        
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default Flightshow;

const express = require('express');
const cors = require('cors');
// const mysql = require('mysql');         
const mysql = require('mysql2');             // promises support
// const bcrypt = require('bcrypt');

const util = require('util');   // for edit passengers



const app = express();
const port = 3001;

app.use(cors());                           //////////API MIDDLEWARE 
app.use(express.json());
const bodyParser = require('body-parser');
const { randomInt } = require('crypto');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12243648',
  database: process.env.DB_NAME || 'airfly',
});

// API endpoint to fetch flights based on origin and destination
// app.get('/flightshow', (req, res) => {
//   const { origin, destination } = req.query;

//   const query = 'SELECT * FROM flightshow WHERE Origin = ? AND Destination = ?';

//   // Use the connection from the pool
//   db.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error getting MySQL connection:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }

//     // Use the connection to query the database
//     connection.query(query, [origin, destination], (err, results) => {
//       // Release the connection back to the pool
//       connection.release();

//       if (err) {
//         console.error('Error fetching flights:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         res.json(results);
//       }
//     });
//   });
// });

///////////////////////////////////////////////////////API - ENDPOINT   OR ROUTS

////////////////////////////  SEACHFLIGHTS  USER
app.post('/searchFlights', (req, res) => {
  try {
    const { origin, destination } = req.body;
    const query = `
      SELECT FID, AIRLINE, DepartTime, ArrivalTime, Origin, Destination, FirstClass, BusinessClass, PremiumEconomyClass, EconomyClass FROM flightshow
      WHERE Origin = ? AND Destination = ?;
    `;

    db.query(query, [origin, destination], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
/////////////////////////////// //  SIGNUP      IT'S SAVE USER , NAME, EMAIL, AND PASSWORD.

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Insert a new user into the MySQL database with plain text password
  const sql = 'INSERT INTO signup (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting into MySQL:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(201).json({ message: 'User registered successfully' });
  });
});




// Signup                                     PASSWORD SAVE AS A ENCRYPTED
// app.post('/signup', (req, res) => {
//   const { name, email, password } = req.body;

//   // Hash the password before storing it
//   bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
//     if (hashErr) {
//       console.error('Error hashing password:', hashErr);
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     // Insert a new user into the MySQL database
//     const sql = 'INSERT INTO signup (name, email, password) VALUES (?, ?, ?)';
//     db.query(sql, [name, email, hashedPassword], (err, results) => {
//       if (err) {
//         console.error('Error inserting into MySQL:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }

//       res.status(201).json({ message: 'User registered successfully' });
//     });
//   });
// });

//// Login user

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM signup WHERE email = ? and password=? ';
  db.query(sql, [email, password], async (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    }
  });
});

//// Login Admin
// we are storing plain text passwords in your database (which is not recommended for security reasons), you don't need to use bcrypt.compare during login.
app.post('/adminlogin', (req, res) => {
  const { username, password } = req.body;

  // Fetch user from the database based on the provided username and plain text password
  const sql = 'SELECT * FROM admin WHERE Username = ? AND Password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    }
  });
});




/////  flightsearch

app.get("/flightshow", (req, res) => {
  // const sqlGet="select id, AIRLINE,DepartTime,ArrivalTime, ,DepartTime, ArrivalTime ,Origin ,Destination ,FirstClass, BusinessClass ,PremiumEconomyClass, EconomyClass from flightshow;"

  const sqlGet = "select * from flightshow;"
  db.query(sqlGet, (err, result) => {
    if (err)
      res.send({ err: err });
    else
      res.send(result);
  })

})

////////////  USING INPUT FIELD SEARCHING FLIGHT DETAILS (FID/ AIRLINE / CITY)

app.post('/searchTicketShow', (req, res) => {
  
  try {
    const { origin } = req.body;
    // const origin = '1005';
    const query = `SELECT FID ,DepartTime,ArrivalTime,AIRLINE,Origin,Destination,FirstClass,BusinessClass,PremiumEconomyClass,EconomyClass FROM flightshow WHERE  FID= ? OR AIRLINE=? OR Origin=? OR Destination=?; `;

    db.query(query, [origin,origin,origin,origin], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

////////////  USING INPUT FIELD SEARCHING USERS DETAILS 

app.post('/searchUserShow', (req, res) => {
  
  try {
    const { origin } = req.body;
    // const origin = '1005';
    const query = `SELECT id ,name,email,password FROM SIGNUP WHERE  ID= ? OR NAME=? OR EMAIL=? ; `;

    db.query(query, [origin,origin,origin], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

//////////////////  Show ALL passenger Data

app.get("/passengerdata", (req, res) => {

  const sqlGet = "select * from bookings;"
  db.query(sqlGet, (err, result) => {
    if (err)
      res.send({ err: err });
    else
      res.send(result);
  })

})

//////////  Paasenger data Delete 

app.delete("/PassengerDelete/:PNR", (req, res) => {
  const fid = req.params.PNR;
  db.query("DELETE FROM bookings WHERE PNR = ?", [fid], (err, result) => {
    if (err) {
      console.error("Error deleting flight:", err);
      res.status(500).json({ err: "Error deleting flight" });
    } else {
      console.log("Flight deleted successfully");
      res.status(200).json({ success: true });
    }
  });
});



// /////////////////  passenger data edit
/////// Edit passenger

app.put('/passengerdata/:PNR', async (req, res) => {
  const PNR = parseInt(req.params.PNR);
  const updatedPassenger = req.body;

  try {
    // Check if passenger exists
    const queryAsync = util.promisify(db.query).bind(db);
    const [existingPassenger] = await queryAsync('SELECT * FROM bookings WHERE PNR = ?', [PNR]);

    if (existingPassenger.length === 0) {
      res.status(404).json({ err: 'Passenger not found' });
      return;
    }
    // Update passenger data
    await db.promise().query('UPDATE bookings SET ? WHERE PNR = ?', [updatedPassenger, PNR]);

    res.json({ ...existingPassenger[0], ...updatedPassenger });
  } catch (error) {
    console.error('Error editing passenger:', error);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});




//////////  flight delete

app.delete("/deleteflight/:fid", (req, res) => {
  const fid = req.params.fid;
  db.query("DELETE FROM flightshow WHERE FID = ?", [fid], (err, result) => {
    if (err) {
      console.error("Error deleting flight:", err);
      res.status(500).json({ err: "Error deleting flight" });
    } else {
      console.log("Flight deleted successfully");
      res.status(200).json({ success: true });
    }
  });
});





/////////////              USER SERACH 

app.get("/searchuser", (req, res) => {
  // const sqlGet="select id, AIRLINE,DepartTime,ArrivalTime, ,DepartTime, ArrivalTime ,Origin ,Destination ,FirstClass, BusinessClass ,PremiumEconomyClass, EconomyClass from flightshow;"

  const sqlGet = "select * from SIGNUP;"
  db.query(sqlGet, (err, result) => {
    if (err)
      res.send({ err: err });
    else
      res.send(result);
  })
})

///////////// user delete
app.delete("/deleteuser/:id", (req, res) => {
  const fid = req.params.id;
  db.query("DELETE FROM SIGNUP WHERE ID = ?", [fid], (err, result) => {
    if (err) {
      console.error("Error deleting USER:", err);
      res.status(500).json({ err: "Error deleting USER" });
    } else {
      console.log(" User delete successfully");
      res.status(200).json({ success: true });
    }
  });
});




//////////////booking  passenger data save   BOOKINGS

app.post('/bookings', (req, res) => {
  const { name, age, gender, address, state, email, contact, fclass } = req.body;

  // Insert a new booking into the MySQL database
  // console.log('Received Gender:', gender);
  // console.log('Received FClass:', fclass);

  const sql = 'INSERT INTO bookings (name, age, gender, address, state, email, contact, fclass) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, age, gender, address, state, email, contact, fclass], (err, results) => {
    if (err) {
      console.error('Error inserting into MySQL:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(201).json({ message: 'Passenger successfully added to bookings' });
  });
});


/////////////////////////  4:20  02/12/23  both mixed data saved passengers and flights
// app.post('/tickets', (req, res) => {
//   try {

//     const PNR=Math.floor(Math.random()*(3000-1000+1))+;

//     const { name, age, email, contact, FID, AIRLINE, DepartTime, ArrivalTime, Origin, Destination, fclass, gender, address, state } = req.body;

//     const sql1 = 'INSERT INTO ticket (PNR,name, age, email, contact, FID, AIRLINE, DepartTime, ArrivalTime, Origin, Destination, Fclass) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
//     db.query(sql1, [PNR,name, age, email, contact, FID, AIRLINE, DepartTime, ArrivalTime, Origin, Destination, fclass], (err, results1) => {
//       if (err) {
//         console.error('Error inserting into ticket table:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }
//       console.log("Ticket added successfully");

//       // Double query for passenger info

//       const sql2 = 'INSERT INTO bookings (PNR,name, age, gender, address, state, email, contact, Fclass) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)';
//       db.query(sql2, [PNR,name, age, gender, address, state, email, contact, fclass], (err, results2) => {
//         if (err) {
//           console.error('Error inserting into bookings table:', err);
//           return res.status(500).json({ error: 'Internal server error' });
//         }
//         console.log("Passenger info added successfully");

//         res.status(201).json({ message: 'Passenger successfully added to bookings' });
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
app.post('/tickets', (req, res) => {
  try {
    // Generate a single PNR for both tables

    const { PNR,name, age, email, contact, FID, AIRLINE, DepartTime, ArrivalTime, Origin, Destination, fclass, gender, address, state,flightDuration,selectedDate } = req.body;

    const sql1 = 'INSERT INTO ticket (PNR, name, age, email, contact, FID, AIRLINE, DepartTime, ArrivalTime, Origin, Destination, Fclass,flight_duration,FDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql1, [PNR, name, age, email, contact, FID, AIRLINE, DepartTime, ArrivalTime, Origin, Destination, fclass,flightDuration,selectedDate], (err, results1) => {
      if (err) {
        console.error('Error inserting into ticket table:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log("Ticket added successfully");

      // Insert into bookings table with the same PNR
     

      const sql2 = 'INSERT INTO bookings (PNR, name, age, gender, address, state, email, contact, Fclass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(sql2, [PNR, name, age, gender, address, state, email, contact, fclass], (err, results2) => {
        if (err) {
          console.error('Error inserting into bookings table:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        console.log("Passenger info added successfully");

        res.status(201).json({ message: 'Passenger successfully added to bookings' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





/////////////    AFTER BOOKING WHEN USER SEARCH FLIGHTS  (SHOW USER FLIGHT USING NAME CONTACT)

app.post('/searchTicket', (req, res) => {
  
  try {
    const { origin } = req.body;
    // const origin = '1001';
    const query = `SELECT PNR ,name,age,email,contact,FID,AIRLINE,DepartTime,ArrivalTime,Origin,Destination,FClass,flight_duration,FDate FROM TICKET WHERE PNR = ? OR name=? OR email=? OR contact=?;`;

    db.query(query, [origin,origin,origin,origin], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});


/////////////  SEARCH PASSENEGER DETAILS USING PNR NAME & EMAIL
app.post('/SearchPassengerUsingInput', (req, res) => {
  
  try {
    const { origin } = req.body;
    // const origin = '1001';
    const query = `SELECT PNR, name, age, gender, address, state, email, contact, Fclass FROM bookings WHERE PNR = ? OR name=? OR email=?; `;

    db.query(query, [origin,origin,origin], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});


/////// show ticket details

app.get("/searchTicketShow", (req, res) => {

  const sqlGet = "select * from ticket;"
  db.query(sqlGet, (err, result) => {
    if (err)
      res.send({ err: err });
    else
      res.send(result);
  })

})


// app.post('/userflightdetail', async (req, res) => {
//   try {
//     const { name, contact } = req.body;

//     // Perform a database query to get all bookings based on name and contact
//     const bookingQuery = `SELECT * FROM bookings WHERE name = ? AND contact = ?`;
//     const [connection] = await pool.promise().getConnection();
//     const bookingResults = await connection.query(bookingQuery, [name, contact]);
//     connection.release();
    
//     if (bookingResults.length === 0) {
//       return res.status(404).json({ message: 'No booking found for the given name and contact.' });
//     }

//     const userFlights = [];

//     // Iterate through each booking and get corresponding flight details
//     for (const booking of bookingResults) {                       //loop
//       const flightId = booking.FID;
//       const flightQuery = `SELECT * FROM flightshow WHERE FID = ?`;
//       const flightResult = await connection.query(flightQuery, [flightId]);

//       if (flightResult.length > 0) {
//         userFlights.push({
//           bookingData: booking,
//           flightshowData: flightResult[0],
//         });
//       }
//     }

//     if (userFlights.length === 0) {
//       return res.status(404).json({ message: 'No flightshow data found for the given bookings.' });
//     }

//     res.status(200).json(userFlights);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });


///////////////////////////  Cancle booking ==> delect passender info and fight info
app.delete("/cancelbooking/:PNR", (req, res) => {
  const PNR = req.params.PNR;
  db.query("DELETE FROM ticket WHERE PNR = ?", [PNR], (err, result) => {
    if (err) {
      console.error("Error deleting flight:", err);
      res.status(500).json({ err: "Error deleting flight" });
    } else {
      console.log("Flight deleted successfully");
      res.status(200).json({ success: true });
    }
  });
});




/////////////////// ADD FLIGHTS
app.post("/addflights", (req, res) => {
  const { FID, AIRLINE, DepartTime, ArrivalTime, Origin, Destination, FirstClass, BusinessClass, PremiumEconomyClass, EconomyClass } = req.body;
  const sqlInsert = 'INSERT INTO flightshow VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(sqlInsert, [
    FID,
    AIRLINE,
    DepartTime,
    ArrivalTime,
    Origin,
    Destination,
    FirstClass,
    BusinessClass,
    PremiumEconomyClass,
    EconomyClass],
    (err, result) => {
      if (err) {
        console.error("Error inserting into database:", err);
        res.status(500).send("Error inserting into database");
      } else {
        console.log("Flight added successfully");
        res.status(200).send("Flight added successfully");
      }
    }
  );
});


///////////////// ADD USER
app.post("/adduserdata", (req, res) => {
  const { id, name, email, password } = req.body;
  const sqlInsert = 'INSERT INTO SIGNUP VALUES ( ?, ?, ?, ?)';

  db.query(sqlInsert, [
    id, name, email, password
  ],
    (err, result) => {
      if (err) {
        console.error("Error inserting into database:", err);
        res.status(500).send("Error inserting into database");
      } else {
        console.log("Flight added successfully");
        res.status(200).send("Flight added successfully");
      }
    }
  );


});


/////////////////  CONTACT US   SUPPORT.JS ********************************

app.post("/support", (req, res) => {
  const { NAME, EMAIL, CONTACT_NO, MESSAGE } = req.body;
  const sqlquery = 'INSERT INTO ContactUs (NAME ,EMAIL, CONTACT_NO,MESSAGE) VALUES (?,?,?,?)';
  db.query(sqlquery, [NAME, EMAIL, CONTACT_NO, MESSAGE], (err, result) => {
    if (err) {
      console.error("Error inserting contact", err);
      res.status(500).send("Error Inserting into database");
    } else {
      console.log("Massege Send successfully");
      res.status(200).send("Massege added successfully");
    }
  });

});

/////////  
// Release the connection when done
db.getConnection((err, dbConnection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
    dbConnection.release();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





///////////////////REST API
//  Representational State Transfer(REST) is an architectural style
//  that defines a set of constraints to be used for creating web services
//   .REST API is a way of accessing web services in a simple and flexible way without having any processing.

//     Working: A request is sent from client to server in
//       the form of a web URL as HTTP GET or POST or PUT or DELETE request.After that,
//         a response comes back from the server in the form of a resource which can be anything
//   like HTML, XML, Image, or JSON.But now JSON is the most popular format being used in Web Services.


//   In HTTP there are five methods that are commonly used in a REST - based Architecture
// i.e., POST, GET, PUT, PATCH, and DELETE.These correspond to create, read, update, and delete (or CRUD) operations respectively.
// There are other methods which are less frequently used like OPTIONS and HEAD.

//   GET: The HTTP GET method is used to read(or retrieve) a representation of a resource.In the safe path,
//      GET returns a representation in XML or JSON and an HTTP response code of 200(OK).In an error case,
//       it most often returns a 404(NOT FOUND) or 400(BAD REQUEST).

//   POST: The POST verb is most often utilized to create new resources.In particular, it’s used to create subordinate resources.That is, subordinate to some other(e.g.parent) resource.On successful creation, return HTTP status 201, returning a Location header with a link to the newly - created resource with the 201 HTTP status.
//       NOTE: POST is neither safe nor idempotent.

//   PUT: It is used for updating the capabilities.However, PUT can also be used to create a resource in the case where the resource ID is chosen by the client instead of by the server.In other words, if the PUT is to a URI that contains the value of a non - existent resource ID.On successful update, return 200(or 204 if not returning any content in the body) from a PUT.If using PUT for create, return HTTP status 201 on successful creation.PUT is not safe operation but it’s idempotent.

//   PATCH: It is used to modify capabilities.The PATCH request only needs to contain the changes to the resource, not the complete resource.This resembles PUT, but the body contains a set of instructions describing how a resource currently residing on the server should be modified to produce a new version.This means that the PATCH body should not just be a modified part of the resource, but in some kind of patch language like JSON Patch or XML Patch.PATCH is neither safe nor idempotent.

//  DELETE: It is used to delete a resource identified by a URI.On successful deletion, return HTTP status 200(OK) along with a response body.


//               Idempotence: An idempotent HTTP method is a HTTP method that can be called many times without different outcomes.It would not matter if the method is called only once, or ten times over.The result should be the same.Again, this only applies to the result, not the resource itself. 
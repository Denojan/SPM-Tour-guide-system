require('dotenv').config();
const express = require("express");
const cors = require("cors");
require("../db/loadEnvironment");
const corsOptions = require('../config/corsOptions');
const { logger } = require('../middleware/logEvents');
const errorHandler = require('../middleware/errorHandler');
const verifyJWT = require('../middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('../middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('../config/dbConn');
const favouritePlaceRoute = require("../routes/favouritePlaceRoutes");
const packageRoute = require("../routes/packageRoutes"); 
const wishListRoutes = require("../routes/wishListRoute"); 
const placesRoutes = require("../routes/placesRoute"); 
const axios = require('axios');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();
//const expressReactViews = require('express-react-views');



connectDB()

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));

console.log("server");
app.use("/favplace", favouritePlaceRoute);
app.use("/package", packageRoute);
app.use("/wishlist",wishListRoutes);
app.use("/places",placesRoutes);

app.use('/', require('../routes/root'));
app.use('/register', require('../routes/register'));
app.use('/auth', require('../routes/auth'));
app.use('/emp', require('../routes/auth'));
app.use('/refresh', require('../routes/refresh'));
app.use('/logout', require('../routes/logout'));

app.get('/api/places', async (req, res) => {
  try {
    console.log('gg')
    const { lat, lon, radius, apiKey } = req.query;
    console.log(lat);
    console.log(lon);
    console.log(radius);
    console.log(apiKey);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&key=${apiKey}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/place', async (req, res) => {
  try {
    console.log('s')
    const { name, key } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=${key}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.use(verifyJWT);

app.use('/users', require('../routes/api/users'));
app.use('/getUsers', require('../routes/api/users'));
app.use('/deleteUser', require('../routes/api/users'));
app.use('/updatepass', require('../routes/api/users'));





app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

app.use(errorHandler);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

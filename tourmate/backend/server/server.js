const express = require("express");
const cors = require("cors");
require("../db/loadEnvironment");
const connectDB = require("../db/conn.js");
const favouritePlaceRoute = require("../routes/favouritePlaceRoutes");


const PORT = process.env.PORT || 8080;
const app = express();
connectDB()
app.use(cors());
app.use(express.json());

console.log("server");
app.use("/favplace", favouritePlaceRoute);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

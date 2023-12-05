const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
dotenv.config();

const Port = process.env.PORT || 3001;
//create server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
//connect to database
connectDB();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api", require("./routes/income"));

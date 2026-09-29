require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const vehicleRoutes = require("./routes/vehicleRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");


const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes); 
app.use("/api/upload", uploadRoutes);
app.get("/", (req, res) => {
  res.send("Go Scrap API Running...");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
});
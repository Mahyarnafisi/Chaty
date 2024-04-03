import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);

//app.get("/", (req, res) => {
//  res.send("<h1>the server is running in port 3000</h1>");
//});
//

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("connected to server" + PORT);
});

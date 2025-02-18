import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
const app = express();
// Connect to MongoDB
await connectDB();
app.get("/", (req, res) => {
  res.send("Hello from TypeScript Express!");
});

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
export default app;

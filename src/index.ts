import express from "express";
const port = process.env.PORT || 3000; // Default port to listen

const app = express(); // Create an express application
app.get("/", (req, res) => {
    res.send("Hello World!");

}); // Define a route handler for the default home page
app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`);
});
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
require("./Models/db");
const TaskRouter = require("./Routes/TaskRouter");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', TaskRouter);

app.listen(PORT, () => {
    console.log("Server is running at port", PORT);
})
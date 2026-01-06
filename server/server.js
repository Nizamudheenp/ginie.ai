const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT
const connectDB = require('./config/db');
connectDB();

const app = express();

app.use(express.json());
app.use(cors());


app.listen(port, ()=> console.log(`app listening at port: ${port}`));
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cors = require('cors');
const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGDB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());


const startServer = () => {
    connectDB(MONGDB_URI)
    .then((connection) => {
        console.log('Database connected successfully');
        app.listen(PORT,() => {
            console.log('Server Started')
        })
    })
    .catch((err) => {
        console.log(err);
    });
};

startServer();
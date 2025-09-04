const express = require('express');
const app = express();
const products = require('./routes/productRoutes');
const error = require('./middlewares/error');
const users = require('./routes/userRoutes');
const order = require('./routes/orderRoutes');
const payment = require('./routes/paymentRoutes')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,'config','config.env')});

app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend origin
  credentials: true               // Allow cookies/auth headers if needed
}));
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )


app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/',products);
app.use('/api/v1/',users);
app.use('/api/v1/',order);
app.use('/api/v1/',payment);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


app.use(error);

module.exports = app;
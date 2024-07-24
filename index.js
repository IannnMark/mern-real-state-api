const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

dotenv.config();

mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
        console.log(err);
    });

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server listening on port 3000');
}
);

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

//Middleware to handle possible errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
}); 
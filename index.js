const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');

dotenv.config();

mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
        console.log(err);
    });

const app = express();

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
}
);

app.use('/api/user', userRoutes);
const User = require('../models/user');
const brcyptjs = require('bcryptjs');

exports.signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = brcyptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json('User created successfully');
    } catch (err) {
        next(err);
    }
};
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workouts: { type: Array, default: [] }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
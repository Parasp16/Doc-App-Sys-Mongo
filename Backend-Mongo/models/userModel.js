const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    imagePath: { type: String },
    role: {
        type: String,
        enum: ['User', 'Admin', 'Doctor'],
        default: 'User'
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)
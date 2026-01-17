const mongoose = require('mongoose')

const doctorApplySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('doctorApply', doctorApplySchema)

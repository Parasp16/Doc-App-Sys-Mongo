const express = require('express')
const { auth, admin } = require('../middleware/auth')
const {
    getDoctorRequests,
    updateDoctorStatus
} = require('../controllers/adminController')

const router = express.Router()

// Pending doctor requests
router.get('/doctor-requests', auth, admin, getDoctorRequests)

// Approve / Reject
router.post('/update-doctor-status', auth, admin, updateDoctorStatus)

module.exports = router

const express = require('express')
const { auth, admin } = require('../middleware/auth')
const {
  getDoctorRequests,
  updateDoctorStatus
} = require('../controllers/adminController')

const router = express.Router()

router.get('/doctor-requests', auth, admin, getDoctorRequests)
router.post('/update-doctor-status', auth, admin, updateDoctorStatus)

module.exports = router

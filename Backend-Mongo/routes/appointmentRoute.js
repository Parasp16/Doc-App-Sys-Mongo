const express = require('express')
const { auth, doctor, admin } = require('../middleware/auth')
const {
  createAppointment,
  getUserAppointments,
  getDoctorAppointments,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
  deleteAppointmentByDoctor,
   adminUpdateAppointment,      
  adminDeleteAppointment   
} = require('../controllers/appointmentController')

const router = express.Router()

// USER ROUTES
router.post('/create', auth, createAppointment)
router.get('/user', auth, getUserAppointments)
router.put('/update/:id', auth, updateAppointment)
router.delete('/delete/:id', auth, deleteAppointment)

// DOCTOR ROUTES
router.get('/doctor', auth, doctor, getDoctorAppointments)
router.put('/status/:id', auth, doctor, updateAppointmentStatus)
router.delete('/doctor/delete/:id', auth, doctor, deleteAppointmentByDoctor)

router.put('/admin/update/:id', auth, admin, adminUpdateAppointment)
router.delete('/admin/delete/:id', auth, admin, adminDeleteAppointment)

module.exports = router

const express = require('express')
const { auth } = require('../middleware/auth')
const { applyDoctor } = require('../controllers/doctorController')

const router = express.Router()

router.post('/apply-doctor', auth, applyDoctor)

module.exports = router

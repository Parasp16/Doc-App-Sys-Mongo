const express =  require('express')
const userController = require('../controllers/userController')
const { auth, admin } = require('../middleware/auth')
const upload = require('../middleware/multer')
const { applyDoctor } = require('../controllers/doctorController')
const router = express.Router()



router.post('/register', upload.single('userImage'),userController.register)
router.post('/login',userController.login)
router.get('/getUserInfo',auth, userController.getUserInfo)
router.get('/doctorList',auth, userController.doctorList)
router.post('/apply-doctor', auth, applyDoctor)
router.put('/update-profile-image', auth, upload.single('image'), userController.updateProfileImage)
// router.put('/updateUser', auth, upload, userController.updateUser)
router.get('/allUsers', auth, admin, userController.getAllUsers)

module.exports = router
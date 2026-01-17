const DoctorApply = require('../models/doctorApplyModel')
const User = require('../models/userModel')

const getDoctorRequests = async (req, res) => {
    try {
        const requests = await DoctorApply
            .find({ status: 'pending' })
            .populate('userId', 'name email')

        res.status(200).send({
            success: true,
            data: requests
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: "server error" })
    }
}

const updateDoctorStatus = async (req, res) => {
    try {
        const { requestId, status } = req.body

        const request = await DoctorApply.findById(requestId)
        if (!request) {
            return res.status(404).send({ msg: "Request not found" })
        }

        request.status = status
        await request.save()

        if (status === 'approved') {
            await User.findByIdAndUpdate(request.userId, {
                role: 'Doctor'
            })
        }

        res.status(200).send({
            success: true,
            msg: `Doctor request ${status}`
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: "server error" })
    }
}

module.exports = {
    getDoctorRequests,
    updateDoctorStatus
}


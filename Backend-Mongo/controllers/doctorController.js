const DoctorApply = require('../models/doctorApplyModel')

const applyDoctor = async (req, res) => {
    try {
        const { speciality, fees } = req.body

        const newRequest = await DoctorApply.create({
            userId: req.user.id,
            speciality,
            fees
        })

        res.status(201).send({
            msg: "Doctor application submitted",
            success: true,
            data: newRequest
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: "server error" })
    }
}

module.exports = { applyDoctor }

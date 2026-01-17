const Appointment = require('../models/appointmentModel')

const createAppointment = async (req, res) => {
    try {
        const { doctorId, dateTime } = req.body

        if (!doctorId || !dateTime) {
            return res.status(400).send({ msg: "doctorId and dateTime required" })
        }

        const appointment = await Appointment.create({
            userId: req.user.id,
            doctorId,
            dateTime: new Date(dateTime)
        })

        res.status(201).send({
            success: true,
            msg: "Appointment created",
            data: appointment
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: "server error" })
    }
}



const getUserAppointments = async (req, res) => {
    try {
        const appointments = await Appointment
            .find({ userId: req.user.id })
            .populate('doctorId', 'name email imagePath')
            .sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            appointments
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: "server error" })
    }
}

const getDoctorAppointments = async (req, res) => {
    try {
        const appointments = await Appointment
            .find({ doctorId: req.user.id })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            appointments
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: "server error" })
    }
}


const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params
        const { dateTime } = req.body

        const appointment = await Appointment.findOneAndUpdate(
            { _id: id, userId: req.user.id }, // 🔐 user check
            { dateTime },
            { new: true }
        )

        if (!appointment) {
            return res.status(404).send({ msg: "Appointment not found" })
        }

        res.send({
            success: true,
            msg: "Appointment updated",
            appointment
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: "server error" })
    }
}


const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params

        const appointment = await Appointment.findOneAndDelete({
            _id: id,
            userId: req.user.id // 🔐 user check
        })

        if (!appointment) {
            return res.status(404).send({ msg: "Appointment not found" })
        }

        res.send({
            success: true,
            msg: "Appointment cancelled"
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: "server error" })
    }
}

const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const appointment = await Appointment.findOneAndUpdate(
            {
                _id: id,
                doctorId: req.user.id   // 🔐 doctor ownership check
            },
            { status },
            { new: true }
        )

        if (!appointment) {
            return res.status(404).send({ msg: "Appointment not found" })
        }

        res.send({
            success: true,
            msg: `Appointment ${status}`,
            appointment
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: "server error" })
    }
}

const deleteAppointmentByDoctor = async (req, res) => {
  try {
    const { id } = req.params

    const appointment = await Appointment.findOneAndDelete({
      _id: id,
      doctorId: req.user.id   // 🔐 doctor ownership check
    })

    if (!appointment) {
      return res.status(404).send({
        success: false,
        msg: "Appointment not found"
      })
    }

    res.send({
      success: true,
      msg: "Appointment deleted by doctor"
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: "server error" })
  }
}



// ADMIN: update appointment
const adminUpdateAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const { dateTime } = req.body

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { dateTime },
      { new: true }
    )

    if (!appointment) {
      return res.status(404).send({ success: false, msg: "Appointment not found" })
    }

    res.send({
      success: true,
      msg: "Appointment updated by admin",
      appointment
    })
  } catch (error) {
    res.status(500).send({ msg: "server error" })
  }
}

const adminDeleteAppointment = async (req, res) => {
  try {
    const { id } = req.params

    const appointment = await Appointment.findByIdAndDelete(id)
    if (!appointment) {
      return res.status(404).send({ success: false, msg: "Appointment not found" })
    }

    res.send({
      success: true,
      msg: "Appointment cancelled by admin"
    })
  } catch (error) {
    res.status(500).send({ msg: "server error" })
  }
}



module.exports = {
  createAppointment,
  getUserAppointments,
  getDoctorAppointments,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
  deleteAppointmentByDoctor,
  adminUpdateAppointment,
  adminDeleteAppointment
}

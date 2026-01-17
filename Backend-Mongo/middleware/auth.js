const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ msg: "No token provided" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).send({ msg: "Invalid token" })
  }
}

const doctor = (req, res, next) => {
  if (req.user && req.user.role === "Doctor") {
    next()
  } else {
    return res.status(403).send({ msg: "Doctor access only" })
  }
}

const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next()
  } else {
    return res.status(403).send({ msg: "Admin access only" })
  }
}

module.exports = { auth, doctor, admin }

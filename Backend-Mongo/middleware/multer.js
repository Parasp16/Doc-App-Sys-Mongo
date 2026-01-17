const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const fileFilter = (req,file,cb)=>{
    const allowedTypes = ['image/jpg','image/jpeg','image/png']

    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error("file type not valid"), false)
    }
} 


const upload = multer({storage,fileFilter})

module.exports =  upload
import multer, { diskStorage } from "multer"
import { extname } from "path"

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname))
  },
})

const upload = multer({ storage: storage })

export default upload

 
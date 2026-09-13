import multer from "multer"
import fs from "fs"
import path from "path"

const uploadDir = path.join(process.cwd(), "uploads")
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir)
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname) || ".jpg"
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
        cb(null, unique)
    },
})

const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true)
    } else {
        cb(new Error("Only image files are allowed"))
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
})

export default upload
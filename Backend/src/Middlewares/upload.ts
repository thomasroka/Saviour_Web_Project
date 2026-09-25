import multer from "multer"

const allowedImageTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
])

const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (allowedImageTypes.has(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Use a JPG, PNG, WEBP, GIF, or AVIF image"))
    }
}

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024, files: 1 },
})

export default upload

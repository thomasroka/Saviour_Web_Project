import { Router } from 'express'
import { adminSignin, addDoctor, getDoctors, deleteDoctor, uploadImage } from '../controllers/admin.js'
import { auth } from '../Middlewares/authMiddleWare.js'
import upload from '../Middlewares/upload.js'

const router = Router()

router.post('/signin', adminSignin)
router.post('/upload', auth, upload.single('image'), uploadImage)
router.post('/doctor', auth, addDoctor)
router.get('/doctor', auth, getDoctors)
router.delete('/doctor/:id', auth, deleteDoctor)

export default router
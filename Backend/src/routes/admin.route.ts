import { Router } from 'express'
import { adminSignin, addDoctor, getDoctors, updateDoctor, deleteDoctor, uploadImage } from '../controllers/admin.js'
import { auth, adminOnly } from '../Middlewares/authMiddleWare.js'
import upload from '../Middlewares/upload.js'

const router = Router()

router.post('/signin', adminSignin)
router.post('/upload', auth, adminOnly, upload.single('image'), uploadImage)
router.post('/doctor', auth, adminOnly, addDoctor)
router.get('/doctor', auth, adminOnly, getDoctors)
router.put('/doctor/:id', auth, adminOnly, updateDoctor)
router.delete('/doctor/:id', auth, adminOnly, deleteDoctor)

export default router
import { Router } from 'express'
import { getDoctors } from '../controllers/admin.js'

const router = Router()

router.get('/', getDoctors)

export default router

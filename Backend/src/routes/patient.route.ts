import { Router } from 'express'
import { patientinfo, getPatients, cancelAppointment } from '../controllers/patient.js'

const router = Router()

router.post('/', patientinfo)
router.get('/', getPatients)
router.delete('/:id', cancelAppointment)

export default router

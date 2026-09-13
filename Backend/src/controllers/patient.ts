import type { Request, Response } from 'express'
import Patient from '../models/Patient.js'

export const patientinfo = async (req: Request, res: Response) => {
    try {
        const { name, dob, email, phone, age, appointmentdate, address, gender, doctorId } = req.body

        if (!name || !email || !phone) {
            res.status(400).json({
                message: 'Name, email, and phone number are required'
            })
            return
        }

        // Calculate age from dob if age is not provided but dob is
        let calculatedAge = age ? Number(age) : undefined
        if (!calculatedAge && dob) {
            const birthDate = new Date(dob)
            if (!isNaN(birthDate.getTime())) {
                const diffYears = new Date().getFullYear() - birthDate.getFullYear()
                calculatedAge = diffYears > 0 ? diffYears : undefined
            }
        }

        const patientData: Record<string, any> = {
            name,
            email,
            phone,
            age: calculatedAge || 0,
            appointmentdate: appointmentdate || new Date().toISOString(),
            address: address || "Not specified",
            gender: gender || "other",
        }

        if (req.userId) patientData.userId = req.userId
        if (doctorId) patientData.doctorId = doctorId
        if (dob) patientData.dob = dob

        const patient = await Patient.create(patientData)

        res.status(201).json({
            message: 'Appointment booked successfully and patient details saved',
            patient,
        })
    } catch (e: any) {
        console.error('Error saving patient info:', e)
        res.status(500).json({
            message: e?.message || 'Server error while saving patient information'
        })
    }
}

export const getPatients = async (req: Request, res: Response) => {
    try {
        const { email, userId } = req.query
        const filter: Record<string, any> = {}

        if (email) {
            filter.email = String(email).trim()
        } else if (userId) {
            filter.userId = String(userId)
        } else if (req.userId) {
            filter.$or = [{ userId: req.userId }, { email: req.query.email }]
        }

        const patients = await Patient.find(filter)
            .populate('doctorId')
            .populate('userId')
            .sort({ createdAt: -1 })

        res.json({
            message: 'Patients retrieved successfully',
            patients
        })
    } catch (e: any) {
        console.error('Error fetching patients:', e)
        res.status(500).json({
            message: 'Server error'
        })
    }
}

export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const patient = await Patient.findByIdAndDelete(id)
        if (!patient) {
            res.status(404).json({
                message: 'Appointment not found'
            })
            return
        }

        res.json({
            message: 'Appointment cancelled successfully',
            patient
        })
    } catch (e: any) {
        console.error('Error cancelling appointment:', e)
        res.status(500).json({
            message: 'Server error'
        })
    }
}
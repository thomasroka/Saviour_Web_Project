import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
interface myJwtPayload {
    userId: string
}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        const token = (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null) || req.cookies?.adminToken || req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: 'No token provided'
            })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as myJwtPayload
        req.userId = decoded.userId
        next();
    } catch (e) {
        res.status(401).json({
            message: 'Invalid token or expired token'
        })
    }
}

export const adminOnly = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Authentication required' })
            return
        }

        const user = await User.findById(req.userId).select('role')
        if (!user || user.role !== 'admin') {
            res.status(403).json({ message: 'Access denied. Admin only' })
            return
        }

        next()
    } catch (e) {
        res.status(500).json({ message: 'Server error' })
    }
}
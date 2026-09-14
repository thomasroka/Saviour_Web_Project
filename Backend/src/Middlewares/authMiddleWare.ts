import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
interface myJwtPayload {
    userId: string
}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        const token = (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null) || req.cookies?.token;

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
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
interface myJwtPayload {
    userId: string
}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.json({
                message: 'No token Provided'
            })
        }
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token!, process.env.SECRET_KEY!) as myJwtPayload
        req.userId = decoded.userId
        next();
    } catch (e) {
        res.status(401).json({
            message: 'Invalid token or expired token'
        })

    }

}
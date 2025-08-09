import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Request, Response, NextFunction} from 'express';
dotenv.config();
const JWT_USER_SECRET: string | undefined = process.env.JWT_USER_SECRET;

function userMiddleware(req: Request,res: Response,next: NextFunction){
  const token = req.headers["authorization"];
  if(!JWT_USER_SECRET || !token){
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }
    const decoded = jwt.verify(token, JWT_USER_SECRET) as { id: string };
  if(!decoded){
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }else{
    req.user = decoded.id;
    next();
  }
}

export default userMiddleware;
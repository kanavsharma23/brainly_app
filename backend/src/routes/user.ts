import {Router} from 'express';
const userRouter = Router();
import {z} from 'zod';
import bcrypt from 'bcrypt';
import { userModel } from '../db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_USER_SECRET: string | undefined= process.env.JWT_USER_SECRET;

userRouter.post('/signup', async (req,res) => {
  const {username, password} = req.body;

  const userSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(6),
  })
  const validation = userSchema.safeParse({username, password});

  if(!validation.success){
    res.status(400).json({
      message: 'Invalid input',
    })
    return;
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  if(!hashedPassword){
    res.status(500).json({
      message: 'Error hashing password',
    });
    return;
  }
  try{
    await userModel.create({
      username: username,
      password: hashedPassword,
    });
    res.status(201).json({
      message: 'User created successfully',
    });
  }catch(e){
    res.status(500).json({
      message: 'Error creating user',
    });
    return;
  }
})


userRouter.post('/signin', async (req,res) => {
  const {username, password} = req.body;
  const userSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(6),
  })
  const validation = userSchema.safeParse({username, password});
  if(!validation.success){
    res.status(400).json({
      message: 'Invalid input',
    })
    return;
  }

  try{
    const user = await userModel.findOne({
      username: username,
    });
    if(!user){
      res.status(404).json({
        message: 'Invalid credentials',
      });
      return;
    }

    const hashedPassword = await bcrypt.compare(password, user.password);
    if(!hashedPassword){
      res.status(401).json({
        message: 'Invalid Credentials',
      });
      return;
    }
    if(!JWT_USER_SECRET){
      res.status(500).json({
        message: 'Server error',
      });
      return;
    }
    const token = jwt.sign({
      id: user._id,
    }, JWT_USER_SECRET);

    res.status(200).json({
      message: 'User signed in successfully',
      token: token,
    });

  }catch(e){
    res.status(500).json({
      message: 'Error finding user',
    });
    return;
  }
})

export {userRouter};


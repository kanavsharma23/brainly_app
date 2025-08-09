import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

import {userRouter} from './routes/user';
import {contentRouter} from './routes/content';
import {shareRouter} from './routes/share';

const MONGO_URL: string | undefined = process.env.MONGO_URL;



app.use(express.json());

app.use('/api/v1', userRouter);
app.use('/api/v1', contentRouter);
app.use('/api/v1', shareRouter);


async function main(){
  if(!MONGO_URL) {
    console.error('MONGO_URL is not defined in .env file');
    return;
  }
  await mongoose.connect(MONGO_URL);
  app.listen(3000);
  console.log('Server is running on port 3000');
}

main();

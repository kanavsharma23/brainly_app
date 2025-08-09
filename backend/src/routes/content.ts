import Router from 'express';
const contentRouter = Router();
import {z} from 'zod';
import { contentModel } from '../db';
import userAuth from '../middleware/userAuth';


contentRouter.get('/content', userAuth,async (req: any,res: any) => {
  try{
    const userId = req.user;
    const contents = await contentModel.find({userId: userId}).populate('userId', 'username');
    res.status(200).json(contents);
  }catch(e){
    res.status(500).json({
      message: 'Error fetching content',
    });
  }
});

contentRouter.post('/content', userAuth, async (req: any, res: any) => {
  const { link, type, title, tags} = req.body;
  const userId = req.user;

  const contentSchema = z.object({
    link: z.string(),
    type: z.enum(['image', 'video', 'article', 'audio']).optional(),
    title: z.string().min(1),
    tags: z.array(z.string()).optional(),
  });

  const validation = contentSchema.safeParse({ link, type, title, tags });
  if (!validation.success) {
    return res.status(400).json({
      message: 'Invalid content data',
    });
  }

  try{
    const content = await contentModel.create({
      link: link,
      type: type,
      title: title,
      tags: tags,
      userId: userId,
    });
    res.status(201).json({
      message: 'Content created successfully',
      content: content,
    });

  }catch(e){
    res.status(500).json({
      message: 'Error creating content',
    });
    return;
  }

});

contentRouter.delete('/content', userAuth, async (req: any, res: any) => {
  const {title} = req.body;
  const userId = req.user;

  if (!title) {
    return res.status(400).json({
      message: 'Title is required to delete content',
    });
  }
  try {
      await contentModel.deleteOne({
        title: title,
        userId: userId,
      });  
    res.status(200).json({
      message: 'Content deleted successfully',
    });
  } catch (e) {
    res.status(500).json({
      message: 'Error deleting content',
    });
  }
});

export { contentRouter };
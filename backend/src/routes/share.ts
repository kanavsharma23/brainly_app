import {Router} from 'express';
const shareRouter = Router();
import userAuth from '../middleware/userAuth';
import { linkModel, userModel, contentModel } from '../db';



shareRouter.post('/share', userAuth,async (req: any,res: any) => {


  try{
    const userId = req.user;

    const link = await linkModel.findOne({
      userId: userId,
    });

    if(!link){
      return res.status(404).json({
        message: 'No share link found for this user',
      });
    }
    res.status(200).json({
      message: 'Share link found',
      link: link.hash,
    });
  }catch(e){
    res.status(500).json({
      message: 'Error sharing content',
    });
  }
});

shareRouter.get('/:sharelink', async (req: any, res: any) => {
  try{
    const shareLink = req.params.sharelink;
    const link = await linkModel.findOne({
      hash: shareLink,
    });
    if(!link){
      return res.status(404).json({
        message: 'Share link not found',
      });
    }
    const user = await userModel.findOne({
      _id: link.userId,
    });

    const content = await contentModel.findOne({
      userId: link.userId,
    });

    if(!link || !user || !content){
      return res.status(404).json({
        message: 'Share link not found',
      });
    }
    res.status(200).json({
      message: 'Share link found',
      user: {
        username: user.username,
        userId: user._id,
        content: content,
      },
      shareLink: link.hash,
    });

  }catch(e){
    res.status(500).json({
      message: 'Error fetching shared content',
    });
  }


});

export { shareRouter };
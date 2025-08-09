import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});
const userModel = mongoose.model('User', userSchema);

const tagSchema = new mongoose.Schema({
  title: {type: String, required: true},
});
const tagModel = mongoose.model('Tag', tagSchema);

const contentTypes = ['image', 'video', 'article', 'audio'];
const contentSchema = new mongoose.Schema({
  link: {type: String, required: true, unique: true},
  type: {type: String, enum: contentTypes},
  title: {type: String, required: true, unique: true},
  tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});
const contentModel = mongoose.model('Content', contentSchema);

const linkSchema = new mongoose.Schema({
  hash: {type: String, required: true, unique: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});
const linkModel = mongoose.model('Link', linkSchema);

export { userModel, tagModel, contentModel, linkModel };


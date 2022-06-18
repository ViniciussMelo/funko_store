import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/funkodb');
mongoose.Promise = global.Promise;

export { mongoose };
import { Schema } from 'mongoose';
import { mongoose } from '../database';

const funko = new Schema({
  description: {
    type: String,
    require: true
  },
  value: {
    type: Number,
    require: true
  },
  url: {
    type: String,
    require: true
  },
  sale: {
    type: Boolean,
    require: true
  }
})

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  funkos: [funko]
});

const User = mongoose.model('User', UserSchema);
export { User };
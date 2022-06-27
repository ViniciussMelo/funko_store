import { Request, Response } from "express";
import { User } from "../models/User";

class UserController {
  async create(request: Request, response: Response) {
    const { name, user, password } = request.body;

    const userCreated = await User.create({
      name,
      user,
      password
    });

    return response.json({
      user: userCreated
    });
  }

  async index(request: Request, response: Response) {
    const users = await User.find();

    return response.json(users);
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const user = await User.findOne({ _id: id});
    
    if (!user) {
      return response.status(400).json({ msg: 'User does not exist!' });
    }

    return response.json(user);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const user = await User.findOne({ _id: id });
    
    if (!user) {
      return response.status(400).json({ msg: 'User does not exist!' });
    }

    await User.deleteOne({ _id: id });

    return response.send();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const findUser = await User.findOne({ _id: id});
    
    if (!findUser) {
      return response.status(400).json({ msg: 'User does not exist!' });
    }
    
    const { name, user, password } = request.body;

    findUser.name = name;
    findUser.user = user;
    findUser.password = password;
    
    await findUser.save();

    return response.send();
  }
}

export default UserController;
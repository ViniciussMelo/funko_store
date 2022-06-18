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
}

export default UserController;
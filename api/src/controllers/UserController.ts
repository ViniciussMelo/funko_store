import { Request, Response } from "express";
import { User } from "../models/user";

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
}

export default UserController;
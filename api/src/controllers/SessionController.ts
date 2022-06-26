import { Request, Response } from "express";
import { User } from "../models/User";

class SessionController {
  async verify(request: Request, response: Response) {
    const { username: user, password } = request.body;
    
    const findUser = await User.findOne({ user, password });

    if (!findUser) {
      return response.status(401).json({ msg: 'Invalid user!' })
    }

    return response.json({
      userId: findUser._id,
    });
  }
}

export { SessionController }
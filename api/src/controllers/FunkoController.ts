import { Request, Response } from "express";
import { Types } from "mongoose";
import { User } from "../models/User";
import { deleteFile } from "../utils/file";

class FunkoController {
  async create(request: Request, response: Response) {
    try {
      const { description, value, sale, userId } = request.body;
      
      if (!request.file) {
        throw new Error('Invalid image!');
      }
      const funko_file = request.file.filename;
      
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid userId');
      }

      const user = await User.findOne({ _id: userId });

      if (!user) {
        throw new Error('User does not exist!');
      }

      const funkos = user.funkos || []
      
      user.funkos = [...funkos, {
        description,
        value,
        url: funko_file,
        sale
      }];

      await user.save();

      return response.send();
    } catch(error) {
      if (request.file) {
        await deleteFile(request.file.filename);
      }

      const msg = error instanceof Error ? error.message : 'Internal error';

      return response.status(400).json({ msg });
    }
  }

  async index(request: Request, response: Response) {
    const users = await User.find();

    const userFunkos = [] as any;

    users.forEach((user) => {
      if (user.funkos) {
        const funkos = [] as any;

        user.funkos.forEach((funko) => funkos.push(funko));

        userFunkos.push({
          id: user._id,
          name: user.name,
          funkos
        })
      }
    });

    return response.json(userFunkos);
  }
}

export { FunkoController };
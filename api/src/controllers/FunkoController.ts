import { Request, Response } from "express";
import { Types } from "mongoose";

import { User } from "../models/User";
import { deleteFile } from "../utils/file";

interface FunkoInterface {
  _id: string;
  description: string;
  sale: boolean;
  url: string;
  value: Number;
}

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

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid id');
    }

    const userFunko = await User.findOne({ 'funkos._id': id });
    
    if (!userFunko || !userFunko.funkos) {
      return response.status(400).json({ msg: 'Funko does not exist!' });
    }

    const funkos = userFunko.funkos as unknown as Array<FunkoInterface>;
    const funko = funkos.find((funko) => funko._id == id);

    return response.json({
      id: userFunko._id,
      name: userFunko.name,
      funko
    });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { description, value, sale, userId } = request.body;

    const userFunko = await User.findOne({ 'funkos._id': id});
    if (!userFunko || !userFunko.funkos) {
      return response.status(400).json({ msg: 'Funko does not exist!' });
    }

    if (userFunko._id != userId) {
      return response.status(400).json({ msg: 'Cannot change the user!' });
    }

    const funkos = userFunko.funkos as unknown as Array<FunkoInterface>;
    const funko = funkos.find((funko) => funko._id == id) as FunkoInterface;

    if (funko.url && request.file) {
      deleteFile(funko.url);
      funko.url = request.file.filename;
    }

    funko.description = description;
    funko.value = value;
    funko.sale = sale;

    await userFunko.save();

    return response.send();
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const user = await User.findOne({ 'funko._id': id });

    if (!user) {
      return response.status(400).json({ msg: 'Funko does not exist!' });
    }

    const funkos = user.funkos as unknown as Array<FunkoInterface>;
    const funkoIndex = funkos.findIndex((funko) => funko._id == id);
    const funko = funkos[funkoIndex] as unknown as FunkoInterface;

    deleteFile(funko.url);
    user.funkos = funkos.filter((funko) => funko._id != id);

    await user.save();

    return response.send();
  }
}

export { FunkoController };
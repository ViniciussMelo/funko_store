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

    const funkos = userFunko.funkos as unknown as Array<FunkoInterface>;
    const funko = funkos.find((funko) => funko._id == id) as FunkoInterface;

    if (userId !== userFunko._id) {
      let oldFunkos = userFunko.funkos as unknown as Array<FunkoInterface>;
      oldFunkos= oldFunkos.filter((funko: FunkoInterface) => funko._id !== id);

      const newUserFunko = await User.findOne({ _id: userId});

      if (!newUserFunko) {
        return response.status(400).json({ msg: 'User does not exist!' });
      }

      const funkos = [...newUserFunko.funkos || [], {
        description,
        value,
        sale,
      }];

      newUserFunko.funkos = funkos;

      await newUserFunko.save();
    } else {
      funko.description = description;
      funko.value = value;
      funko.sale = sale;
    }
    await userFunko.save();

    return response.send();
  }

  async updateImage(request: Request, response: Response) {
    const { id, userId } = request.body;
    const userFunko = await User.findOne({ 'funkos._id': id});
    
    if (!userFunko || !userFunko.funkos) {
      return response.status(400).json({ msg: 'Funko does not exist!' });
    }

    const funkos = userFunko.funkos as unknown as Array<FunkoInterface>;
    const funko = funkos.find((funko) => funko._id == id) as FunkoInterface;

    if (!request.file) {
      throw new Error('Invalid image!');
    }

    if (funko.url) {
      deleteFile(funko.url);
      funko.url = request.file.filename
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new Error('User does not exist!');
    }

    funko.url = request.file.filename;
    console.log(userFunko)
    await userFunko.save();
  }
}

export { FunkoController };
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

class UserController {
  async create(request: Request, response: Response) {
    const prismaClient = new PrismaClient();
    const { name, user, password } = request.body;

    await prismaClient.$connect();
    const post = await prismaClient.users.create({
      data: {
        name,
        user,
        password,
      }
    });
    await prismaClient.$disconnect();

    return response.json({
      user: post
    });
  }
}

export default UserController;
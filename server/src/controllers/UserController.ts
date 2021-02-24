import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async create(request: Request, response: Response) {
    let { name, email } = request.body;

    name = name.toUpperCase();
    email = email.toLowerCase().trim();

    // extencion repository typeorm
    const userRepository = getRepository(User);

    // search user fur email
    const userAlreadyExists = await userRepository.findOne({ email });

    // check if the email already exists
    if (userAlreadyExists) {
      return response.status(409).json({
        error: "Usuário já existente com esse e-mail!"
      });
    }

    // create obj user
    const user = userRepository.create({
      name,
      email,
    });

    // save data to the database
    await userRepository.save(user);

    return response.json(user);
  }
}

export { UserController }
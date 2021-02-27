import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
  async create(request: Request, response: Response) {
    let { name, email } = request.body;

    name = name?.toUpperCase();
    email = email?.toLowerCase().trim();

    // validation
    const schema = yup.object().shape({
      name: yup.string().required("O nome é obrigatório"),
      email: yup.string().email("E-mail inválido").required("o e-mail é obrigatório")
    });

    try {
      await schema.validate(request.body);
    } catch (err) {
      throw new AppError(err.message);
    }

    // extencion custom repository
    const userRepository = getCustomRepository(UsersRepository);

    // search user fur email
    const userAlreadyExists = await userRepository.findOne({ email });

    // check if the email already exists
    if (userAlreadyExists) {
      throw new AppError("Usuário já existente com esse e-mail!", 409);
    }

    // create obj user
    const user = userRepository.create({
      name,
      email,
    });

    // save data to the database
    await userRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController }
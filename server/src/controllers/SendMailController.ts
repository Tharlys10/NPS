import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";


class SendMailController {
  async execute(request: Request, response: Response) {
    const { user_id, survey_id } = request.body;

    // extencion custom repositorys
    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // user existence check
    const userAlreadyExists = await usersRepository.findOne({ id: user_id });

    if (!userAlreadyExists) {
      return response.status(400).json({
        error: "Usuário não encontrado!"
      });
    }

    //  survey existence check
    const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id });

    if (!userAlreadyExists) {
      return response.status(400).json({
        error: "Pesquisa não encontrada!"
      });
    }

    // save informations
    const surveyUser = await surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id: surveyAlreadyExists.id
    });;

    await surveysUsersRepository.save(surveyUser);

    // send mail nps

    return response.json(surveyUser)
  }
}

export { SendMailController }
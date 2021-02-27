import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { su_id } = request.query;

    // extencion repository
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // check survey user
    const surveyUser = await surveysUsersRepository.findOne({ id: String(su_id) });

    if (!surveyUser) {
      throw new AppError("Pesquisa não encontrada!");
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }

}

export { AnswerController }
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
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
      return response.status(400).json({
        error: "Pesquisa não encontrada!"
      });
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
  
}

export { AnswerController }
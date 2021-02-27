import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

/**
 * Detratores => 0 - 6
 * Passivos => 7 - 8
 * Promotores => 9 - 10
 */

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    })

    const detractor = (await surveysUsers).filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const passive = (await surveysUsers).filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const promoters = (await surveysUsers).filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const totalAnswers = (await surveysUsers).length;

    const calculateNps = ((promoters - detractor) / totalAnswers) * 100;

    return response.json({
      detractor,
      passive,
      promoters,
      totalAnswers,
      nps: Number(calculateNps.toFixed(2))
    })
  }
}

export { NpsController }
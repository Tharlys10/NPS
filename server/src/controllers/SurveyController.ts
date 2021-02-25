import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveyConstroller {
  async show(resquest: Request, response: Response) {
    const { page, amount } = resquest.query

    const skip = !Number(page) || Number(page) <= 0 ? 0 : Number(page) - 1
    const take = !Number(amount) || Number(amount) <= 0 ? 10 : Number(amount)

    console.log(skip, take);
    
    // extencion custom repository
    const surveysRepository = getCustomRepository(SurveysRepository);

    const [ surveys, count ] = await surveysRepository.findAndCount(
      {
        skip,
        take
      }
    );

    response.json({ surveys, count })
  };

  async create(resquest: Request, response: Response) {
    let { title, description } = resquest.body;

    title = title?.toUpperCase();

    // extencion custom repository
    const surveysRepository = getCustomRepository(SurveysRepository);

    // create obj survey
    const survey = surveysRepository.create({
      title,
      description
    });

    // save survey
    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  };
}

export { SurveyConstroller }
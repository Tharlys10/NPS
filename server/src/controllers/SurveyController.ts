import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";


class SurveyController {
  async show(request: Request, response: Response) {
    const { page, amount } = request.query

    const skip = !Number(page) || Number(page) <= 0 ? 0 : Number(page) - 1
    const take = !Number(amount) || Number(amount) <= 0 ? 10 : Number(amount)

    // extension custom repository
    const surveysRepository = getCustomRepository(SurveysRepository);

    const [surveys, count] = await surveysRepository.findAndCount(
      {
        skip,
        take
      }
    );

    response.json({ surveys, count })
  };

  async create(request: Request, response: Response) {
    let { title, description } = request.body;

    title = title?.toUpperCase();

    // validation
    const schema = yup.object().shape({
      title: yup.string().required("O titulo é obrigatório"),
      description: yup.string().required("A descrição é obrigatória")
    });

    try {
      await schema.validate(request.body);
    } catch (err) {
      throw new AppError(err.message);
    }

    // extension custom repository
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

export { SurveyController }
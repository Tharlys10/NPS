import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from "path";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailNpsService from "../services/SendMailNpsService";
import { AppError } from "../errors/AppError";
import * as yup from 'yup'


class SendMailController {
  async execute(request: Request, response: Response) {
    const { user_id, survey_id } = request.body;

    // validation
    const schema = yup.object().shape({
      user_id: yup.string().required("O usuário é obrigatório"),
      survey_id: yup.string().required("A pesquisa é obrigatória")
    });

    try {
      await schema.validate(request.body);
    } catch (err) {
      throw new AppError(err.message);
    }

    // extension custom repository's
    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // user existence check
    const user = await usersRepository.findOne({ id: user_id });

    if (!user) {
      throw new AppError("Usuário não encontrado!");
    }

    //  survey existence check
    const survey = await surveysRepository.findOne({ id: survey_id });

    if (!survey) {
      throw new AppError("Pesquisa não encontrada!");
    }

    // mounting email information
    const path = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const variables = {
      id: "",
      name: user.name,
      title: survey.title,
      description: survey.description,
      link: process.env.URL_MAIL
    }

    // survey user existence check
    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ["user", "survey"]
    })

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;

      await SendMailNpsService.execute(user.email, survey.title, variables, path);

      return response.json(surveyUserAlreadyExists)
    }

    // save information
    const surveyUser = await surveysUsersRepository.create({
      user_id: user.id,
      survey_id: survey.id
    });;

    await surveysUsersRepository.save(surveyUser);

    // send mail nps
    variables.id = surveyUser.id;

    await SendMailNpsService.execute(user.email, survey.title, variables, path);

    return response.json(surveyUser)
  }
}

export { SendMailController }
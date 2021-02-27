import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveyConstroller } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

// extencion controllers
const userController = new UserController();
const surveyConstroller = new SurveyConstroller();
const sendMailController = new SendMailController();

// definitions routes
// users
router.post("/users/create", userController.create);

// surveys
router.get("/surveys/show", surveyConstroller.show);
router.post("/surveys/create", surveyConstroller.create);

// surveys users
router.post("/surveys/users/send/main/execute", sendMailController.execute);

export { router }
import { Router } from 'express';
import { SurveyConstroller } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

// extencion controllers
const userController = new UserController();
const surveyConstroller = new SurveyConstroller();

// definitions routes
// users
router.post("/users/create", userController.create);

// surveys
router.get("/surveys/show", surveyConstroller.show);
router.post("/surveys/create", surveyConstroller.create);

export { router }
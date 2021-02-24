import { Router } from 'express';
import { UserController } from './controllers/UserController';

const router = Router();

// extencion controllers
const userController = new UserController();

// definitions routes
router.post("/users/create", userController.create);

export { router }
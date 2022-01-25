import { Router } from "express";

import {
  CreateUserController
} from "../modules/accounts/UseCases/createUser/CreateUserController";

const usersRoutes = Router()

const createUserUseCaseController = new CreateUserController()

usersRoutes.post('/', createUserUseCaseController.handle)

export { usersRoutes }

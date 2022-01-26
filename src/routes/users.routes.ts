import { Router } from "express";
import multer from 'multer';

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import {
  CreateUserController
} from "../modules/accounts/UseCases/createUser/CreateUserController";
import {
  UpdateUserAvatarController
} from "../modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router()
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserUseCaseController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserUseCaseController.handle)

usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
  async (request, response) => {
    return response.json({ ok: true });
  },
);

export { usersRoutes }

import multer from "multer";
import express from "express";

import uploadConfig from "./config/uploadConfig";
import { FunkoController } from "./controllers/FunkoController";
import UserController from "./controllers/UserController"

const userController = new UserController();
const funkoController = new FunkoController();

const uploadFunkoImg = multer(uploadConfig);

const routes = express.Router();

routes.post('/user', userController.create);
routes.get('/user', userController.index);

routes.post('/funko', uploadFunkoImg.single("funko"), funkoController.create);

routes.use('/image/funko', express.static(`${uploadConfig.tmpFolder}`));

export default routes;
import multer from "multer";
import express from "express";

import uploadConfig from "./config/uploadConfig";
import { FunkoController } from "./controllers/FunkoController";
import UserController from "./controllers/UserController"
import { SessionController } from "./controllers/SessionController";

const sessionController = new SessionController();
const funkoController = new FunkoController();
const userController = new UserController();

const uploadFunkoImg = multer(uploadConfig);

const routes = express.Router();

routes.post('/login', sessionController.verify);

routes.delete('/user/:id', userController.delete);
routes.get('/user/:id', userController.getById);
routes.put('/user/:id', userController.update);
routes.post('/user', userController.create);
routes.get('/user', userController.index);

routes.post('/funko', uploadFunkoImg.single("funko"), funkoController.create);
routes.put('/funko/:id', uploadFunkoImg.single("funko"), funkoController.update);
routes.get('/funko/:id', funkoController.getById);
routes.delete('/funko/:id', funkoController.delete);
routes.get('/funko', funkoController.index);

routes.use('/image/funko', express.static(`${uploadConfig.tmpFolder}`));

export default routes;
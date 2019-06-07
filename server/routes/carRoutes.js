import express from 'express';
import multipart from 'connect-multiparty';

// eslint-disable-next-line import/extensions
import carMiddleWare from '../Middleware/carMiddleware';
import carController from '../Controller/carController';

const multipartMiddleware = multipart();
const router = express.Router();

router.post('/', [multipartMiddleware, carMiddleWare.canWrite], carController.createCar);

router.get('/', carMiddleWare.hasToken, carController.getCars);


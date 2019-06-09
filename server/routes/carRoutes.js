import express from 'express';
import multipart from 'connect-multiparty';

// eslint-disable-next-line import/extensions
import carMiddleWare from '../Middleware/carMiddleware';
import carController from '../Controller/carController';

const multipartMiddleware = multipart();
const router = express.Router();

router.post('/', [multipartMiddleware, carMiddleWare.canWrite], carController.createCar);

router.get('/', carMiddleWare.hasToken, carController.getCars);

router.patch('/:id/status', [carMiddleWare.canWrite, carMiddleWare.isOwner], carController.updateCarStatus);

router.patch('/:id/price', [carMiddleWare.canWrite, carMiddleWare.isOwner], carController.updateCarPrice);

router.get('/:id', carMiddleWare.canWrite, carController.getCar);

export default router;
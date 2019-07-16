import express from 'express';
import flagMiddleWare from '../Middleware/flagMiddleware';
import flagController from '../Controller/flagController';

const router = express.Router();

const {
  canWrite,
  validateFlagProps,

} = flagMiddleWare;

const {
  flag,
} = flagController;

router.post('/', [canWrite, validateFlagProps], flag);

export default router;

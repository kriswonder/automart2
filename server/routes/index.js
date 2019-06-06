import express from 'express';
import controller from '../Controller/user';
import authMiddleWare from '../Middleware/authMiddleware';

const router = express.Router();


router.post('/signup', authMiddleWare.loggedIn, controller.signUp);

export default router;

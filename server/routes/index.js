import express from 'express';
import controller from '../Controller/user';
import authMiddleWare from '../Middleware/authMiddleware';

const router = express.Router();


router.post('/signup', authMiddleWare.loggedIn, controller.signUp);

router.post('/signin', authMiddleWare.loggedIn, controller.signIn);

router.post('/:email/resetPassword', authMiddleWare.loggedIn, controller.resetPassword);


export default router;

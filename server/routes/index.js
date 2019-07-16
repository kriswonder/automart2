import express from 'express';

import AuthMiddleware from '../Middleware/authMiddleware';
import AuthController from '../Controller/user';

const router = express.Router();
const {
  signUp,
  signIn,
  getUsers,
  resetPassword,
  updateStatus,
  deleteUser,
} = AuthController;

const {
  loggedIn,
  validateSignUpProps,
  validateSignInProps,
  resetMapper,
  canWrite,
  canDelete,
  isAdmin,
} = AuthMiddleware;


router.post('/signup', [loggedIn, validateSignUpProps], signUp);

router.post('/signin', [loggedIn, validateSignInProps], signIn);

router.get('/users', canWrite, isAdmin, getUsers);

router.patch('/:id/status', canWrite, isAdmin, updateStatus);

router.post('/:email/resetPassword', resetMapper, resetPassword);

router.delete('/', [canWrite, canDelete], deleteUser);


export default router;

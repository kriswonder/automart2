import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import authHelpers from '../Helpers/user';
import ApiError from '../error/ApiError';
import userRepository from '../repository/userRepository';

dotenv.config();

export default class AuthController {
  static async signUp(req, res, next) {
    const {
      firstName, lastName, email, address, password, confirmPassword,
    } = req.body;

    try {
      authHelpers.validatePropsSignUp(req.body);
      authHelpers.validateSignUpPasswords(password, confirmPassword);

      const hashedPassword = await authHelpers.hashPassWord(password);
      const userData = [firstName, lastName, email, hashedPassword, address];
      const result = await userRepository.save(userData);
      const user = result.rows[0];

      const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '24h' });

      res.status(201).json({
        status: 201,
        message: `${user.firstName} ${user.lastName} Created`,
        data: {
          token,
          ...user,
        },
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        next(new ApiError(409, 'Resource Conflict', ['User already exist']));
      }
      next(error);
    }
  }

  static async signIn(req, res, next) {
    const {
      email, password,
    } = req.body;
    try {
      authHelpers.validatePropsSignIn(req.body);
      authHelpers.authenticate(email, password, (error, user) => {
        if (error || !user) {
          next(error);
        } else {
          const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '24h' });
          res.status(200).json({
            status: 200,
            message: `Welcome ${user.firstName} ${user.lastName}`,
            data: {
              token,
              ...user,
            },
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

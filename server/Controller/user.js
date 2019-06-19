import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ApiError from '../error/ApiError';
import userRepository from '../repository/userRepository';
import authHelpers from '../Helpers/user';

dotenv.config();
export default class UserController {
  static signUp(req, res, next) {
    try {
      const errors = authHelpers.validatePropsSignUp(req.body);
      if (errors.length > 0) {
        throw new ApiError(400, 'Bad Request', errors);
      } else if (req.body.password !== req.body.confirmPassword) {
        throw new ApiError(400, 'Bad Request', ['passwords don\'t match']);
      }
      const hashedPassword = userRepository.hashPassWord(req.body.password);
      const user = userRepository.save(req.body, hashedPassword);
      const token = jwt.sign({ id: user.id },
        process.env.SECRET_KEY, { expiresIn: '24h' });
      res.status(201).json({
        status: 201,
        message: `${user.firstName} ${user.lastName} Created`,
        data: {
          token,
          id: user.id, // id of newly created user
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address,
        },
      });
    } catch (error) {
      next(error);
    }
  }


  static signIn(req, res, next) {
    try {
      const errors = authHelpers.validatePropsSignIn(req.body);
      if (errors.length > 0) {
        throw new ApiError(400, 'Bad Request', errors);
      } else {
        // eslint-disable-next-line consistent-return
        userRepository.authenticate(req.body.email, req.body.password, (error, user) => {
          try {
            if (error || !user) {
              throw new ApiError(401, 'Unauthorized', ['Wrong password or email']);
            }
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
            res.status(200).json({
              status: 200,
              message: `Welcome ${user.firstName} ${user.lastName}`,
              data: {
                token,
                id: user.id, // user id
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              },
            });
          } catch (err) {
            next(err);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

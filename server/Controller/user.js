import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authHelpers from '../Helpers/user';
import ApiError from '../error/ApiError';
import userRepository from '../repository/userRepository';
import MessageHelpers from '../Helpers/messageHelpers';
import EmailHelpers from '../Helpers/emailHelpers';

dotenv.config();

export default class controller {
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

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });

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
          const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
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


  static async resetPassword(req, res, next) {
    if ((req.query.token
     && req.body.password
     && req.body.confirmPassword)
     && (req.body.password === req.body.confirmPassword)) {
      authHelpers.authenticate(req.params.email,
        req.query.token, (error, user) => {
          if (error || !user) {
            next(error);
          } else {
            const hashedPassword = authHelpers.hashPassWord(req.body.password);
            const updatedResult = userRepository.updatePassword(user.id, hashedPassword);
            updatedResult.then((result) => {
              try {
                const details = MessageHelpers.resetSuccess(result.rows[0]);
                EmailHelpers.sendMailMethod(details);
              } catch (err) {
                next(err);
              }
              res.status(200).json({
                status: 200,
                message: 'Success',
                data: {
                  message: 'Password reset successful',
                },
              });
            }).catch((err) => {
              console.log(err);
              next(new ApiError(417, 'Expectation failed', ['Password could not be updated try again']));
            });
          }
        });
    } else if ((req.body.password
    && req.body.newPassword)) {
      authHelpers.authenticate(req.params.email,
        req.body.password, (error, user) => {
          if (error || !user) {
            next(error);
          } else {
            const hashedPassword = authHelpers.hashPassWord(req.body.newPassword);
            const updatedResult = userRepository.updatePassword(user.id, hashedPassword);
            updatedResult.then((result) => {
              try {
                const details = MessageHelpers.resetSuccess(result.rows[0]);
                EmailHelpers.sendMailMethod(details);
              } catch (err) {
                next(err);
              }
              res.status(200).json({
                status: 200,
                message: 'Success',
                data: {
                  message: 'Password reset successful',
                },
              });
            }).catch((err) => {
              console.log(err);
              next(new ApiError(417, 'Expectation failed', ['Password could not be updated try again']));
            });
          }
        });
    } else {
      const emailQuery = await userRepository.findByEmail(req.params.email);
      if (emailQuery.rows.length > 0) {
        const user = emailQuery.rows[0];
        const token = jwt.sign({ id: user.id, password: user.password }, process.env.SECRET_KEY, { expiresIn: '24h' });
        const hashedPassword = await authHelpers.hashPassWord(token);
        const updatedResult = userRepository.updatePassword(user.id, hashedPassword);
        updatedResult.then((result) => {
          try {
            const details = MessageHelpers.resetPassword(result.rows[0], token);
            EmailHelpers.sendMailMethod(details);
            res.status(200).json({
              status: 200,
              message: 'Success',
              data: {
                message: 'Password reset mail sent',
              },
            });
          } catch (error) {
            next(error);
          }
        }).catch((error) => {
          console.log(error);
          next(new ApiError(417, 'Expectation failed', ['Password could not be updated try again']));
        });
      } else {
        console.log('not found');
      }
    }
  }
}

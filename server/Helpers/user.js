/* eslint-disable import/no-named-as-default-member */
import bcrypt from 'bcrypt';
// eslint-disable-next-line import/no-named-as-default-member
// eslint-disable-next-line import/no-named-as-default
import userRepository from '../repository/userRepository';
import ApiError from '../error/ApiError';

export default class AuthUtil {
  static hashPassWord(password) {
    return bcrypt.hashSync(password, 10);
  }

  // eslint-disable-next-line consistent-return
  static async authenticate(email, password, callback) {
    const emailQuery = await userRepository.findByEmail(email);
    if (emailQuery.rows.length < 1) {
      return callback(new ApiError(401, 'Unauthorized', ['Wrong email provided']));
    }
    bcrypt.compare(password, emailQuery.rows[0].password, (error, result) => {
      if (result === false) {
        return callback(new ApiError(401, 'Unauthorized', ['Wrong password provided']));
      }
      if (result === true) {
        return callback(null, emailQuery.rows[0]);
      }
      return callback();
    });
  }

  static validatePropsSignUp(obj) {
    const props = ['email', 'firstName', 'lastName', 'phone', 'address', 'password', 'confirmPassword'];
    const errors = [];
    props.forEach((property) => {
      if (!obj[property] || obj[property].trim() === '') {
        errors.push(`${property} not provided`);
      }
    });
    if (errors.length > 0) {
      throw new ApiError(400, 'Bad Request', errors);
    }
  }

  static validateSignUpPasswords(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new ApiError(400, 'Bad Request', ['Passwords don\'t match']);
    }
  }

  static validatePropsSignIn(obj) {
    const props = ['email', 'password'];
    const errors = [];
    props.forEach((property) => {
      if (!obj[property] || obj[property].trim() === '') {
        errors.push(`${property} not provided`);
      }
    });
    if (errors.length > 0) {
      throw new ApiError(400, 'Bad Request', errors);
    }
  }
}

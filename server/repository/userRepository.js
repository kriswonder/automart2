import db from '../db/db';
import ApiError from '../error/ApiError';
import ErrorDetail from '../error/ErrorDetail';
import {
  queryAll,
  queryByEmail,
  createUser,
  queryById,
  updatePassword,
  updateStatus,
  deleteUser,
} from '../db/queries/authQueries';

export default class authRepository {
  static findByEmail(email) {
    try {
      return db.query(queryByEmail, [email]);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal server error',
        [new ErrorDetail('body', 'email', 'User not found', email)]);
    }
  }

  static save(user) {
    try {
      return db.query(createUser, user);
    } catch (error) {
      /* istanbul ignore next */
      throw error;
    }
  }

  static findAll() {
    try {
      return db.query(queryAll);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal Server Error',
        [new ErrorDetail('findAll', 'null', 'Unable to get all users', 'null')]);
    }
  }

  static findById(id) {
    try {
      return db.query(queryById, [id]);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal server error',
        [new ErrorDetail('findById', 'user id', `Error finding user with id ${id} `, id)]);
    }
  }

  static updateStatus(userId, isAdmin) {
    try {
      return db.query(updateStatus, [isAdmin, userId]);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal Server Error',
        [new ErrorDetail('updateStatus', 'user id & status', 'Unable to update user', `${isAdmin} & ${userId}`)]);
    }
  }

  static updatePassword(id, password) {
    try {
      return db.query(updatePassword, [password, id]);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal server error',
        [new ErrorDetail('updatePassword', 'user id & password', 'Password could not be updated try again', `${id} & ${password}`)]);
    }
  }

  static delete(userId) {
    try {
      return db.query(deleteUser, [userId]);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal Server Error',
        [new ErrorDetail('Params', 'user id', 'Unable to delete user', userId)]);
    }
  }
}

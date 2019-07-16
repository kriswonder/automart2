import db from '../db/db';
import ApiError from '../error/ApiError';
import ErrorDetail from '../error/ErrorDetail';
import {
  createFlag,
} from '../db/queries/flagQueries';

export default class FlagRepository {
  static saveFlag(userId, carId, flagData) {
    const flagInfo = [flagData.reason, flagData.description, userId, carId];
    try {
      return db.query(createFlag, flagInfo);
    } catch (error) {
      throw new ApiError(500, 'Internal Server Error',
        [new ErrorDetail('Body', 'Flag Data', 'Car could not be flagged', flagInfo)]);
    }
  }
}

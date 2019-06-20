import db from '../db/db';
import { queryByEmail, createUser, queryById } from '../db/queries/authQueries';

export default class authRepository {
  static findByEmail(email) {
    return db.query(queryByEmail, [email]);
  }

  static save(user) {
    return db.query(createUser, user);
  }

  static async findById(id) {
    const result = await db.query(queryById, [id]);
    return result;
  }
}

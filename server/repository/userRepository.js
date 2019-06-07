/* eslint-disable no-param-reassign */
import bcrypt from './node_modules/bcrypt';

const users = new Map();

export default class UserRepository {
  static hashPassWord(password) {
    return bcrypt.hashSync(password, 10);
  }


  static save(user, hashPassWord) {
    user.password = hashPassWord;
    user.id = users.size;
    user.is_admin = false;

    users.set(user.id, user);
    return user;
  }
}

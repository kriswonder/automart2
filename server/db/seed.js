/* eslint-disable consistent-return */
import userRepository from '../repository/userRepository';
import db from './db';

const seedTable = () => {
  try {
    const queryUser = db.query(`
  INSERT INTO users ("firstname", "lastname", email, password, address, "isadmin") 
  VALUES ('kris', 'okeke', 'okeke@gmail.com', '${userRepository.hashPassword('password')}', '7 victoria Island', false),
  ('kingsley', 'okeke', 'prince@gmail.com', '${userRepository.hashPassword('password')}', '7 victoria Island', false),
  ('stella', 'okeke', 'stella@gmail.com', '${userRepository.hashPassword('password')}', '7 victoria Island', false); `);

    console.log(queryUser);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.stack);
    return err.stack;
  }
};

seedTable();

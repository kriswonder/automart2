import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import ApiError from '../error/ApiError';


dotenv.config();

/**
 * @class EmailHelpers
 * @description Handles all the mailing needs of the app
 * @exports EmailHelpers
 */
class EmailHelpers {
  /**
  * @method sendMailMethod
  * @description sends an email notification to the specified email address
  * @param {object} user - The email address, subject & body
  * @returns {*} nothing
  */
  static sendMailMethod(user) {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      secure: true,
      auth: {
        user: process.env.SERVER_MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: 'automartandela@gmail.com',
      to: user.email,
      subject: user.subject,
      html: user.body,
    };

    transport.sendMail(mailOptions, (error) => {
      if (error) {
        throw new ApiError(500, 'Server Error', ['Unable to send reset email']);
      }
      console.log('message Sent!');
    });
  }
}

export default EmailHelpers;

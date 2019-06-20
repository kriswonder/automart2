import cloudinary from 'cloudinary';
import ApiError from '../error/ApiError';

cloudinary.v2.config({
  cloud_name: 'kriswonder',
  api_key: '687736945135221',
  api_secret: 'yLlN7e4PgXCpFDNhY5T_47M1aGo',
});

export default class AuthHelpers {
  static validatePropsCreateCar(obj) {
    const props = ['price', 'state', 'manufacturer', 'model', 'bodyType'];
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

  static fileUploadPromises(files, filekeys) {
    const promises = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < filekeys.length; i++) {
      if (files[filekeys[i]]) {
        const promise = cloudinary.v2.uploader.upload(
          files[filekeys[i]].path,
          {
            folder: `${filekeys[i]}/`,
            use_filename: true,
            unique_filename: false,
          },
        );

        promises.push(promise);
      }
    }
    if (promises.length < 1 || promises.length > 3) {
      throw new ApiError(400, 'Bad Request', ['Photos must be between 1 & 3']);
    }
    return promises;
  }
}

import cloudinary from 'cloudinary';

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

    return errors;
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
    return promises;
  }
}

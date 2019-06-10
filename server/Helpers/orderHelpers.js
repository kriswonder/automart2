export default class AuthHelpers {
  static validatePropsOrder(obj) {
    const props = ['carId', 'offeredPrice'];
    const errors = [];
    props.forEach((property) => {
      if (!obj[property] || obj[property].trim() === '') {
        errors.push(`${property} not provided`);
      }
    });

    return errors;
  }

  static validatePropsUpdateOrder(obj) {
    const props = ['offeredPrice'];
    const errors = [];
    props.forEach((property) => {
      if (!obj[property] || obj[property].trim() === '') {
        errors.push(`${property} not provided`);
      }
    });

    return errors;
  }
}

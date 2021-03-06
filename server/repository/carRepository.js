/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import db from '../db/db';
import ApiError from '../error/ApiError';
import ErrorDetail from '../error/ErrorDetail';
import {
  createCar,
  queryAll,
  queryAllUnsold,
  updateCarStatus,
  queryById,
  updateCarPrice,
  deletecar,
} from '../db/queries/carQueries';

export default class CarRepository {
  static save(car, user) {
    const carData = [car.state, car.price, car.manufacturer, car.model, car.body_type,
      car.transmission, car.milage, car.year, car.exterior,
      car.interior, car.engine, car.img_url, car.location, user.id];
    try {
      return db.query(createCar, carData);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal Server Error',
        [new ErrorDetail('body', 'Car Properties', 'Unable to save car', carData)]);
    }
  }

  static findAll() {
    try {
      return db.query(queryAll);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal Server Error',
        [new ErrorDetail('findAll', 'null', 'Unable to get all cars', 'null')]);
    }
  }

  static findAllUnsold() {
    try {
      return db.query(queryAllUnsold, ['available']);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal Server Error',
        [new ErrorDetail('findAllUnsold', 'null', 'Unable to get all available cars', 'null')]);
    }
  }

  static updateStatus(carId, status) {
    try {
      return db.query(updateCarStatus, [status, carId]);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal Server Error',
        [new ErrorDetail('updateStatus', 'car id & status', 'Unable to update car', `${status} & ${carId}`)]);
    }
  }

  static findById(carId) {
    try {
      return db.query(queryById, [carId]);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal Server Error',
        [new ErrorDetail('findById', 'car id', 'Unable to find car by id', carId)]);
    }
  }

  static updatePrice(carId, price) {
    try {
      return db.query(updateCarPrice, [price, carId]);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal Server Error',
        [new ErrorDetail('updatePrice', 'car id & price', 'Unable to update car', `${price} & ${carId}`)]);
    }
  }

  static delete(carId) {
    try {
      return db.query(deletecar, [carId]);
    } catch (error) {
      /* istanbul ignore next */
      throw new ApiError(500, 'Internal Server Error',
        [new ErrorDetail('Params', 'car id', 'Unable to delete AD', carId)]);
    }
  }
}

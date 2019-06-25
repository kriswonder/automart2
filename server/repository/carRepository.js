/* eslint-disable no-param-reassign */
import db from '../db/db';
import {
  createCar,
  queryAll,
  queryAllUnsold,
  updateCarPrice,
  updateCarStatus,
  queryById,
  createFlag,
  deletecar,
} from '../db/queries/carQueries';

export default class CarRepository {
  static async save(car, user, files) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < files.length; i++) {
      if (files[i].public_id.includes('exterior')) {
        car.exteriorImg = files[i].secure_url;
      } else if (files[i].public_id.includes('interior')) {
        car.interiorImg = files[i].secure_url;
      } else if (files[i].public_id.includes('engine')) {
        car.engineImg = files[i].secure_url;
      }
    }

    const carData = [car.state, car.price, car.manufacturer, car.model,
      car.bodyType, car.transmission, car.milage, car.year, car.exteriorImg,
      car.interiorImg, car.engineImg, user.email, user.id];
    const result = await db.query(createCar, carData);
    return result;
  }

  static async findAll() {
    const result = await db.query(queryAll);
    return result;
  }

  static async findAllUnsold() {
    const result = await db.query(queryAllUnsold, ['available']);
    return result;
  }

  static async updateStatus(carId, status) {
    const result = await db.query(updateCarStatus, [status, carId]);
    return result;
  }

  static async updatePrice(carId, price) {
    const result = await db.query(updateCarPrice, [price, carId]);
    return result;
  }

  static async findById(carId) {
    const result = await db.query(queryById, [carId]);
    return result;
  }

  static async delete(carId) {
    const result = await db.query(deletecar, [carId]);
    return result;
  }

  static async saveFlag(userId, carId, flagData) {
    const carData = [flagData.reason, flagData.description, userId, carId];
    const result = await db.query(createFlag, carData);
    return result;
  }
}

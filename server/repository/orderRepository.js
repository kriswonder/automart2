import db from '../db/db';
import {
  createOrder,
  queryById,
  updateOrderPrice,
} from '../db/queries/orderQueries';

export default class OrderRepository {
  static async save(buyer, order) {
    const orderData = [order.price, buyer, order.carId];
    const result = await db.query(createOrder, orderData);
    return result;
  }

  static findById(id) {
    return db.query(queryById, [id]);
  }

  static update(price, id) {
    return db.query(updateOrderPrice, [price, id]);
  }
}

import carHelpers from '../Helpers/carHelpers';
import ApiError from '../error/ApiError';
import carRepository from '../repository/carRepository';
import userRepository from '../repository/userRepository';

export default class CarController {
  // eslint-disable-next-line consistent-return
  static createCar(req, res, next) {
    const userId = JSON.parse(req.decoded.id);
    try {
      const carData = JSON.parse(req.body.data);
      const errors = carHelpers.validatePropsCreateCar(carData);
      if (errors.length > 0) {
        throw new ApiError(400, 'Bad Request', errors);
      }
      const filekeys = Object.keys(req.files);
      const filePromises = carHelpers.fileUploadPromises(req.files, filekeys);
      if (filePromises.length < 1 || filePromises.length > 3) {
        throw new ApiError(400, 'Bad Request', ['Photos most be between 1 & 3']);
      }
      Promise.all(filePromises).then((files) => {
        const user = userRepository.findById(userId);
        const car = carRepository.save(user, carData, files);
        res.status(201).json({
          status: 201,
          message: `${car.manufacturer} ${car.model} Created`,
          data: {
            id: car.id,
            email: car.ownerEmail,
            created_on: car.created_on,
            manufacturer: car.manufacturer,
            model: car.model,
            price: car.price,
            state: car.state,
            status: car.status,
            bodyType: car.bodyType, // car, truck, trailer, van, etc
            transnmission: car.transmission,
            milage: car.milage,
            year: car.year,
            exteriorImg: car.exteriorImg,
            interiorImg: car.interiorImg,
            engineImg: car.engineImg,
          },
        });
      // eslint-disable-next-line no-unused-vars
      }).catch((error) => {
        next(new ApiError(408, 'Request Timeout', 'Unable to upload Photos'));
      });
    } catch (error) {
      next(error);
    }
  }


  static getCars(req, res) {
    let cars = [];
    if (req.decoded) {
      const userId = JSON.parse(req.decoded.id);
      const user = userRepository.findById(userId);
      if (user.isAdmin === true) {
        cars = carRepository.findAll();
      } else {
        cars = carRepository.findAllUnsold();
      }
    } else {
      cars = carRepository.findAllUnsold();
    }
    if (req.query.manufacturer) {
      // eslint-disable-next-line max-len
      cars = cars.filter(car => req.query.manufacturer.toLowerCase() === car.manufacturer.toLowerCase());
    }
    if (req.query.state) {
      cars = cars.filter(car => req.query.state.toLowerCase() === car.state.toLowerCase());
    }
    if (req.query.bodyType) {
      cars = cars.filter(car => req.query.bodyType.toLowerCase() === car.bodyType.toLowerCase());
    }
    if (req.query.minPrice) {
      cars = cars.filter(car => (Number(car.price) >= Number(req.query.minPrice)));
    }
    if (req.query.maxPrice) {
      cars = cars.filter(car => (Number(car.price) <= Number(req.query.maxPrice)));
    }
    res.json({
      status: 200,
      message: 'success',
      data: cars,
    });
  }

  static updateCarStatus(req, res, next) {
    if (req.body.status) {
      if (req.body.status.toLowerCase() === 'sold' || req.body.status.toLowerCase() === 'unsold') {
        const updatedCar = carRepository.update(req.params.id, req.body.status, null /* price */);
        res.json({
          status: 200,
          data: {
            id: updatedCar.id,
            email: updatedCar.email,
            createdOn: updatedCar.createdOn,
            manufacturer: updatedCar.manufacturer,
            model: updatedCar.model,
            price: updatedCar.price,
            state: updatedCar.state,
            status: updatedCar.status,
          },
        });
      } else {
        next(new ApiError(400, 'Bad Request', ['Invalid status']));
      }
    } else {
      next(new ApiError(400, 'Bad Request', ['No status provided']));
    }
  }

  static updateCarPrice(req, res, next) {
    if (req.body.price) {
      console.log(typeof (Number(req.body.price)));
      if (typeof (Number(req.body.price)) === 'number' || req.body.price !== '') {
        const updatedCar = carRepository.update(req.params.id, null, req.body.price);
        res.json({
          status: 200,
          data: {
            id: updatedCar.id,
            email: updatedCar.email,
            createdOn: updatedCar.createdOn,
            manufacturer: updatedCar.manufacturer,
            model: updatedCar.model,
            price: updatedCar.price,
            state: updatedCar.state,
            status: updatedCar.status,
          },
        });
      } else {
        next(new ApiError(400, 'Bad Request', ['Invalid price']));
      }
    } else {
      next(new ApiError(400, 'Bad Request', ['No price provided']));
    }
  }

  static getCar(req, res, next) {
    const car = carRepository.findById(Number(req.params.id));
    if (car) {
      res.json({
        id: car.id,
        owner: car.owner,
        created_on: car.created_on,
        state: car.state,
        status: car.status,
        price: car.price,
        manufacturer: car.manufacturer,
        model: car.model,
        bodyType: car.bodyType,
      });
    } else {
      next(new ApiError(400, 'Not Found', ['The car is not in our database']));
    }
  }


  static deleteCar(req, res, next) {
    const deletedCar = carRepository.delete(Number(req.params.id));
    if (deletedCar === true) {
      res.status(200).json({
        status: 200,
        message: 'Request Successful',
        data: 'Car Ad successfully deleted',
      });
    } else if (deletedCar === null) {
      next(new ApiError(404, 'Not Found', ['The car is not in our database']));
    } else {
      next(new ApiError(403, 'Bad Request', ['Unable to delete AD']));
    }
  }

  static flag(req, res, next) {
    if (req.body.reason) {
      const user = userRepository.findById(Number(req.decoded.id));
      const car = carRepository.findById(Number(req.params.id));
      const flag = carRepository.saveFlag(user.id, car.id, req.body);
      res.status(200).json({
        status: 200,
        message: 'Car flaged',
        data: {
          id: flag.id,
          carId: flag.carId,
          reason: flag.reason,
          description: flag.description,
        },
      });
    } else {
      next(new ApiError(400, 'Bad Request', ['Request not success']));
    }
  }
}

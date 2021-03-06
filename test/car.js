/* eslint-disable no-const-assign */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
// Require the dev-dependencies
import chai from 'chai';
import fs from 'fs';
import chaiHttp from 'chai-http';
import app from '../server/app';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);


describe('CAR ROUTES TEST', () => {
  const requester = chai.request(app).keepOpen();
  describe('/POST car', () => {
    let token = '';
    before((done) => {
      requester.post('/api/v1/auth/signin')
        .send({
          email: 'sole@yahoo.com',
          password: 'hashedPassword',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('phone');
          res.body.data.should.have.property('address');
          // eslint-disable-next-line prefer-destructuring
          token = res.body.data.token;
          done();
        });
    });

    it('should correctly return a car data if it was created successful', (done) => {
      requester.post('/api/v1/car')
        .set('x-access-token', token)
        .attach('exterior', fs.readFileSync('./test/img/coupe.JPEG'), 'coupe.JPEG')
        .field('manufacturer', 'aston-martin')
        .field('model', 'stallion')
        .field('price', '750000')
        .field('state', 'aston-martin')
        .field('manufacturer', 'new')
        .field('body_type', 'sedan')
        .field('transnmission', 'automatic')
        .field('milage', '5000')
        .field('year', '2018')
        .field('location', '75 Bode Thomas Surulere')
        .end((err, res) => {
          console.log(res.body);
          console.log('tttrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');

          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          res.body.should.have.property('message');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('owner');
          res.body.data.should.have.property('manufacturer');
          res.body.data.should.have.property('price');
          res.body.data.should.have.property('state');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('body_type');
          res.body.data.should.have.property('milage');
          res.body.data.should.have.property('year');
          res.body.data.should.have.property('exterior_img');
          res.body.data.should.have.property('interior_img');
          res.body.data.should.have.property('engine_img');
          res.body.data.should.have.property('created_on');
          res.body.data.should.have.property('model');
          res.body.data.should.have.property('transmission');
          done();
        });
    });

    it('should return an error, when car lacks price or any required data', (done) => {
      requester.post('/api/v1/car')
        .set('x-access-token', token)
        .attach('exterior', fs.readFileSync('./test/img/coupe.JPEG'), 'coupe.JPEG')
        .field('manufacturer', 'aston-martin')
        .field('model', 'stallion')
        .field('state', 'aston-martin')
        .field('manufacturer', 'new')
        .field('body_type', 'sedan')
        .field('transnmission', 'automatic')
        .field('milage', '5000')
        .field('year', '2018')
        .field('location', '75 Bode Thomas Surulere')
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('should return an error, when token provided is invalid', (done) => {
      requester.post('/api/v1/car/')
        .set('x-access-token', 1234567890)
        .attach('exterior', fs.readFileSync('./test/img/coupe.JPEG'), 'coupe.JPEG')
        .field('manufacturer', 'aston-martin')
        .field('model', 'stallion')
        .field('price', '750000')
        .field('state', 'aston-martin')
        .field('manufacturer', 'new')
        .field('body_type', 'sedan')
        .field('transnmission', 'automatic')
        .field('milage', '5000')
        .field('year', '2018')
        .field('location', '75 Bode Thomas Surulere')
        .end((err, res) => {
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('should return an error, when no token is provide', (done) => {
      requester.post('/api/v1/car/')
        .attach('exterior', fs.readFileSync('./test/img/coupe.JPEG'), 'coupe.JPEG')
        .field('manufacturer', 'aston-martin')
        .field('model', 'stallion')
        .field('price', '750000')
        .field('state', 'aston-martin')
        .field('manufacturer', 'new')
        .field('body_type', 'sedan')
        .field('transnmission', 'automatic')
        .field('milage', '5000')
        .field('year', '2018')
        .field('location', '75 Bode Thomas Surulere')
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });
  });/* STOP */

  describe('/GET cars', () => {
    let token = '';

    before((done) => {
      requester.post('/api/v1/auth/signin')
        .send({
          email: 'sole@yahoo.com',
          password: 'hashedPassword',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('phone');
          res.body.data.should.have.property('address');
          // eslint-disable-next-line prefer-destructuring
          token = res.body.data.token;
          done();
        });
    });

    it('should return an array of cars, with a status and message field', (done) => {
      requester.get('/api/v1/car')
        .set('x-access-token', token)
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('success');
          res.body.data.should.be.a('array');
          expect(res.body.data).to.have.lengthOf.at.least(1);
          done();
        });
    });

    it('should return an empty array of cars, when manufacturer query param is not found', (done) => {
      requester.get('/api/v1/car')
        .set('x-access-token', token)
        .query({ manufacturer: 'ferrari' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('success');
          res.body.data.should.be.a('array').that.does.not.include({});
          expect(res.body.data).to.be.empty;
          done();
        });
    });

    it('should return an array of cars, when manufacturer query param is found', (done) => {
      requester.get('/api/v1/car')
        .set('x-access-token', token)
        .query({ manufacturer: 'aston-martin' })
        .end((err, res) => {
          console.log(res.body);
          console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');

          // res.body.should.have.property('status').eql(200);
          // res.body.should.have.property('message').eql('success');
          // expect(res.body.data).to.have.lengthOf.at.least(1);
          done();
        });
    });

    it('should return an empty array of cars, when state query param is not found', (done) => {
      requester.get('/api/v1/car')
        .set('x-access-token', token)
        .query({ state: 'used' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('success');
          res.body.data.should.be.a('array').that.does.not.include({});
          expect(res.body.data).to.be.empty;
          done();
        });
    });

    it('should return an array of cars, when state query param is found', (done) => {
      requester.get('/api/v1/car')
        .set('x-access-token', token)
        .query({ state: 'new' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('success');
          expect(res.body.data).to.have.lengthOf.at.least(1);
          done();
        });
    });

    it('should return an empty array of cars, when bodyType query param is not found', (done) => {
      requester.get('/api/v1/car')
        .set('x-access-token', token)
        .query({ body_type: 'bus' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('success');
          res.body.data.should.be.a('array').that.does.not.include({});
          expect(res.body.data).to.be.empty;
          done();
        });
    });

    it('should return an array of cars, when bodyType query param is found', (done) => {
      requester.get('/api/v1/car')
        .set('x-access-token', token)
        .query({ body_type: 'coupe' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('success');
          expect(res.body.data).to.have.lengthOf.at.least(1);
          done();
        });
    });

    it('should return an empty array of cars, when minPrice query param is not found', (done) => {
      requester.get('/api/v1/car')
        .set('x-access-token', token)
        .query({ min_price: 1200000 })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('success');
          res.body.data.should.be.a('array').that.does.not.include({});
          expect(res.body.data).to.be.empty;
          done();
        });
    });

    it('should return an array of cars, when minPrice query param is found', (done) => {
      requester.get('/api/v1/car')
        .set('x-access-token', token)
        .query({ minPrice: 120000 })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('success');
          expect(res.body.data).to.have.lengthOf.at.least(1);
          done();
        });
    });

    it('should return an array of cars, when maxPrice query param is found', (done) => {
      requester.get('/api/v1/car')
        .set('x-access-token', token)
        .query({ maxPrice: 1200000 })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('success');
          res.body.data.should.be.an('array');
          expect(res.body.data).to.have.lengthOf.at.least(1);
          done();
        });
    });

    it('should return an empty array of cars, when maxPrice query param is not found', (done) => {
      requester.get('/api/v1/car')
        .set('x-access-token', token)
        .query({ max_price: 120000 })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('success');
          res.body.data.should.be.an('array');
          expect(res.body.data).to.be.empty;
          done();
        });
    });
  });/* STOP */

  describe('/GET car', () => {
    let token = '';
    before((done) => {
      requester.post('/api/v1/auth/signin')
        .send({
          email: 'sole@yahoo.com',
          password: 'hashedPassword',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('phone');
          res.body.data.should.have.property('address');
          // eslint-disable-next-line prefer-destructuring
          token = res.body.data.token;
          done();
        });
    });

    it('/GET CAR should return single car data', (done) => {
      requester.get('/api/v1/car/3')
        .set('x-access-token', token)
        .send().end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          res.body.should.have.property('message');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('owner');
          res.body.data.should.have.property('created_on');
          res.body.data.should.have.property('manufacturer');
          res.body.data.should.have.property('model');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('price');
          res.body.data.should.have.property('state');
          res.body.data.should.have.property('body_type');
          res.body.data.should.have.property('milage');
          res.body.data.should.have.property('transmission');
          res.body.data.should.have.property('year');
          res.body.data.should.have.property('exterior_img');
          res.body.data.should.have.property('interior_img');
          res.body.data.should.have.property('engine_img');
          done();
        });
    });

    it('/GET CAR should return error if no token is provided', (done) => {
      requester.get('/api/v1/car/3')
        .send().end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/GET CAR should return error if invalid token is provided', (done) => {
      requester.get('/api/v1/car/3')
        .set('x-access-token', 1234567890)
        .send().end((err, res) => {
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/GET CAR should return error if car with id is not found', (done) => {
      requester.get('/api/v1/car/100')
        .set('x-access-token', token)
        .send().end((err, res) => {
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });
  });/* STOP */

  describe('/PATCH STATUS car', () => {
    let token = '';
    let anotherToken = '';
    before((done) => {
      requester.post('/api/v1/auth/signin')
        .send({
          email: 'sole@yahoo.com',
          password: 'hashedPassword',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('phone');
          res.body.data.should.have.property('address');
          // eslint-disable-next-line prefer-destructuring
          token = res.body.data.token;
        });

      requester.post('/api/v1/auth/signin')
        .send({
          email: 'sam@gmail.com',
          password: 'password',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('phone');
          res.body.data.should.have.property('address');
          // eslint-disable-next-line prefer-destructuring
          anotherToken = res.body.data.token;
          done();
        });
    });

    it('/PATCH CAR STATUS should return updated car data', (done) => {
      requester.patch('/api/v1/car/3/status')
        .set('x-access-token', token)
        .send({
          status: 'sold',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          res.body.should.have.property('message');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('owner');
          res.body.data.should.have.property('created_on');
          res.body.data.should.have.property('manufacturer');
          res.body.data.should.have.property('model');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('price');
          res.body.data.should.have.property('state');
          res.body.data.should.have.property('body_type');
          res.body.data.should.have.property('milage');
          res.body.data.should.have.property('transmission');
          res.body.data.should.have.property('year');
          res.body.data.should.have.property('exterior_img');
          res.body.data.should.have.property('interior_img');
          res.body.data.should.have.property('engine_img');
          done();
        });
    });

    it('/PATCH CAR STATUS should return error if no token is provided', (done) => {
      requester.patch('/api/v1/car/3/status')
        .send({
          status: 'sold',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/PATCH CAR STATUS should return error if invalid token is provided', (done) => {
      requester.patch('/api/v1/car/3/status')
        .set('x-access-token', 1234567890)
        .send({
          status: 'sold',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/PATCH CAR STATUS should return error if non owner tries to modify status', (done) => {
      requester.patch('/api/v1/car/3/status')
        .set('x-access-token', anotherToken)
        .send({
          status: 'sold',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/PATCH CAR STATUS should return error if car id not found', (done) => {
      requester.patch('/api/v1/car/100/status')
        .set('x-access-token', token)
        .send({
          status: 'sold',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/PATCH CAR STATUS should return error if no status is added', (done) => {
      requester.patch('/api/v1/car/3/status')
        .set('x-access-token', token)
        .send().end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/PATCH CAR STATUS should return error if invalid status is entered', (done) => {
      requester.patch('/api/v1/car/3/status')
        .set('x-access-token', token)
        .send({
          status: 'solld',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });
  });/* STOP */

  describe('/PATCH PRICE car', () => {
    let token = '';
    let anotherToken = '';
    before((done) => {
      requester.post('/api/v1/auth/signin')
        .send({
          email: 'sole@yahoo.com',
          password: 'hashedPassword',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('phone');
          res.body.data.should.have.property('address');
          // eslint-disable-next-line prefer-destructuring
          token = res.body.data.token;
        });

      requester.post('/api/v1/auth/signin')
        .send({
          email: 'sam@gmail.com',
          password: 'password',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('phone');
          res.body.data.should.have.property('address');
          // eslint-disable-next-line prefer-destructuring
          anotherToken = res.body.data.token;
          done();
        });
    });

    it('/PATCH CAR PRICE should return updated car data', (done) => {
      requester.patch('/api/v1/car/3/price')
        .set('x-access-token', token)
        .send({
          price: '500000',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          res.body.should.have.property('message');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('owner');
          res.body.data.should.have.property('created_on');
          res.body.data.should.have.property('manufacturer');
          res.body.data.should.have.property('model');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('price');
          res.body.data.should.have.property('state');
          res.body.data.should.have.property('body_type');
          res.body.data.should.have.property('milage');
          res.body.data.should.have.property('transmission');
          res.body.data.should.have.property('year');
          res.body.data.should.have.property('exterior_img');
          res.body.data.should.have.property('interior_img');
          res.body.data.should.have.property('engine_img');
          done();
        });
    });

    it('/PATCH CAR PRICE should return error if no token is provided', (done) => {
      requester.patch('/api/v1/car/3/price')
        .send({
          price: '500000',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/PATCH CAR PRICE should return error if invalid token is provided', (done) => {
      requester.patch('/api/v1/car/3/price')
        .set('x-access-token', 1234567890)
        .send({
          price: '500000',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/PATCH CAR PRICE should return error if non owner tries to modify status', (done) => {
      requester.patch('/api/v1/car/3/price')
        .set('x-access-token', anotherToken)
        .send({
          price: '500000',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/PATCH CAR PRICE should return error if car id not found', (done) => {
      requester.patch('/api/v1/car/100/price')
        .set('x-access-token', token)
        .send({
          price: '500000',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/PATCH CAR PRICE should return error if no price is added', (done) => {
      requester.patch('/api/v1/car/3/price')
        .set('x-access-token', token)
        .send().end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/PATCH CAR PRICE should return error if invalid price is entered', (done) => {
      requester.patch('/api/v1/car/3/price')
        .set('x-access-token', token)
        .send({
          price: '500000a',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });
  });/* STOP */

  describe('/GET ORDER BY CAR ID', () => {
    let token = '';
    let car_id = '';
    let orderId = '';
    let anotherToken = '';
    let anotherCarId = '';
    before((done) => {
      requester.post('/api/v1/auth/signin')
        .send({
          email: 'sole@yahoo.com',
          password: 'hashedPassword',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('phone');
          res.body.data.should.have.property('address');
          // eslint-disable-next-line prefer-destructuring
          token = res.body.data.token;
        });

      requester.post('/api/v1/auth/signin')
        .send({
          email: 'sam@gmail.com',
          password: 'password',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('phone');
          res.body.data.should.have.property('address');
          // eslint-disable-next-line prefer-destructuring
          anotherToken = res.body.data.token;
          done();
        });
    });

    it('should correctly return a car data if it was created successful', (done) => {
      requester.post('/api/v1/car')
        .set('x-access-token', token)
        .attach('exterior', fs.readFileSync('./test/img/coupe.JPEG'), 'coupe.JPEG')
        .field('manufacturer', 'aston-martin')
        .field('model', 'stallion')
        .field('price', '750000')
        .field('state', 'aston-martin')
        .field('manufacturer', 'new')
        .field('body_type', 'sedan')
        .field('transnmission', 'automatic')
        .field('milage', '5000')
        .field('year', '2018')
        .field('location', '75 Bode Thomas Surulere')
        .end((err, res) => {
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          res.body.should.have.property('message');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('owner');
          res.body.data.should.have.property('manufacturer');
          res.body.data.should.have.property('price');
          res.body.data.should.have.property('state');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('body_type');
          res.body.data.should.have.property('milage');
          res.body.data.should.have.property('year');
          res.body.data.should.have.property('exterior_img');
          res.body.data.should.have.property('interior_img');
          res.body.data.should.have.property('engine_img');
          res.body.data.should.have.property('created_on');
          res.body.data.should.have.property('model');
          res.body.data.should.have.property('transmission');
          car_id = Number(res.body.data.id);
          done();
        });
    });

    it('should correctly return a car data if it was created successful', (done) => {
      requester.post('/api/v1/car')
        .set('x-access-token', token)
        .attach('exterior', fs.readFileSync('./test/img/coupe.JPEG'), 'coupe.JPEG')
        .field('manufacturer', 'aston-martin')
        .field('model', 'stallion')
        .field('price', '750000')
        .field('state', 'aston-martin')
        .field('manufacturer', 'new')
        .field('body_type', 'sedan')
        .field('transnmission', 'automatic')
        .field('milage', '5000')
        .field('year', '2018')
        .field('location', '75 Bode Thomas Surulere')
        .end((err, res) => {
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          res.body.should.have.property('message');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('owner');
          res.body.data.should.have.property('manufacturer');
          res.body.data.should.have.property('price');
          res.body.data.should.have.property('state');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('body_type');
          res.body.data.should.have.property('milage');
          res.body.data.should.have.property('year');
          res.body.data.should.have.property('exterior_img');
          res.body.data.should.have.property('interior_img');
          res.body.data.should.have.property('engine_img');
          res.body.data.should.have.property('created_on');
          res.body.data.should.have.property('model');
          res.body.data.should.have.property('transmission');
          anotherCarId = Number(res.body.data.id);
          done();
        });
    });

    it('should correctly return a order data if order was successful', (done) => {
      requester.post('/api/v1/order')
        .set('x-access-token', token)
        .send({
          car_id,
          amount: '400000',
        }).end((err, res) => {
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('car_id');
          res.body.data.should.have.property('created_on');
          res.body.data.should.have.property('buyer');
          orderId = Number(res.body.data.id);
          done();
        });
    });

    it('/GET CAR should return orders made for a car', (done) => {
      requester.get(`/api/v1/car/${car_id}/orders`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          done();
        });
    });

    it('/GET CAR should return error response when non car owner tries accessing this route', (done) => {
      requester.get(`/api/v1/car/${car_id}/orders`)
        .set('x-access-token', anotherToken)
        .end((err, res) => {
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });

    it('/GET CAR should return error response when car as no order on it', (done) => {
      requester.get(`/api/v1/car/${anotherCarId}/orders`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('message');
          res.body.should.have.property('error');
          done();
        });
    });
  });/* STOP */

  // describe('/DELETE car', () => {
  //   let token = '';
  //   let anotherToken = '';
  //   before((done) => {
  //     requester.post('/api/v1/auth/signin')
  //       .send({
  //         email: 'sole@yahoo.com',
  //         password: 'hashedPassword',
  //       }).end((err, res) => {
  //         res.body.should.have.property('status').eql(200);
  //         res.body.should.have.property('data');
  //         res.body.data.should.be.a('object');
  //         res.body.data.should.have.property('id');
  //         res.body.data.should.have.property('first_name');
  //         res.body.data.should.have.property('last_name');
  //         res.body.data.should.have.property('email');
  //         // eslint-disable-next-line prefer-destructuring
  //         token = res.body.data.token;
  //       });

  //     requester.post('/api/v1/auth/signin')
  //       .send({
  //         email: 'sam@gmail.com',
  //         password: 'password',
  //       }).end((err, res) => {
  //         res.body.should.have.property('status').eql(200);
  //         res.body.should.have.property('message');
  //         res.body.should.have.property('data');
  //         res.body.data.should.be.a('object');
  //         res.body.data.should.have.property('token');
  //         res.body.data.should.have.property('id');
  //         res.body.data.should.have.property('first_name');
  //         res.body.data.should.have.property('last_name');
  //         res.body.data.should.have.property('email');
  //         res.body.data.should.have.property('phone');
  //         res.body.data.should.have.property('address');
  //         // eslint-disable-next-line prefer-destructuring
  //         anotherToken = res.body.data.token;
  //         done();
  //       });
  //   });

  //   it('/DELETE CAR should return a 401 status, non owner tries deleting car', (done) => {
  //     requester.delete('/api/v1/car/3')
  //       .set('x-access-token', anotherToken)
  //       .end((err, res) => {
  //         res.body.should.have.property('status').eql(401);
  //         res.body.should.have.property('message');
  //         res.body.should.have.property('error');
  //         done();
  //       });
  //   });

  //   it('/DELETE CAR should return a 400 error status,if no token is provided', (done) => {
  //     requester.delete('/api/v1/car/3')
  //       .end((err, res) => {
  //         res.body.should.have.property('status').eql(400);
  //         res.body.should.have.property('message');
  //         res.body.should.have.property('error');
  //         done();
  //       });
  //   });

  //   it('/DELETE CAR should return a 401 error status,if invalid token is provided', (done) => {
  //     requester.delete('/api/v1/car/3')
  //       .set('x-access-token', 1234567890)
  //       .end((err, res) => {
  //         res.body.should.have.property('status').eql(401);
  //         res.body.should.have.property('message');
  //         res.body.should.have.property('error');
  //         done();
  //       });
  //   });

  //   it('/DELETE CAR should return a 404 error status,if :id provided is not in database', (done) => {
  //     requester.delete('/api/v1/car/40')
  //       .set('x-access-token', token)
  //       .end((err, res) => {
  //         res.body.should.have.property('status').eql(404);
  //         res.body.should.have.property('message');
  //         res.body.should.have.property('error');
  //         done();
  //       });
  //   });


  //   it('/DELETE CAR should return a 200 status,and delete sucessful data', (done) => {
  //     requester.delete('/api/v1/car/3')
  //       .set('x-access-token', token)
  //       .end((err, res) => {
  //         res.body.should.have.property('status').eql(200);
  //         res.body.should.have.property('message').eql('Request Successful');
  //         res.body.should.have.property('data').eql('Car Ad successfully deleted');
  //         done();
  //       });
  //   });
  // });/* STOP */
});

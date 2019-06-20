/* eslint-disable no-unused-vars */
import express from 'express';
import logger from 'morgan';
import swaggerUI from 'swagger-ui-express';
// import bodyParser from 'body-parser';
import router from './routes/index';
import carRoutes from './routes/carRoutes';
import orderRoutes from './routes/orderRoutes';
import docs from '../swagger.json';
import 'dotenv/config';

const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use('/api/v1/auth', router);
app.use('/api/v1/car', carRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

app.use('*', (req, res) => {
  res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log('Nice!!');
  res.json({
    status: err.status || 500,
    message: err.message,
    errors: err.errors,
  });
});

const port = process.env.PORT || 3000;

app.listen(/* config.port || */ port, () => {
  console.log(`server now running on ${port}`);
});

module.exports = app;

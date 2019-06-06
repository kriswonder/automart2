import express from 'express';
import logger from 'morgan';
// import bodyParser from 'body-parser';
import router from './routes/index';

const app = express();


app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use('/api/v1/auth', router);


app.use('*', (req, res) => {
  res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  console.log('CALLED JOB');
  res.json({
    status: err.status || 500,
    message: err.message,
    errors: err.errors,
  });
});

const port = 3000;

app.listen(/* config.port || */ port, () => {
  console.log(`server now running on ${port}`);
});


export default app;

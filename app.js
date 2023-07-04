const express = require('express');
const App = express();
const path = require('path');
const dotenv = require('dotenv');

const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors')

const globalErr = require('./controllers/errController')
const AppErr = require('./utils/appErr')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
dotenv.config()


App.use(cors());

App.options('*', cors());

App.use(express.static(path.join(__dirname, 'public')));
App.use(helmet());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(morgan("dev"));


App.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  console.log(req.headers);
  next()
})


App.use('/users', userRoute)
App.use('/auth', authRoute)
App.use('/posts', postRoute)

App.all('*', (req, res, next) => {

  next(new AppErr(`Can't find ${req.originalUrl} on this server!`, 404))
})
App.use(globalErr)



module.exports = App;
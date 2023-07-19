const mongoose = require('mongoose')
const dotenv = require('dotenv');

const App = require('./app')
dotenv.config()

const PORT = process.env.PORT || 4000;

// const CON_STR = 'mongodb://127.0.0.1:27017/tumblr-app'
// const CON_STR = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
mongoose.connect(process.env.DATABASE, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on('open', () => console.log('server is connected'))
mongoose.connection.on('error', (error) => console.log(error))

App.listen(PORT, () => console.log("server is running"))
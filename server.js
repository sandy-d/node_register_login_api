const express  = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser  = require('body-parser');
const cors = require('cors');

const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth')

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };


mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})






const app = express()

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Serve is running on port ${PORT}`)
})

app.use('/api/employee', cors(corsOptions), EmployeeRoute)
app.use('/api', cors(corsOptions), AuthRoute)







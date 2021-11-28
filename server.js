
const express = require('express')
const bodyParser = require('body-parser')
const PRODUCTS = require('./products/index')
const USERS = require('./users/index')


const PORT = process.env.PORT || 5000

const app = express()

app.use(bodyParser.json({limit: '10mb', extended: true}))

app.use(function (req, res, next) {
    var allowedOrigins = ['http://localhost:4200', 'https://yasala.herokuapp.com'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
      // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', origin);
    }
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();})
  .get('/products', PRODUCTS.getAllProducts)
  .get('/products/:category', PRODUCTS.getAllProducts)
  .get('/products/product/:id', PRODUCTS.getAllProducts)
  .post('/products', PRODUCTS.updateOrCreateProduct)
  .post('/products/:id', PRODUCTS.updateOrCreateProduct)
  .get('/user', USERS.getByLoginPassword)
  .post('/user', USERS.createUser)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  .setTimeout(10000)
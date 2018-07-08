const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const app = new Koa();

// Body parser to access data from request
app.use(bodyParser());

// Use routes from the 'routes.js'
app.use(router());

// Listen to the port '3000'
app.listen(process.env.PORT || 3000, () => console.log('server started at port 3000'));
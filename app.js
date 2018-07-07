const Koa = require('koa');
const router = require('./routes');
const app = new Koa();

// Use routes from the 'routes.js'
app.use(router());

// Listen to the port '3000'
app.listen(3000, () => console.log('server started at port 3000'));
const Router = require ('koa-router');
const router = new Router({ prefix: '/restaurant' });

// Store restaurant details / Replaced by DB later
let restaurantList = [];

// get available restaurant details
router.get('/', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = restaurantList;
})

module.exports = router;
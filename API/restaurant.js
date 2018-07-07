const Router = require ('koa-router');
const router = new Router({ prefix: '/restaurant' });

// get available restaurant details
router.get('/', async (ctx, next) => {
  ctx.body = 'Restaurant details'
})

module.exports = router;
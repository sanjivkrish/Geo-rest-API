const Router = require ('koa-router');
const router = new Router();

// Serves home page
router.get('/', async (ctx, next) => {
  ctx.body = 'Home page'
})

module.exports = router;
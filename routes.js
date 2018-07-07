const combineRouters = require ('koa-combine-routers');
const rootRouter = require ('./API/root');
const restaurantRouter = require ('./API/restaurant');

const router = combineRouters(
	rootRouter,
	restaurantRouter
)

module.exports = router;
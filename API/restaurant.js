const Router = require ('koa-router');
const router = new Router({ prefix: '/restaurant' });

// Store restaurant details / Replaced by DB later
let restaurantList = [];

// Validate user input
validateRestaurantInfo = (restaurantInfo) => {
  // Info must have name, lat, long
  // Lat and long should be of type 'float'
  if (restaurantInfo.hasOwnProperty('name') &&
      restaurantInfo.hasOwnProperty('lat') &&
      restaurantInfo.hasOwnProperty('long') &&
      (!isNaN(parseFloat(restaurantInfo.lat)) && isFinite(restaurantInfo.lat)) &&
      (!isNaN(parseFloat(restaurantInfo.long)) && isFinite(restaurantInfo.long))) {
        return true
      } else {
        return false
      }
};

// get available restaurant details
router.get('/', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = restaurantList;
})

// Add a new restaurant
router.post('/', async (ctx, next) => {
  let restaurantInfo = ctx.request.body;

  if (validateRestaurantInfo(restaurantInfo)) {
    // Use timestamp as an ID
    restaurantInfo.id = new Date().getTime();
    restaurantInfo.lat = parseFloat(restaurantInfo.lat);
    restaurantInfo.long = parseFloat(restaurantInfo.long);

    // Add to the restaurant list / Later replaced by DB
    restaurantList.push(restaurantInfo);
    ctx.status = 201;
  } else {
    ctx.status = 400;
    ctx.body = 'Invalid Input';
  }
})

module.exports = router;
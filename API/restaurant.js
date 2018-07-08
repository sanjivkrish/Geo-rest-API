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

// Validate user query
validateQuery = (query) => {
  // Query must have radius, lat, long
  // Lat, radius and long should be of type 'float'
  if (query !== undefined &&
      query.lat !== undefined &&
      query.long !== undefined &&
      query.radius !== undefined &&
      (!isNaN(parseFloat(query.radius)) && isFinite(query.radius)) &&
      (!isNaN(parseFloat(query.lat)) && isFinite(query.lat)) &&
      (!isNaN(parseFloat(query.long)) && isFinite(query.long))) {
        return true
      } else {
        return false
      }
};

// Apply Math formula to figure out distance between two points
distanceOf = (x1, x2, y1, y2) => {
  return (Math.sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2)));
};

// Evaluate query on all restaurant info
searchRestaurantInRange = (restaurantList, query) => {
  let returnList = [];
  let x1 = parseFloat(query.lat);
  let y1 = parseFloat(query.long);

  // Compare each restaurant with given radius
  for (var i = 0; i < restaurantList.length; i++) {
    let x2 = restaurantList[i].lat;
    let y2 = restaurantList[i].long;

    // Add if restaurant resides within radius
    if (distanceOf(x1, x2, y1, y2) < parseFloat(query.radius)) {
      returnList.push(restaurantList[i]);
    }
  }

  return returnList;
};

// get available restaurant details
router.get('/', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = await global.db.find({}).toArray();
})

// Add a new restaurant
router.post('/', async (ctx, next) => {
  let restaurantInfo = ctx.request.body;

  if (validateRestaurantInfo(restaurantInfo)) {
    // Use timestamp as an ID
    restaurantInfo.id = new Date().getTime();
    restaurantInfo.lat = parseFloat(restaurantInfo.lat);
    restaurantInfo.long = parseFloat(restaurantInfo.long);

    // Add to the restaurant list
    await global.db.insert(restaurantInfo);
    ctx.status = 201;
  } else {
    ctx.status = 400;
    ctx.body = 'Invalid Input';
  }
})

// Update a restaurant info
router.put('/:restaurantId', async (ctx, next) => {
  const restaurantId = parseInt(ctx.params.restaurantId);
  let restaurantInfo = ctx.request.body;

  if (validateRestaurantInfo(restaurantInfo)) {
    let restaurantList = await global.db.find({id: restaurantId}).toArray();

    if (restaurantList.length > 0) {
      // Update in DB
      await global.db.update({id: restaurantId}, {$set : restaurantInfo})

      ctx.status = 204;
      ctx.body = 'Update successful';
    } else {
      ctx.status = 404;
      ctx.body = 'Restaurant not found';
    }
  } else {
    ctx.status = 400;
    ctx.body = 'Invalid Input';
  }
})

// Delete a restaurant info
router.delete('/:restaurantId', async (ctx, next) => {
  const restaurantId = parseInt(ctx.params.restaurantId);

  let restaurantList = await global.db.find({id: restaurantId}).toArray();

  if (restaurantList.length > 0) {
    // Update in DB
    await global.db.deleteOne({id: restaurantId})

    ctx.status = 204;
    ctx.body = 'Delete successful';
  } else {
    ctx.status = 404;
    ctx.body = 'Restaurant not found';
  }
})

// get list restaurants within a certain radius
router.get('/search', async (ctx, next) => {
  let query = JSON.parse(JSON.stringify(ctx.query));

  // Validate input query
  if (validateQuery(ctx.query)) {
    // Evaluate all restaurant against user query
    let queriedRestaurantList = searchRestaurantInRange (restaurantList, query);

    ctx.status = 200;
    ctx.body = queriedRestaurantList;
  } else {
    ctx.status = 404;
  }
})

module.exports = router;
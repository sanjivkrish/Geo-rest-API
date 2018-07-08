# GEO-REST-API

Geo-REST-API provides the REST service to maintain restaurant details along with its location using MongoDB. It also helps to list down restaurants within certain range.

## Goal / Assumption

- REST API to add, modify, delete, update restaurant info ('location' to be precise)
- Use NodeJS, KoaJS, MongoDB, Docker container
- Provide API to search restaurants within certain range (user provided)

## How to run the App?

With Docker container

```
$ docker run -p 4000:3000 sanjivkrishnasamy/geo-api
```

To test the deployed service

```
https://geo-rest-apis.herokuapp.com/
```

To setup a development environment, please use NodeJS v8

```
$ git clone https://github.com/sanjivkrish/Geo-rest-API.git
$ cd Geo-rest-API
$ npm install
$ npm start
```

## Project Structure

* `app.js` Kick starts server and DB initialization.
* `routes.js` Combines various routes. ('restaurant' is the only available route at present)
* `API` package to hold all routes.
  * `root.js` Handles calls for '/'
  * `restaurant.js` Handles calls for '/restaurant'
* `dbs` package to manage MongoDB

## JSON structure

Name, latitude and longitude are required fields and rest are optional (Since our concern here is location API).
ID is auto-generated timestamp created during the time of addition.

```js
RestaurantInfo:
    type: object
    required:
      - name
      - lat
      - long
    properties:
      id:
        type: integer
        format: auto-generated
      name:
        type: string
        example: 'ABC Restaurant'
      lat:
        type: number
        format: float
      long:
        type: number
        format: float
```

## API Documentation

**Request**
```
Get /
```
**Response :**
Returns body with status message 'Home Page'

**Request**
```
Get /restaurant
```

**Response :**
Returns list of all restaurants.

**Request**
```
POST /restaurant
```

Example : Request-Body
```
{
  name : 'Sample Restaurant',
  lat : 14.2,
  long : 12
  others : {}
}
```

**Response :**
Add new restaurant info.
```
201 CREATED     - In case of Success
400 BAD_REQUEST - Invalid input
```

**Request**
```
PUT /restaurant/:id
```

Example : PUT /restaurant/1367667
```
{
  id : 1367667,
  name : 'Sample Restaurant',
  lat : 14.2,
  long : 12
  others : {}
}
```

**Response :**
Update a restaurant info
```
204 UPDATE      - In case of Success
400 BAD_REQUEST - Restaurant not found
404 BAD_REQUEST - Invalid input
```

**Request**
```
DELETE /restaurant/:id
```

Example : DELETE /restaurant/1367667

**Response :**
Remove a restaurant info
```
204 UPDATE      - In case of Success
404 BAD_REQUEST - Invalid input
```

**Request**
```
GET /restaurant/search?query
```

Example : GET /restaurant/search?lat=5&long=7&radius=1

**Response :**
Returns list of restaurant that satisfies the query
```
204 UPDATE      - In case of Success
404 BAD_REQUEST - Invalid input
```

## License

Geo-REST-API is released under the MIT License.

Contributions are welcome, and bug reports or pull requests are always helpful.
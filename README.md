# Worther Backend

A Backend for Worther App

### Local Use

- run `yarn` in order to install all dependencies
- use the command `yarn server` to run nodemon live server
- use http://localhost:6000/ to get end points
- deployed on heroku  https://worther.herokuapp.com


## Endpoints

### Users Overview


| Method |     Endpoint     |                  Requires                    |                                        Description                            |
|--------|------------------|----------------------------------------------|-------------------------------------------------------------------------------|
|  POST  | `/api/register` | `first`,`last`,`username`, `email`, `password`| Used for adding a new user .                                       |
|  POST  | `/api/login`    |  `username`, `password`| Login with username and password. Provides JWT to user    |
|  GET   | `/api/users`     |  Successful Login  | Shows a list of users if logged in.          

### House Table

| Method |     Endpoint     |                  Requires                    |                                        Description                            |
|--------|------------------|----------------------------------------------|-------------------------------------------------------------------------------|
|  POST  | `api/house` | `address`, `city`, `state`, `zip`, `bed`, `bath`, `sqft`, `stories`, `garage`, `pool`| Used for adding a new house . |
|  GET   | `api/house/:id`     | No login necessary | house info | Shows home. |
|  PUT   | `api/house/:id`     | No login necessary | house info | Updates home. | 
|  DELETE   | `api/house/:id`     | No login necessary | house info | Delete homes. |                                  |
|  GET   | `api/user/:id/house`     | Must be logged in JWT in Authorization Header| Update house info | Shows homes for logged in user.            

### Example JSON object:
```
{
    address: "333 W Main St",
    city: "Paris",
    state: "FL",
    zip: "88225",
    bed: "4",
    bath: "3",
    sqft: "2224",
    stories: "2",
    garage: "3",
    pool: "true"
}
```
    tbl.string("address").notNullable();
    tbl.string("city", 128).notNullable();
    tbl.string("state", 2).notNullable();
    tbl.integer("zip").notNullable();
    tbl.integer("bed").notNullable();
    tbl.integer("bath").notNullable();
    tbl.integer("sqft").notNullable();
    tbl.integer("stories").notNullable();
    tbl.integer("garage").notNullable();
    tbl.boolean("pool").notNullable();

### To Test in Postman 

Login

```
{ 
"username": "ryan1",
"password": "ryan" }

```
House Info

```
{
    "address": "3332 W Main St",
    "city": "Los Angeles",
    "state": "CA",
    "zip": "90210",
    "bed": "5",
    "bath": "4",
    "sqft": "5400",
    "stories": "2",
    "garage": "4",
    "pool": "true" }

```

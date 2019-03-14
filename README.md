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
|  GET   | `/api/users`     |  Successful Login  | Shows a list of users if logged in.  |
|  PUT   | `/api/users/:id/`|            Successful Login, Data            | Used to edit the logged in user's credentials. **Only works on current user!**|
| DELETE | `api/users/:id/` |              Successful Login                | Used to delete the logged in user. **Only works on current user!**            |        

### User Registration


Method used: **[POST]** `/api/register/`

On Success: Returns the Id of the new user.



Parameters:

|   Name    | Type | Required |                      Notes                       |
|-----------|------|----------|--------------------------------------------------|
|   first    |string|    no  | First name of user                |
|   last    |string|    no   | Last name of use                |

| username  |string|    yes   |Must be unique.                                   |
| password  |string|    yes   |Can be any length     |
|email  |string|    yes   |Must be a valid email address and unique |

Example of what to use: 
```
{
    first: "Jill",
    last: "Jones",
    username: "jill1",
    email: "jill@gmail.com",
    password: "testpassword1",
}
```
---

### User Login


Method used: **[POST]** `/api/login/`

On Success: Returns an object containing a token to be used to authenticate the user, user's id, and first name. Place it in Authorization header.



Parameters:

|  Name  | Type | Required |
|--------|------|----------|
|username|string|    yes   |
|password|string|    yes   |

Example of what to use: 
```
{
    username: "jill1",
    password: "testpassword1"
}
```
### House Table

| Method |     Endpoint     |                  Requires                    |                                        Description                            |
|--------|------------------|----------------------------------------------|-------------------------------------------------------------------------------|
|  POST  | `api/house` | `address`, `city`, `state`, `zip`, `bed`, `bath`, `sqft`, `year`| Used for adding a new house . |
|  GET   | `api/house/:id`     | Must be logged in | Shows specified home. 
| 
|  PUT   | `api/house/:id`     | Must be logged in | Updates specified home.  
|
|  DELETE   | `api/house/:id`     | Must be logged in| Deletes specified home. |  
|  GET  | `api/user/:id/house` | Must be logged in| Lists all homes for a user .                                   |
         


Parameters:

|      Name     |   Type   | Required |                   Notes                     |
|---------------|----------|----------|---------------------------------------------|
| Address|string|    yes   | example: 404 W Main St           |
|     city    |  string  |    yes  | Name of city            |
|    state  |  string  |   yes   | example: CA                              |
|    zip  |  integer |   yes    | example: 90210|
|    bed  |  integer |   yes    | number of bathrooms|
|    bath  |  integer |   yes    | number of bedrooms|
|    sqft  |  integer |   yes    | Square Footage of home|
|    year  |  integer |   yes    | Year home was built |


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
    year: "2002"
}

```

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
    "year": "2002"
}

```

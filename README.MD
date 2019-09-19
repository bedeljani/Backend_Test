# Knex/Express 

This is an example project structure that uses both Express and Knex. It assumes
the creation of a "server" JSON API using a MYSQL database and creates a
basic relation between `product` and `productImages` to demonstrate how such simple
data structures might be modeled using nothing more than Knex and plain JS.

## Folder Structure

```
/config
  db.js -- loads the knexfile using settings for the current environment
/controllers -- business logic for handling API endpoints
  productController.js

/models  -- simple collections of db queries and utilities for user data
  Product.js
    
/public  -- localstorage for uploading images
  /images
 
/routes -- defines API endpoints and passes requests to corresponding controllers
    product.js

server.js -- the main Express app
knexfile.js -- defines all database settings for different environments
package.json -- defines scripts for utilities like migrations and seeds
```

## What's Knex?

Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use. It features both traditional node style callbacks as well as a promise interface for cleaner async flow control, a stream interface, full featured query and schema builders, transaction support (with savepoints), connection pooling and standardized responses between different query clients and dialects.


## Prerequisites
* Make sure You had been install NodeJs in your system https://nodejs.org/
* This project uses the mysql database  https://www.mysql.com


## Installation & Configuration



* Edit Connection Database with your Database in
```
.env
```
* Run Server
```
npm run dev
```
* This API Work on Port `9100` You can change according to the port you want

## Support Me :)
* Star this repository :star:

## License

MIT

# Northcoders News API

## Files you need to create

You will need to create 2 .env files, one for connecting to the development database `nc_news` and one for the test database `nc_news_test`.

The two files should be `.env.development` and `.env.test` and will need to contain a an assignment to which database to connect to, `PGDATABASE = nc_news` and `PGDATABASE = nc_news_test` respectively.

## What must be installed to connect to databases:

In order to connect locally to the two databases, the following packages must be installed.

Firstly the node-postgres package. This is a package of node modules that contains all the necessary methods for creating a connection and communicating with the database via psql.

To install, do the following:

```
npm install pg
```

The second package to be installed is the "dotenv" package. This is to allow dynamic connection to either of the 2 local databases depending on the environment you run it in, either dev or test.

To install, do the following:

```
npm install dotenv
```

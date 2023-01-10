const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const { graphqlHTTP } = require('express-graphql');

const port = process.env.PORT || 8000;
const app = express();

connectDB();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, console.log(`server running on port ${port}`));

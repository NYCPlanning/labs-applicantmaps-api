const fortuneHTTP = require('fortune-http');
const jsonApiSerializer = require('fortune-json-api');
const express = require('express');
const cors = require('cors');
const store = require('./store');

const app = express();

const listener = fortuneHTTP(store, {
  serializers: [
    [
      jsonApiSerializer,
      {
        uriTemplate: '{/type,ids,relatedField,relationship}{?query*}',
        allowLevel: [
          ['GET'], // Index
          ['POST'], // Collection
          ['GET', 'PATCH', 'DELETE'], // Records
          ['GET'], // Related
          ['GET', 'POST', 'PATCH', 'DELETE'], // Relationship
        ],
      },
    ],
    // fortuneHTTP.HtmlSerializer,
    // fortuneHTTP.FormUrlEncodedSerializer,
  ],
});

app.use(cors());
app.use('/', (...args) => listener(...args).catch(error => ({ error })));

module.exports = app;

const fortuneHTTP = require('fortune-http');
const jsonApiSerializer = require('fortune-json-api');
const express = require('express');
const cors = require('cors');
const store = require('./store');
const exportPDF = require('./routes/export-pdf');

const app = express();

const listener = fortuneHTTP(store, {
  serializers: [
    [jsonApiSerializer],
    fortuneHTTP.HtmlSerializer,
    fortuneHTTP.FormUrlEncodedSerializer,
  ],
});

app.use(cors());

app.use('/export-pdf', exportPDF);

app.use('/', (...args) => listener(...args).catch((error) => {
  console.error(error); // eslint-disable-line
}));

module.exports = app;

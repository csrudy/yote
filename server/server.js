const express = require('express');
const path = require('path');
const app = express();
const rp = require('request-promise');

//api call to get lastest data
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    start: 1,
    limit: 100,
    convert: 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': '5be5571c-9b17-45bd-9cfd-b30931103576'
  },
  json: true,
  gzip: true
};

// app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
  // rp(requestOptions).then(response => {
  //   console.log('API call response:', response);
  // }).catch((err) => {
  //   console.log('API call error:', err.message);
  // });
  res.sendFile(path.join(__dirname, '../index.html'));
})

app.listen(3000);
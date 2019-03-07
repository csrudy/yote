const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const controller = require('../controller')
const bodyParser = require('body-parser');
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/:uuid?', (req, res) => {
  // rp(requestOptions).then(response => {
  //   fs.writeFile('history.json', JSON.stringify(response), (err=> {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log('file saved!')
  //     }
  //   }))
  //   console.log('API call response:', response);
  // }).catch((err) => {
  //   console.log('API call error:', err.message);
  // });
  res.sendFile(path.join(__dirname, '../index.html'));
})

app.post('/api/v1/users', controller.createUser)

app.post('/trades', controller.trade);

app.get('/api/v1/historicals', (req, res) => {
  res.sendFile(path.join(__dirname, '../history.json'))
})

app.get('/api/v1/wallet', controller.wallet);

app.listen(3000);
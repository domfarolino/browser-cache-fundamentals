'use strict';

const express = require('express');
const onHeaders = require('on-headers');
const app = express();
const logger = require('morgan');

app.use(logger('dev'));

// app.set('etag', 'strong');

app.get('*', (request, response, next) => {
  response.set({
    'Cache-Control': 'max-age=10, must-revalidate',
    'ETag': 'v1',
    // 'Expires': 'Tue, 27 Dec 2016 20:49:49 GMT',
    // 'Last-Modified': 'Tue, 27 Dec 2016 20:49:59 GMT',
  });

  // Remove bs headers
  response.removeHeader('X-Powered-By');

  next();
});

function removeCacheHeaders() {
  // this.removeHeader('Cache-Control');
  // this.removeHeader('ETag');

  this.removeHeader('Expires');
  this.removeHeader('Last-Modified');
}

const useETag = false;
app.use(express.static('public', {
  setHeaders: function(response, path) {
    onHeaders(response, removeCacheHeaders);
  }
}));

app.listen('8080');
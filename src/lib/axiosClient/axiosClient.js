const axios = require('axios');
const { SMS_PROVIDER_ENDPOINT } = require('../../../config')

module.exports = axios.create({
  baseURL: SMS_PROVIDER_ENDPOINT,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
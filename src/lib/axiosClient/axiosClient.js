const axios = require('axios');
const { SMS_PROVIDER_ENDPOINT, SMS_PROVIDER_API_KEY } = require('../../../config')

module.exports = axios.create({
  baseURL: SMS_PROVIDER_ENDPOINT,
  timeout: 9000,
  headers: {}
});

/*
-- CURL SAMPLE: 
curl --data "apikey=221dee48f87f53f4748f0537e56929f4&number=09663085638&message=I just sent my first bulk message with Semaphore" https://semaphore.co/api/v4/messages

response 
*/
const express = require('express')
const app = express()

const { PORT, IP_ADDRESS } = require('../config');
const { getLocalIpAddress, mySqlPool } = require('./lib')

const express_app_ip_address = getLocalIpAddress || IP_ADDRESS;
console.log('MySqlPool: ', mySqlPool )
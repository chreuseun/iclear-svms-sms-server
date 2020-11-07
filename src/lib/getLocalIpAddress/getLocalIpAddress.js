'use strict';

const { networkInterfaces } = require('os');
const nets = networkInterfaces();

const wifi = nets['Wi-Fi']
const parseIpV4 = wifi.find(_wifi => _wifi.family === 'IPv4') || {}
const IpV4 = parseIpV4.address || ''

module.exports = IpV4;

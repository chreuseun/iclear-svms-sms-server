'use strict';

const { networkInterfaces, platform } = require('os');
const nets = networkInterfaces();

const defaultIp= '127.0.0.1'

const windowsOps =  () => {
    try{
    const wifi = nets['Wi-Fi']
    const parseIpV4 = wifi.find(_wifi => _wifi.family === 'IPv4');

    const {address =''} = parseIpV4 || {}
    return  address || defaultIp

    }catch(e){
        return defaultIp
    }
    }

const macOps =  () => {
    try{
        const wifi = nets['en0']
        const parseIpV4 = wifi.find(_wifi => _wifi.family === 'IPv4');
        const {address =''} = parseIpV4 || {}
        return  address || defaultIp
    }catch(e){
        return defaultIp
    }


}


const OPERATING_SYS =  {
    darwin: macOps,
    win32: windowsOps,
    win64: windowsOps,
    linux: macOps
}

const empt = () => {
    console.log('NO IP EMPTY ERROR')

    return defaultIp
}

const osNetwork = OPERATING_SYS[platform()] ||  empt;
const IP_V4 = osNetwork();

console.log('READING DATA TO: ',IP_V4)

module.exports = IP_V4;

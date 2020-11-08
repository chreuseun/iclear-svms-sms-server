const SMS_PROVIDER_ENDPOINT = `https://api.semaphore.co/api/v4`
const SMS_PROVIDER_API_KEY = `221dee48f87f53f4748f0537e56929f4`
const PORT = `7070`;
const IP_ADDRESS = `192.168.254.105`;
const MYSQL_POOL_CREDENTIALS = {
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'dev',
  password        : 'devPASS',
  database        : 'iclear_svms_db',
  multipleStatements: true
}

const SMS_TEMPLATE = `Hi, DYCI received the payment of Php 1000.00 for <STUDENT_NAME> this <DATE> balance, thank you.` 

module.exports.SMS_TEMPLATE = SMS_TEMPLATE
module.exports.SMS_PROVIDER_API_KEY = SMS_PROVIDER_API_KEY;
module.exports.SMS_PROVIDER_ENDPOINT = SMS_PROVIDER_ENDPOINT;
module.exports.MYSQL_POOL_CREDENTIALS = MYSQL_POOL_CREDENTIALS;
module.exports.PORT = PORT;
module.exports.IP_ADDRESS = IP_ADDRESS;

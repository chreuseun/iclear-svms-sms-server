const { mySql } = require('./handlers');
const { axiosClient, httpSendSMS } = require('./lib');
const { SMS_TEMPLATE, SMS_PROVIDER_ENDPOINT , SMS_PROVIDER_API_KEY} = require('../config')
const axios = require('axios');


const client=axios.create({
  baseURL: SMS_PROVIDER_ENDPOINT,
  timeout: 9000,
  headers: {}
});

const runSmsServer = async() => {
 const getUnsentMessages = await  mySql.tables.upload_payment_history.getAllUnsentMessages();

 const { data, error } = getUnsentMessages;

  if(error){
    console.log('Get usent messages error')
    return
  }

  if(data.length > 0 && !error){
    console.log({unsent_messages: data.length, error, data })

    const {
      id,
      studentUsername,
      amount,
      paymentDate,
      uploaded_by,
      created_at,
      updated_at,
      is_sms,
      sms_provider_service_id,
      studfname,
      studmname,
      studlname
    } = data || {}


    setTimeout(()=>{
      runSmsServer();
    },3000)
  
  }else{
    
    setTimeout(()=>{
      runSmsServer();
    },1000)
  }
}


runSmsServer()

// httpSendSMS({message: SMS_TEMPLATE, contact_number:'9663085638'});







const { mySql } = require('./handlers');
const { httpSendSMS, messageTemplate } = require('./lib');
const axios = require('axios');

const create_student_name =  ({ studfname , studmname, studlname, studentUsername }) =>{
  return studfname && studlname && studentUsername ? 
  (`${studentUsername}-${studfname} ${studmname ? `${studmname} ` : ''}${studlname}`).toUpperCase() : ''
};

const create_payment_date = ({ paymentDate }) => {
  return paymentDate ? paymentDate.toUpperCase() : '';
};

const create_payment_amount = ({ amount }) => {
  return amount ? `Php ${amount}` : ''
}


const runSmsServer = async() => {
  const dataNow = new Date().toString();

  // get one unsent message from db
  const getUnsentMessages = await  mySql.tables.upload_payment_history.getAllUnsentMessages(); 
  const { data, error } = getUnsentMessages;

  // if has unread message then compose sms
  if(data.length > 0 && !error){

    const {
      id,
      studentUsername = '',
      amount,
      paymentDate = '',
      studfname = '',
      studmname = '',
      studlname = '',
      familyphone =''
    } = data[0] || {}

    const student_name = create_student_name({ studentUsername, studlname, studmname, studfname });
    const payment_date =  create_payment_date({ paymentDate });
    const payment_amount =  create_payment_amount({ amount });

    // compose message for SMS
    const message = messageTemplate({ payment_amount, payment_date, student_name });
    
    // http request to send the SMS
    const httpSendResult = await httpSendSMS({ message: message || '', contact_number:familyphone });
    const { messageStatus , message_id , created_at} = httpSendResult || {}
 
    

    // update upload id to message is sent
    let _updateSMSmessageData = {};
    if(messageStatus === 'OK' && message_id ){
      const sms_provider_service_id = message_id && created_at ? JSON.stringify({ message_id: message_id|| '', created_at: created_at|| '' }) : null;
      const updateSmsServiceId = await  mySql.tables.upload_payment_history.updateSmsServiceId({ id , sms_provider_service_id : sms_provider_service_id });
      const { data : updateSMSmessageData = {}, error: updateSMSmessageError } = updateSmsServiceId || {}; 
      _updateSMSmessageData= updateSMSmessageData ? {...updateSMSmessageData, updateSMSmessageError} :  {}
    }

    const { affectedRows, updateSMSmessageError } = _updateSMSmessageData || {}

    console.log(`${dataNow} SMS sending log : `, { 
      message ,
      upload_payment_history_id: id ,
      contact_number: familyphone,
      has_updated_in_db: affectedRows ? true : false,
      get_unread_message_error: error,
      updateSMSmessageError,
      messageStatus,
      message_id,
      http_sent_msg_at: created_at
     });

    setTimeout(()=>{
      runSmsServer();
    },3000)
  }else{ // recheck in db if has error
    console.log(`${dataNow} SMS SERVER NO MESSAGE TO SEND`)
    setTimeout(()=>{
      runSmsServer();
    },3000)
  }
}

runSmsServer();
const testSMS = async () => {
  const httpSendResult = await httpSendSMS({message: 'ahahah', contact_number:'9663085638'});

  const { messageStatus , message_id , created_at} = httpSendResult || {}

  console.log(message_id, messageStatus, created_at)
}


// testSMS()







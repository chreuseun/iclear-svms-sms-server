const { SMS_PROVIDER_API_KEY } = require('../../../config')
const axiosClient = require('../axiosClient')

module.exports = async({ message, contact_number }) =>{
  const smsApiRespone = await axiosClient.post(
    '/messages',  
    {
      apikey: SMS_PROVIDER_API_KEY,
      number: contact_number,
      message: message 
    }, 
    {});

  const { data } = smsApiRespone
  const { message_id, status: messageStatus, recipient, created_at } = data[0] || {};
  const message_status = ['Queued', 'Pending', 'Sent'];


  if(message_id  &&  message_status.indexOf(messageStatus) > -1){
    
    const returnValue = {
      recipient,
      message_id,
      messageStatus : 'OK',
      created_at
    }

    // console.log('MESSAGE SENT: ', returnValue);

    return returnValue
  }else{
    // console.log('MESSAGE FAILED: ', {
    //   recipient,
    //   message_id,
    //   messageStatus,
    // } )

    return false
  }
};


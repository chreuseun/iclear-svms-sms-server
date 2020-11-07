const {mySql} = require('./handlers');
const getLocalIpAddress = require('./lib/getLocalIpAddress');

const runSmsServer = async() => {
 const getUnsentMessages = await  mySql.tables.upload_payment_history.getAllUnsentMessages();

 const {data , error} = getUnsentMessages

  if(error){
    console.log('Get usent messages error')
    return
  }


  if(data.length > 0){
    console.log({unsent_messages: data.length, error })

    setTimeout(()=>{
      runSmsServer();
    },3000)
  
  }else{
    
    setTimeout(()=>{
      runSmsServer();
    },1000)
  }

}


runSmsServer();







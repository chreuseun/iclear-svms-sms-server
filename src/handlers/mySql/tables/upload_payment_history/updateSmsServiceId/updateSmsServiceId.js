const { mySqlPool } = require('./../../../../../lib')

const sql = `
  UPDATE  upload_payment_history
  SET sms_provider_service_id = ?
  WHERE id = ?;
`

const handleResolve = ({data = [], resolve, error = false}) => {
  resolve({data, error})
}


module.exports = ({ id = '', sms_provider_service_id = null }) =>  new Promise( (resolve, reject) => {
  mySqlPool.getConnection( (err, connection) => {
    if(err) {
      handleResolve({
        data:[],
        resolve,
        error:true
      })
    }
  
    connection.query( sql ,[ sms_provider_service_id, id ],  (error, results, fields) => {
      connection.release();

      if(results){
        handleResolve({
          data:results || [],
          resolve,
          error:false
        })
      }

      if (error){
        handleResolve({
          data: [],
          resolve,
          error:true
        })
      };
  
    });
  });
})




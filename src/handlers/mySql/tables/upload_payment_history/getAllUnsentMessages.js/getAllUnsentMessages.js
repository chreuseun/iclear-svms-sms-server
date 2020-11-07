const { mySqlPool } = require('./../../../../../lib')

const sql = `
  SELECT * FROM upload_payment_history WHERE sms_provider_service_id IS NULL;
`

const handleResolve = ({data = [], resolve, error = false}) => {
  resolve({data, error})
}


module.exports = () =>  new Promise( (resolve, reject) => {
  mySqlPool.getConnection( (err, connection) => {
    if(err) {
      handleResolve({
        data:[],
        resolve,
        error:true
      })
    }
  
    connection.query( sql,  (error, results, fields) => {
      // When done with the connection, release it.
      connection.release();

      if(results){
        handleResolve({
          data:results || [],
          resolve,
          error:false
        })
      }

      // Handle error after the release.
      if (error){
        handleResolve({
          data: [],
          resolve,
          error:true
        })
      };
  
      // Don't use the connection here, it has been returned to the pool.
    });
  });
})




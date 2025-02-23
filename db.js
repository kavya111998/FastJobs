function queryTestDb(query, config) {
    const mysql = require('mysql2');
    
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'fastco',
      password: 'fastco2023',
      database: 'fastco',
      authPlugin: 'caching_sha2_password'
  });
  connection.connect((err) => {
      if (err) throw err;
      console.log('CONNECTED!');
  });
  return new Promise((resolve, reject) => {
      connection.query(query, (error, results) =>{
          if (error) reject(error)
          else {
              connection.end()
              return resolve(results)
          }
      })
  });
}

module.exports = { queryTestDb };
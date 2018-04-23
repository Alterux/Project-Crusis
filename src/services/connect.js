import * as mysql from 'mysql';

// Setup database server reconnection when server timeouts connection:
let connection: Function = mysql.createConnection;
function connect(): Function {
  connection = mysql.createConnection({
    host: 'mysql.stud.iie.ntnu.no',
    user: 'g_oops_27',
    password: 'lOrrO9HI',
    database: 'g_oops_27'
  });

  // Connect to MySQL-server
  connection.connect((error: string) => {
    if (error) throw error; // If error, show error in console and return from this function
  });

  // Add connection error handler
  connection.on('error', (error: Error) => {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') { // Reconnect if connection to server is lost
      connect();
    }
    else {
      throw error;
    }
  });
}
connect();

export { connection };

// @flow
import * as mysql from 'mysql';

// Setup database server reconnection when server timeouts connection:
let connection;
function connect() {
  connection = mysql.createConnection({
    host: 'mysql.stud.iie.ntnu.no',
    user: 'g_oops_27',
    password: 'lOrrO9HI',
    database: 'g_oops_27'
  });

  // Connect to MySQL-server
  connection.connect((error) => {
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

class User {
  id: number;
  email: string;
  password: number;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
}

class Event {
  id: number;
  text: string;
  fromUserId: number;
  toUserId: number;
  fromUser: string;
  toUser: string;
}

class UserService {
  signIn(email: string, password: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Users where email=? AND password=?', [email, password], (error, result) => {
        if(error) {
          reject(error);
          return;
        }
        if(result.length!=1) {
          reject(new Error('Result length was not 1'))
          return;
        }

        localStorage.setItem('signedInUser', JSON.stringify(result[0])); // Store User-object in browser
        resolve();
      });
    });
  }

  signUp(email: string, password: number, firstName: string, lastName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Users (email, password, firstName, lastName) VALUES (?, ?, ?, ?);', [email, password, firstName, lastName], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  getSignedInUser(): ?User {
    let item = localStorage.getItem('signedInUser'); // Get User-object from browser
    if(!item) return null;

    return JSON.parse(item);
  }

  getMembers(id: number): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Users where id!=?', [id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  getEvents(): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Events', (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }
}

let userService = new UserService();

export { User, Event, userService };

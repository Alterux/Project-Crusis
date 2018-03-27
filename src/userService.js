// @flow
import * as mysql from 'mysql';
import { connection } from './connect';

class User {
  id: number;
  userType: number;
  email: string;
  password: number;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
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
        localStorage.setItem('userType', result[0].userType); // Store User-object in browser
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

  getUserType(): ?User {
    let item = localStorage.getItem('userType'); // Get User-object from browser
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

  getUser(id: number): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Users where id=?', [id], (error, result) => {
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

export { User, userService };
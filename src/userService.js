// @flow
import * as mysql from 'mysql';
import { connection } from './connect';

import { lang, en, no } from './lang';

class User {
  id: number;
  userType: number;
  email: string;
  password: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
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
          reject(new Error(lang.errorLogin))
          return;
        }

        if(result[0].userType === 0) {
          reject(new Error(lang.errorLoginNewUser))
        }

        if(result[0].userType < 0) {
          reject(new Error(lang.errorLoginDeletedUser))
          return;
        }

        localStorage.setItem('signedInUser', JSON.stringify(result[0])); // Store User-object in browser
        resolve();
      });
    });
  }

  signUp(email: string, password: number, firstName: string, middleName: string, lastName: string, birthDate: string, city: string): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Users (email, password, firstName, middleName, lastName, birthDate, city) VALUES (?, ?, ?, ?, ?, ?, ?);',
      [email, password, firstName, middleName, lastName, birthDate, city], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  editUser(firstName: string, middleName: string, lastName: string, birthDate: string, city: string, userType: number, id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Users SET firstName=?, middleName=?, lastName=?, birthDate=?, city=?, userType=? WHERE id=?;',
      [firstName, middleName, lastName, birthDate, city, userType, id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  editUserType(userType: number, id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Users SET userType=? WHERE id=?;', [userType, id], (error, result) => {
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
      connection.query('SELECT * FROM Users where id!=? AND userType>0', [id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  getNewMembers(id: number): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Users where id!=? AND userType=0', [id], (error, result) => {
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

  deleteUser(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Users WHERE id=?;', [id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}

let userService = new UserService();

export { User, userService };

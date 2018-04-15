// @flow
import * as mysql from 'mysql';
import { connection } from './connect';

import { lang, en, no } from '../util/lang';

class User {
  id: number;
  userType: number;
  points: number;
  phone: number;
  email: string;
  password: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  address: string;
  postcode: number;
  city: string;
  competence: string;
}

class UserService {
  signIn(email: string, password: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM User where email=? AND password=?', [email, password], (error, result) => {
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

  signUp(email: string, password: number, phone: number, firstName: string, middleName: string, lastName: string, birthDate: string, address: string, postcode: number, city: string): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO User (email, password, phone, firstName, middleName, lastName, birthDate, address, postcode, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [email, password, phone, firstName, middleName, lastName, birthDate, address, postcode, city], (error, result) => {
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
      connection.query('UPDATE User SET firstName=?, middleName=?, lastName=?, birthDate=?, city=?, userType=? WHERE id=?;',
      [firstName, middleName, lastName, birthDate, city, userType, id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  editCompetence(competence: string, id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE User SET competence=? WHERE id=?;', [competence, id], (error, result) => {
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
      connection.query('UPDATE User SET userType=? WHERE id=?;', [userType, id], (error, result) => {
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
      connection.query('SELECT * FROM User where id!=? AND userType>0', [id], (error, result) => {
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
      connection.query('SELECT * FROM User where id!=? AND userType=0', [id], (error, result) => {
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
      connection.query('SELECT * FROM User where id=?', [id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  checkEmail(email: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM User WHERE email=?', [email], (error, result) => {
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
      connection.query('DELETE FROM User WHERE id=?;', [id], (error, result) => {
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

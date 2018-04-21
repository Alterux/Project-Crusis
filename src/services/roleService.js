// @flow
import * as mysql from 'mysql';
import { connection } from './connect';

import { lang, en, no } from '../util/lang';

class Role {
  id: number;
  name: string;
}

class EventRole {
  id: number;
  name: string;
  event_id: number;
  role_id: number;
  quantity: string;
}

class RoleService {
  getRoles(): Promise<Role[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Role', (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  getEventRoles(event_id: number): Promise<EventRole[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT r.id, r.name, quantity FROM EventRole, Role r WHERE role_id = r.id AND event_id=?', [event_id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  createEventRole(event_id: number, role_id: number, quantity: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO EventRole (event_id, role_id, quantity) VALUES (?, ?, ?)',
       [event_id, role_id, quantity], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  removeEventRole(event_id: number, role_id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM EventRole WHERE event_id=? AND role_id=?', [event_id, role_id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }
}

let roleService = new RoleService();

export { Role, EventRole, roleService };

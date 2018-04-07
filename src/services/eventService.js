// @flow
import * as mysql from 'mysql';
import { connection } from './connect';

class Event {
  id: number;
  name: string;
  location: string;
  city: string;
  startDate: Date;
  endDate: Date;
  time: string;
}

class Participant {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

// SELECT id, firstName, middleName, lastName
// FROM Users u, Participants
// WHERE u.id = users_id

class EventService {
  getEvents(): Promise<Event[]> {
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

  getEvent(id: number): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Events WHERE id=?', [id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  getParticipants(id: number): Promise<Participant[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Users u, Participants WHERE u.id = users_id AND events_id = ?', [id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }
}

let eventService = new EventService();

export { Event, eventService }

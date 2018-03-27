// @flow
import * as mysql from 'mysql';
import { connection } from './connect';

class Event {
  id: number;
  text: string;
  fromUserId: number;
  toUserId: number;
  fromUser: string;
  toUser: string;
}

class EventService {
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

let eventService = new EventService();

export { Event, eventService }

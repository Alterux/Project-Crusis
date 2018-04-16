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
  details: string;
}

class Interested {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

class Participant {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

class EventService {
  getEvents(): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Event', (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  getUserEvents(id: number): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Event e, Participant WHERE e.id = event_id AND user_id = ?', [id], (error, result) => {
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
      connection.query('SELECT * FROM Event WHERE id=?', [id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  searchEvents(name: string): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Event WHERE name LIKE "%"?"%"', [name], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  editEvent(id: number, name: string, location: string, city: string, startDate: string, endDate: string, details: string): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Event SET name=?, location=?, city=?, startDate=?, endDate=?, details=? WHERE id=?;',
      [name, location, city, startDate, endDate, details, id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  getInterested(id: number): Promise<Interested[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM User u, Interested WHERE u.id = user_id AND event_id = ?', [id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  applyEvent(user_id: number, event_id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Interested (user_id, event_id) VALUES (?, ?)', [user_id, event_id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  unapplyEvent(user_id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Interested WHERE user_id=?', [user_id], (error, result) => {
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
      connection.query('SELECT * FROM User u, Participant WHERE u.id = user_id AND event_id = ?', [id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  createEvent(newEvent: Event): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO `Event` ( `name`, `location`, `city`, `startDate`, `endDate`, `details`) VALUES (?, ?, ?, ?, ?, ?)',
       [newEvent.name, newEvent.location, newEvent.city, newEvent.startDate, newEvent.endDate, newEvent.details], (error, result) => {
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

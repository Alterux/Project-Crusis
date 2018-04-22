// @flow
import * as mysql from 'mysql';
import { connection } from './connect';

class Event {
  id: number;
  name: string;
  details: string;
  equipment: string;
  address: string;
  postcode: number;
  city: string;
  attendanceDate: Date;
  startDate: Date;
  endDate: Date;
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

  getUserInterests(id: number): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Event e, Interested WHERE e.id = event_id AND user_id = ?', [id], (error, result) => {
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

  unapplyEvent(user_id: number, event_id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Interested WHERE user_id=? AND event_id = ?', [user_id, event_id], (error, result) => {
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

  editEvent(name: string, details: string, equipment: string, address: string, postcode: number, city: string, attendanceDate: string, startDate: string, endDate: string, id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Event SET name=?, details=?, equipment=?, address=?, postcode=?, city=?, attendanceDate=?, startDate=?, endDate=? WHERE id=?',
       [name, details, equipment, address, postcode, city, attendanceDate, startDate, endDate, id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  createEvent(name: string, details: string, equipment: string, address: string, postcode: number, city: string, attendanceDate: string, startDate: string, endDate: string): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Event (name, details, equipment, address, postcode, city, attendanceDate, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
       [name, details, equipment, address, postcode, city, attendanceDate, startDate, endDate], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  deleteEvent(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Event WHERE id=?', [id], (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

  getCreatedEvent(): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Event WHERE id = LAST_INSERT_ID()', (error, result) => {
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

'use strict';

const sqlite3 = require('sqlite3').verbose();

let db = null;

module.exports = {
  connect: (file) => {
    db = new sqlite3.Database(file);
  },

  getTables: () => {
    return new Promise((resolve, reject) => {
      if (!db) reject();
      db.all('SELECT * FROM sqlite_master where type="table"', (err, res) => {
        resolve(res);
      })
    });
  }
}

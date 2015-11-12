'use strict';

const sqlite3 = require('sqlite3').verbose();

let db = null;

module.exports = {
  connect: (file) => {
    db = new sqlite3.Database(file);
  },

  execute: (sql) => {
    return new Promise((resolve, reject) => {
      if (!db) reject();
      db.all(sql, (err, res) => {
        resolve(res);
      })
    });
  },

  getTables: function() {
    return this.execute('SELECT * FROM sqlite_master where type="table"');
  },

  getTable: function(name) {
    return this.execute(`SELECT * FROM ${name}`);
  }
}

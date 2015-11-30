const ipc = window.require('ipc');

import {EventEmitter, NgZone} from 'angular2/angular2';
import {Injectable} from 'angular2/angular2';

@Injectable()
export class Table {
  constructor(_zone) {
    this._zone = _zone;
    this.name = null;
    this.rows = null;
    this.keys = null;
    this.onStructure = this.onStructure.bind(this);
    this.onContent = this.onContent.bind(this);
    this.emitter = new EventEmitter();
    ipc.on('table-structure', this.onStructure);
    ipc.on('table-content', this.onContent);
  }

  use(name) {
    this.name = name;
    this.getStructure();
  }

  getStructure() {
    ipc.send('get-table-structure', this.name);
  }

  getContent() {
    ipc.send('get-table-content', this.name);
  }

  onStructure(data) {
    this.structure = data;
    this.keys = data.map((field) => {
      return field.name;
    });
    this.emitter.next();
  }

  onContent(data) {
    this._zone.run(() => {
      this.rows = data;
    });
  }
};

Table.parameters = [[NgZone]];

const ipcRenderer = window.require('electron').ipcRenderer;

import {EventEmitter, NgZone} from 'angular2/angular2';
import {Injectable} from 'angular2/angular2';

@Injectable()
export class Table {
  constructor(_zone) {
    this._zone = _zone;
    this.onContent = this.onContent.bind(this);
    this.emitter = new EventEmitter();
    ipcRenderer.on('table-content', this.onContent);
  }

  onInit() {
    this.name = null;
    this.structure = null;
    this.rows = null;
    this.keys = null;
  }

  use(name) {
    this.name = name;
    this.structure = null;
    this.rows = null;
    this.keys = null;
    this.getStructure();
  }

  getStructure() {
    if (!this.structure) {
      const data = ipcRenderer.sendSync('get-table-structure-sync', this.name);
      this.structure = data;
      this.keys = data.map((field) => {
        return field.name;
      });
    }
  }

  getContent() {
    ipcRenderer.send('get-table-content', this.name);
  }

  onContent(event, data) {
    this._zone.run(() => {
      this.rows = data;
    });
  }
};

Table.parameters = [[NgZone]];

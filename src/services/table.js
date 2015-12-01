const ipcRenderer = window.require('electron').ipcRenderer;

import {Injectable} from 'angular2/angular2';

@Injectable()
export class Table {
  constructor() {
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
    const data = ipcRenderer.sendSync('get-table-content-sync', this.name);
    this.rows = data;
  }
};

const ipc = window.require('ipc');

import {NgZone} from 'angular2/angular2';
import {Injectable} from 'angular2/angular2';

@Injectable()
export class Table {
  constructor(_zone) {
    this._zone = _zone;
    this.name = null;
    this.content = null;
    this.keys = null;
    this.onContent = this.onContent.bind(this);
    ipc.on('table-content', this.onContent);
  }

  use(name) {
    this.name = name;
  }

  getContent() {
    ipc.send('get-table-content', this.name);
  }

  onContent(data) {
    this._zone.run(_ => {
      this.content = data;
      this.keys = Object.keys(this.content[0]);
    })
  }
};

Table.parameters = [[NgZone]];

import {CORE_DIRECTIVES, Component} from 'angular2/angular2';

import {Table} from '../../services/table';
import {GridTable} from '../grid_table/grid_table';

@Component({
  selector: 'table-content-component',
  template: '<grid-table *ng-if="resolved" [fields]="fields" [rows]="rows"></grid-table>',
  directives: [CORE_DIRECTIVES, GridTable]
})
export class TableContentCmp {
  constructor(table) {
    this.table = table;
    this.resolved = false;
  }

  onActivate() {
    this.table.getContent();
    this.fields = this.table.keys.map((field) => {
      return {name: field, title: field};
    });
    this.rows = this.table.rows;
    this.resolved = true;
  }
}

TableContentCmp.parameters = [[Table]];

import {CORE_DIRECTIVES, Component} from 'angular2/angular2';

import {Table} from '../../services/table';

@Component({
  selector: 'table-content-component',
  templateUrl: 'src/components/table_content/content.html',
  directives: [CORE_DIRECTIVES]
})
export class TableContentCmp {
  constructor(table) {
    this.table = table;
    this.table.getContent();
  }

  getContent() {
    this.rows = this.table.content;
    if (this.rows.length) {
      this.keys = Object.keys(this.rows[0]);
    }
  }
}

TableContentCmp.parameters = [[Table]];


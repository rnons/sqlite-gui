import {CORE_DIRECTIVES, Component} from 'angular2/angular2';
import {RouteParams, RouteConfig, RouterOutlet} from 'angular2/router';

import {Table} from '../../services/table';
import {TableContentCmp} from '../table_content/table_content';
import {TableStructureCmp} from '../table_structure/table_structure';


@Component({
  selector: 'table-component',
  template: '<router-outlet></router-outlet>',
  directives: [CORE_DIRECTIVES, RouterOutlet]
})
@RouteConfig([
  { path: '', component: TableContentCmp, as: 'Content', data: {name: 'Content'} },
  { path: '/structure', component: TableStructureCmp, as: 'Structure', data: {name: 'Structure'} }
])
export class TableOutlet {
  constructor(params, table) {
    this.name = params.get('name');
    table.use(this.name);
  }
};

TableOutlet.parameters = [[RouteParams], [Table]];

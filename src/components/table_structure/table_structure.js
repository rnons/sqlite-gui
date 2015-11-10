import {CORE_DIRECTIVES, Component} from 'angular2/angular2';

@Component({
  selector: 'table-structure-component',
  templateUrl: 'src/components/table_structure/structure.html',
  directives: [CORE_DIRECTIVES]
})
export class TableStructureCmp {
  constructor() {
  }
}


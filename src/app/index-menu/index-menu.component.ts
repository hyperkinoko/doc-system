import {Component, Inject, OnInit} from '@angular/core';
import {IndexNode, MD_INDEX} from '../../assets/data/md-index';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  route: string;
}

@Component({
  selector: 'app-index-menu',
  templateUrl: './index-menu.component.html',
  styleUrls: ['./index-menu.component.scss']
})
export class IndexMenuComponent implements OnInit {
  private _transformer = (node: IndexNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      route: node.route
    };
  }
  
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
  
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
  constructor(
    @Inject(MD_INDEX) private mdIndex: IndexNode[]
  ) {
    this.dataSource.data = this.mdIndex;
  }
  
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }

}

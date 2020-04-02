import {Component, Inject, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {IndexNode, MD_INDEX} from './index-menu.service';

@Component({
  selector: 'app-index-menu',
  templateUrl: './index-menu.component.html',
  styleUrls: ['./index-menu.component.scss']
})
export class IndexMenuComponent implements OnInit {
  treeControl = new NestedTreeControl<IndexNode>(node => node.children);
  
  dataSource = new MatTreeNestedDataSource<IndexNode>();
  
  constructor(
    @Inject(MD_INDEX) private mdIndex: IndexNode[]
  ) {
    this.dataSource.data = this.mdIndex;
  }
  
  hasChild = (_: number, node: IndexNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
  }

}

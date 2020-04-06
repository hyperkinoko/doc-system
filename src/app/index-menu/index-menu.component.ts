import {Component, Inject, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {IndexMenuService, MdIndexNode} from './index-menu.service';

@Component({
  selector: 'app-index-menu',
  templateUrl: './index-menu.component.html',
  styleUrls: ['./index-menu.component.scss']
})
export class IndexMenuComponent implements OnInit {
  treeControl = new NestedTreeControl<MdIndexNode>(node => node.children);
  
  dataSource = new MatTreeNestedDataSource<MdIndexNode>();
  
  constructor(
    private indexMenuService: IndexMenuService
  ) {
    this.indexMenuService.mdIndex.subscribe((nodes: MdIndexNode[] ) => {
      this.dataSource.data = nodes;
    });
  }
  
  hasChild = (_: number, node: MdIndexNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
  }

}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IndexMenuService} from '../index-menu/index-menu.service';

@Component({
  selector: 'app-md-viewer',
  templateUrl: './md-viewer.component.html',
  styleUrls: ['./md-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MdViewerComponent implements OnInit {
  mdBase = '/md-files/';
  mdUrl = 'index.md';
  mdFullPath: string;

  constructor(
    private route: ActivatedRoute,
    private indexMenuService: IndexMenuService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const path = params.get('path');
      this.mdUrl = path.replace(/--/gi, '/') + '.md';
      this.mdFullPath = this.mdBase + this.mdUrl;
    });
  }

}

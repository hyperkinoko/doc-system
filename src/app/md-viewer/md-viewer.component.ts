import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IndexMenuService} from '../index-menu/index-menu.service';
import {DOCS_BASE_PATH} from '../../../configure';

@Component({
  selector: 'app-md-viewer',
  templateUrl: './md-viewer.component.html',
  styleUrls: ['./md-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MdViewerComponent implements OnInit {
  mdUrl = 'index.md';
  mdFullPath: string;

  constructor(
    @Inject(DOCS_BASE_PATH) private mdBase: string,
    private route: ActivatedRoute,
    private indexMenuService: IndexMenuService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const path = params.get('path');
      if (path) {
        this.mdUrl = path.replace(/--/gi, '/') + '.md';
      }
      this.mdFullPath = this.mdBase + this.mdUrl;
    });
  }

}

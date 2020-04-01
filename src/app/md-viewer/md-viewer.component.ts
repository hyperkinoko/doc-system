import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-md-viewer',
  templateUrl: './md-viewer.component.html',
  styleUrls: ['./md-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MdViewerComponent implements OnInit {
  mdBase = 'https://in-osaka.pigumer.gr.jp/md-files/';
  mdUrl = this.mdBase + 'index.md';
  
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = (params.get('docId') || '');
      console.log('docId : ' + id);
    });
  }

}

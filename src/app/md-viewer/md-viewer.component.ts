import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-md-viewer',
  templateUrl: './md-viewer.component.html',
  styleUrls: ['./md-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MdViewerComponent implements OnInit {
  mdUrl = 'https://s3-ap-northeast-1.amazonaws.com/files-md.pigumer.com/markdown.md';
  
  constructor() { }

  ngOnInit(): void {
  }

}

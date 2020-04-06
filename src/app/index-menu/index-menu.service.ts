import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface MdIndexNode {
  name: string;
  path?: string;
  children?: MdIndexNode[];
}


@Injectable({
  providedIn: 'root'
})
export class IndexMenuService {
  private _mdIndex: Observable<MdIndexNode[]> = this.http.get<MdIndexNode[]>('https://in-osaka.pigumer.gr.jp/md-files/md-index.json');
  private _findedIndex: MdIndexNode;
  
  constructor(
    private http: HttpClient
  ) {}
  
  get mdIndex(): Observable<MdIndexNode[]> {
    return this._mdIndex;
  }
  
  private find(array: MdIndexNode[], path: string) {
    let result;
    array.some(o => result = o.path === path ? o : this.find(o.children || [], path));
    return result;
  }
  
  getIndexNodeByPath(path: string): MdIndexNode {
    // return this.find(this._mdIndex, path);
    this._mdIndex.subscribe((nodes: MdIndexNode[]) => {
      this._findedIndex = this.find(nodes, path);
    })
    return this._findedIndex;
  }
}

import {Inject, Injectable, InjectionToken} from '@angular/core';

export interface IndexNode {
  name: string;
  path?: string;
  children?: IndexNode[];
}

export const MD_INDEX = new InjectionToken<IndexNode[]>('md-index');

@Injectable({
  providedIn: 'root'
})
export class IndexMenuService {

  constructor(
    @Inject(MD_INDEX) private mdIndex: IndexNode[]
  ) { }
  
  private find(array: IndexNode[], path: string) {
    let result;
    array.some(o => result = o.path === path ? o : this.find(o.children || [], path));
    return result;
  }
  
  getIndexNodeByPath(path: string): IndexNode {
    return this.find(this.mdIndex, path);
  }
}

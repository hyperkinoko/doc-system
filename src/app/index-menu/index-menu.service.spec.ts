import { TestBed } from '@angular/core/testing';

import { IndexMenuService } from './index-menu.service';

describe('IndexMenuService', () => {
  let service: IndexMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

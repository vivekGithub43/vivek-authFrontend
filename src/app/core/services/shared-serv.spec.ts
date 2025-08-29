import { TestBed } from '@angular/core/testing';

import { SharedServ } from './shared-serv';

describe('SharedServ', () => {
  let service: SharedServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

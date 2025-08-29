import { TestBed } from '@angular/core/testing';

import { PostServ } from './post-serv';

describe('PostServ', () => {
  let service: PostServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

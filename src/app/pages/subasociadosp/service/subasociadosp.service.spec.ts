import { TestBed } from '@angular/core/testing';

import { SubasociadospService } from './subasociadosp.service';

describe('SubasociadospService', () => {
  let service: SubasociadospService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubasociadospService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

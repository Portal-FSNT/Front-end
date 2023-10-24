import { TestBed } from '@angular/core/testing';

import { ConvidadoService } from './convidado.service';

describe('ConvidadoService', () => {
  let service: ConvidadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvidadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

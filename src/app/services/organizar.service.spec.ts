import { TestBed } from '@angular/core/testing';

import { OrganizarService } from './organizar.service';

describe('OrganizarService', () => {
  let service: OrganizarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

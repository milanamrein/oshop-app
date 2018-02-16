import { TestBed, inject } from '@angular/core/testing';

import { OrderGuardService } from './order-guard.service';

describe('OrderGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderGuardService]
    });
  });

  it('should be created', inject([OrderGuardService], (service: OrderGuardService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authguredGuard } from './authgured.guard';

describe('authguredGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authguredGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

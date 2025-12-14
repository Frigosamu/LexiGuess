import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { editUsuarioGuard } from './edit-usuario-guard';

describe('editUsuarioGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => editUsuarioGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioLogroComponent } from './usuario-logro.component';

describe('UsuarioLogroComponent', () => {
  let component: UsuarioLogroComponent;
  let fixture: ComponentFixture<UsuarioLogroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioLogroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioLogroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

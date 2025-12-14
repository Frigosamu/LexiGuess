import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPalabra } from './editar-palabra';

describe('EditarPalabra', () => {
  let component: EditarPalabra;
  let fixture: ComponentFixture<EditarPalabra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPalabra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPalabra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPalabras } from './lista-palabras';

describe('ListaPalabras', () => {
  let component: ListaPalabras;
  let fixture: ComponentFixture<ListaPalabras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPalabras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPalabras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

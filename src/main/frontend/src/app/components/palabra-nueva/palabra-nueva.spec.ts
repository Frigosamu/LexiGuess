import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalabraNueva } from './palabra-nueva';

describe('PalabraNueva', () => {
  let component: PalabraNueva;
  let fixture: ComponentFixture<PalabraNueva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalabraNueva]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalabraNueva);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

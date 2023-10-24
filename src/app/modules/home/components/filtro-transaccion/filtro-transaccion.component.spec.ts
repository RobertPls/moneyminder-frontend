import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTransaccionComponent } from './filtro-transaccion.component';

describe('FiltroTransaccionComponent', () => {
  let component: FiltroTransaccionComponent;
  let fixture: ComponentFixture<FiltroTransaccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroTransaccionComponent]
    });
    fixture = TestBed.createComponent(FiltroTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

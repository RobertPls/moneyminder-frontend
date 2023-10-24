import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTransferenciaComponent } from './formulario-transferencia.component';

describe('FormularioTransferenciaComponent', () => {
  let component: FormularioTransferenciaComponent;
  let fixture: ComponentFixture<FormularioTransferenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioTransferenciaComponent]
    });
    fixture = TestBed.createComponent(FormularioTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioActualizacionTransaccionComponent } from './formulario-actualizacion-transaccion.component';

describe('FormularioActualizacionTransaccionComponent', () => {
  let component: FormularioActualizacionTransaccionComponent;
  let fixture: ComponentFixture<FormularioActualizacionTransaccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioActualizacionTransaccionComponent]
    });
    fixture = TestBed.createComponent(FormularioActualizacionTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceFechaComponent } from './balance-fecha.component';

describe('BalanceFechaComponent', () => {
  let component: BalanceFechaComponent;
  let fixture: ComponentFixture<BalanceFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceFechaComponent]
    });
    fixture = TestBed.createComponent(BalanceFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

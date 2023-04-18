import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosSaudeComponent } from './gastos-saude.component';

describe('GastosSaudeComponent', () => {
  let component: GastosSaudeComponent;
  let fixture: ComponentFixture<GastosSaudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosSaudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosSaudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

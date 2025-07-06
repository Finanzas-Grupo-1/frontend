import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculator } from './calculator.component';

describe('Calculator', () => {
  let component: Calculator;
  let fixture: ComponentFixture<Calculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

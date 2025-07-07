import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonoHistoryComponent } from './bono-history.component';

describe('BonoHistoryComponent', () => {
  let component: BonoHistoryComponent;
  let fixture: ComponentFixture<BonoHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonoHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

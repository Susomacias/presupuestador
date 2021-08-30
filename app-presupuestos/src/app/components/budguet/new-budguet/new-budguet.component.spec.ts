import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBudguetComponent } from './new-budguet.component';

describe('NewBudguetComponent', () => {
  let component: NewBudguetComponent;
  let fixture: ComponentFixture<NewBudguetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBudguetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBudguetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

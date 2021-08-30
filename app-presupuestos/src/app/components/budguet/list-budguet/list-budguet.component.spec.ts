import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBudguetComponent } from './list-budguet.component';

describe('ListBudguetComponent', () => {
  let component: ListBudguetComponent;
  let fixture: ComponentFixture<ListBudguetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBudguetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBudguetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

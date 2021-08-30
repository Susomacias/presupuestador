import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBudguetComponent } from './detail-budguet.component';

describe('DetailBudguetComponent', () => {
  let component: DetailBudguetComponent;
  let fixture: ComponentFixture<DetailBudguetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBudguetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBudguetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

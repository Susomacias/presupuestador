import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailElementComponent } from './detail-element.component';

describe('DetailElementComponent', () => {
  let component: DetailElementComponent;
  let fixture: ComponentFixture<DetailElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

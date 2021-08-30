import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewElementComponent } from './new-element.component';

describe('NewElementComponent', () => {
  let component: NewElementComponent;
  let fixture: ComponentFixture<NewElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

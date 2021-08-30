import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsDepartmentComponent } from './contents-department.component';

describe('ContentsDepartmentComponent', () => {
  let component: ContentsDepartmentComponent;
  let fixture: ComponentFixture<ContentsDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentsDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

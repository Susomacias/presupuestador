import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsCategoryComponent } from './contents-category.component';

describe('ContentsCategoryComponent', () => {
  let component: ContentsCategoryComponent;
  let fixture: ComponentFixture<ContentsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentsCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

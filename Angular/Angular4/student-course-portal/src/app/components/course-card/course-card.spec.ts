import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardComponent } from './course-card';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    component.course = {
      id: 1,
      name: 'Angular',
      code: 'ANG201',
      credits: 3,
      enrolled: true,
      gradeStatus: 'passed'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle expanded state', () => {
    expect(component.isExpanded).toBeFalse();
    component.toggleDetails();
    expect(component.isExpanded).toBeTrue();
  });
});

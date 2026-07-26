import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { By } from '@angular/platform-browser';
import { CourseCardComponent } from './course-card';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
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

  it('should render course name from @Input', () => {
    fixture.componentRef.setInput('course', {
      id: 2,
      name: 'React',
      code: 'REA201',
      credits: 3,
      gradeStatus: 'passed'
    });
    fixture.detectChanges();
    const h3 = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3.textContent).toContain('React');
  });

  it('should emit enrollRequested on enroll button click', () => {
    vi.spyOn(component.enrollRequested, 'emit');
    fixture.componentRef.setInput('course', { id: 3, name: 'Vue', code: 'VUE201', credits: 2, gradeStatus: 'passed' });
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    // The second button is for enrollment
    const enrollBtn = buttons[1].nativeElement;
    enrollBtn.click();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(3);
  });

  it('should log changes on ngOnChanges', () => {
    vi.spyOn(console, 'log');
    const change = new SimpleChange(null, component.course, true);
    component.ngOnChanges({ course: change });
    expect(console.log).toHaveBeenCalledWith('Course Changed:', { course: change });
  });

  it('should toggle expanded state', () => {
    expect(component.isExpanded).toBe(false);
    component.toggleDetails();
    expect(component.isExpanded).toBe(true);
  });
});

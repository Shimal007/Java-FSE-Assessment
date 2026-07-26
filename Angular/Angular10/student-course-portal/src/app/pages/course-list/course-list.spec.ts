import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { CourseListComponent } from './course-list';
import { provideMockStore } from '@ngrx/store/testing';
import { CourseService } from '../../services/course.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let courseServiceSpy: any;

  beforeEach(async () => {
    courseServiceSpy = {
      getCourses: () => of([{ id: 1, name: 'Test Course', code: 'TC101', credits: 3, gradeStatus: 'pending' }])
    };

    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideMockStore({ initialState: { courses: [], loading: false } }),
        { provide: CourseService, useValue: courseServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize course state and verify courses render', () => {
    component.courses = [{ id: 1, name: 'NgRx Course', code: 'NGRX', credits: 3, gradeStatus: 'pending' }];
    component.isLoading = false;
    fixture.detectChanges();
    
    const courseCards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(courseCards.length).toBeGreaterThan(0);
  });

  it('should simulate loading state and verify loading indicator', () => {
    component.isLoading = true;
    fixture.detectChanges();
    
    const loadingEl = fixture.debugElement.query(By.css('p'));
    expect(loadingEl.nativeElement.textContent).toContain('Loading courses...');
  });
});

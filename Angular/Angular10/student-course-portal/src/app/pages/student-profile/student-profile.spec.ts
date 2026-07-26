import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { StudentProfile } from './student-profile';
import { EnrollmentService } from '../../services/enrollment.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('StudentProfile', () => {
  let component: StudentProfile;
  let fixture: ComponentFixture<StudentProfile>;
  let enrollmentServiceSpy: any;

  beforeEach(async () => {
    enrollmentServiceSpy = {
      getEnrolledCourses: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [StudentProfile],
      providers: [
        provideMockStore({}),
        { provide: EnrollmentService, useValue: enrollmentServiceSpy },
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

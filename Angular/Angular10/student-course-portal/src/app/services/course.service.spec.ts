import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should successfully get courses', () => {
    const mockCourses: Course[] = [
      { id: 1, name: 'Angular', code: 'ANG', credits: 3 },
      { id: 2, name: 'React', code: 'REA', credits: 4 }
    ] as Course[];

    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should handle HTTP error', () => {
    let errorResponse: any;

    service.getCourses().subscribe({
      next: () => expect.fail('Expected an error, not courses'),
      error: (error) => {
        errorResponse = error;
      }
    });

    // Request 1
    let reqs = httpMock.match('http://localhost:3000/courses');
    expect(reqs.length).toBe(1);
    reqs[0].flush('Error', { status: 500, statusText: 'Server Error' });

    // Request 2 (Retry 1)
    reqs = httpMock.match('http://localhost:3000/courses');
    expect(reqs.length).toBe(1);
    reqs[0].flush('Error', { status: 500, statusText: 'Server Error' });

    // Request 3 (Retry 2)
    reqs = httpMock.match('http://localhost:3000/courses');
    expect(reqs.length).toBe(1);
    reqs[0].flush('Error', { status: 500, statusText: 'Server Error' });

    expect(errorResponse.message).toBe('Failed to load courses. Please try again.');
  });
});

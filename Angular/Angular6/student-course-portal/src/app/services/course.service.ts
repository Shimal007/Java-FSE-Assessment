import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // providedIn: 'root' makes this service a singleton - one instance shared across the entire application.
  // All components that inject CourseService will receive the same instance, ensuring shared state.
  private courses: Course[] = [
    { id: 1, name: 'Java', code: 'JAVA101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Angular', code: 'ANG201', credits: 3, gradeStatus: 'pending' },
    { id: 3, name: 'Spring Boot', code: 'SPR301', credits: 4, gradeStatus: 'failed' },
    { id: 4, name: 'Python', code: 'PY101', credits: 3, gradeStatus: 'pending' },
    { id: 5, name: 'Machine Learning', code: 'ML401', credits: 5, gradeStatus: 'passed' }
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}

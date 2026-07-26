import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, retry, tap, throwError } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  // GET all courses with RxJS operators
  // retry(2): Retries failed HTTP calls twice before giving up
  // map: Transforms the data - filters courses where credits > 0
  // tap: Used for side effects - logs the number of courses without transforming data
  // catchError: Handles errors and re-throws a user-friendly error
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      map(courses => courses.filter(course => course.credits > 0)),
      tap(courses => console.log(`Loaded ${courses.length} courses`)),
      catchError(error => {
        console.error('Error loading courses:', error);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  // GET course by ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(error => {
        console.error(`Error loading course ${id}:`, error);
        return throwError(() => new Error('Failed to load course details.'));
      })
    );
  }

  // POST create new course
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(newCourse => console.log('Created course:', newCourse)),
      catchError(error => {
        console.error('Error creating course:', error);
        return throwError(() => new Error('Failed to create course.'));
      })
    );
  }

  // PUT update course
  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      tap(updatedCourse => console.log('Updated course:', updatedCourse)),
      catchError(error => {
        console.error(`Error updating course ${id}:`, error);
        return throwError(() => new Error('Failed to update course.'));
      })
    );
  }

  // DELETE course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Deleted course ${id}`)),
      catchError(error => {
        console.error(`Error deleting course ${id}:`, error);
        return throwError(() => new Error('Failed to delete course.'));
      })
    );
  }
}

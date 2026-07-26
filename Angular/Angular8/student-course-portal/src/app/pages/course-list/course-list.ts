import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, combineLatest, switchMap, takeUntil } from 'rxjs';

import { CourseCardComponent } from '../../components/course-card/course-card';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Course } from '../../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';

import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent, HighlightDirective],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  courses$: Observable<Course[]>;

  selectedCourseId = 0;
  searchTerm = '';

  private courseSelection$ = new Subject<number>();
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private enrollmentService: EnrollmentService // kept for the switchMap demo if desired
  ) {
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);
    
    // Combine the search term from the route with the courses from the store
    this.courses$ = combineLatest([
      this.store.select(selectAllCourses),
      this.route.queryParamMap
    ]).pipe(
      map(([courses, params]) => {
        const search = params.get('search') || '';
        this.searchTerm = search;
        if (!search) return courses;
        const term = search.toLowerCase();
        return courses.filter(course =>
          course.name.toLowerCase().includes(term) ||
          course.code.toLowerCase().includes(term)
        );
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());

    this.courseSelection$
      .pipe(
        switchMap(courseId => this.enrollmentService.getStudentsByCourse(courseId)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (students) => console.log('Students for selected course:', students),
        error: (err) => console.error('Error fetching students:', err)
      });
  }

  onSearchChange(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course (from child output): ' + courseId);
    this.selectedCourseId = courseId;
    this.courseSelection$.next(courseId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
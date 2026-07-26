import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent, HighlightDirective],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit, OnDestroy {
  isLoading = true;
  errorMessage = '';

  allCourses: Course[] = [];
  courses: Course[] = [];

  selectedCourseId = 0;
  searchTerm = '';

  // switchMap cancels the previous inner Observable when a new courseId arrives. 
  // This prevents old HTTP responses from appearing after a newer selection.
  private courseSelection$ = new Subject<number>();
  private destroy$ = new Subject<void>();

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();

    this.courseSelection$
      .pipe(
        switchMap(courseId => this.enrollmentService.getStudentsByCourse(courseId)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (students) => console.log('Students for selected course (switchMap demo):', students),
        error: (err) => console.error('Error fetching students:', err)
      });
  }

  loadCourses(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
        this.isLoading = false;
        
        // Apply existing filters
        this.route.queryParamMap.subscribe(params => {
          const search = params.get('search');
          this.searchTerm = search || '';
          this.filterCourses();
        });
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load courses. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onSearchChange(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
    this.filterCourses();
  }

  filterCourses(): void {
    if (!this.searchTerm) {
      this.courses = [...this.allCourses];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.courses = this.allCourses.filter(course =>
        course.name.toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term)
      );
    }
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
    this.courseSelection$.next(courseId);
  }

  testCreate(): void {
    const newCourse: Omit<Course, 'id'> = {
      name: 'New Test Course',
      code: 'TEST101',
      credits: 3,
      gradeStatus: 'pending'
    };
    this.courseService.createCourse(newCourse).subscribe({
      next: () => {
        console.log('Course created successfully');
        this.loadCourses();
      },
      error: (err) => console.error('Create failed', err)
    });
  }

  testUpdate(courseId: number): void {
    const updates: Partial<Course> = { name: 'Updated Course Name' };
    this.courseService.updateCourse(courseId, updates).subscribe({
      next: () => {
        console.log('Course updated successfully');
        this.loadCourses();
      },
      error: (err) => console.error('Update failed', err)
    });
  }

  testDelete(courseId: number): void {
    this.courseService.deleteCourse(courseId).subscribe({
      next: () => {
        console.log('Course deleted successfully');
        this.loadCourses();
      },
      error: (err) => console.error('Delete failed', err)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
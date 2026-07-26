import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectAllCourses } from '../../store/course/course.selectors';
import * as CourseActions from '../../store/course/course.actions';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidgetComponent implements OnInit {
  totalCourses$!: Observable<number>;

  constructor(private store: Store, private courseService: CourseService) {}

  ngOnInit(): void {
    this.totalCourses$ = this.store.select(selectAllCourses).pipe(
      map(courses => courses.length)
    );
  }

  addTestCourse(): void {
    this.totalCourses$.pipe(take(1)).subscribe(total => {
      const newCourse: Omit<Course, 'id'> = {
        name: 'Test Course',
        code: 'TEST' + (total + 1),
        credits: 3,
        gradeStatus: 'pending'
      };
      // We directly use CourseService for creation since we don't have a create effect in this exercise,
      // but we dispatch loadCourses to refresh the store after success.
      this.courseService.createCourse(newCourse).subscribe({
        next: () => {
          this.store.dispatch(CourseActions.loadCourses());
        },
        error: err => {
          console.error(err);
        }
      });
    });
  }
}

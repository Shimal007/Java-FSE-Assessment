import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidgetComponent implements OnInit {
  courses: Course[] = [];
  totalCourses: number = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: courses => {
        this.courses = courses;
        this.totalCourses = courses.length;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  addTestCourse(): void {
    const newCourse: Omit<Course, 'id'> = {
      name: 'Test Course',
      code: 'TEST' + (this.totalCourses + 1),
      credits: 3,
      gradeStatus: 'pending'
    };
    this.courseService.createCourse(newCourse).subscribe({
      next: () => {
        this.loadCourses();
      },
      error: err => {
        console.error(err);
      }
    });
  }
}

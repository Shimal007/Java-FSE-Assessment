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
    this.courses = this.courseService.getCourses();
    this.totalCourses = this.courses.length;
  }

  addTestCourse(): void {
    const newCourse: Course = {
      id: Date.now(),
      name: 'Test Course',
      code: 'TEST' + this.totalCourses + 1,
      credits: 3,
      gradeStatus: 'pending'
    };
    this.courseService.addCourse(newCourse);
    this.courses = this.courseService.getCourses();
    this.totalCourses = this.courses.length;
  }
}

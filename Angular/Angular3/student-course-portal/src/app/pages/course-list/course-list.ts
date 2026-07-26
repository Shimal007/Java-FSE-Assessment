import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { HighlightDirective } from '../../directives/highlight.directive';

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  enrolled: boolean;
  gradeStatus: 'passed' | 'failed' | 'pending';
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCardComponent, HighlightDirective],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {

  isLoading = true;

  courses: Course[] = [
    { id: 1, name: 'Java', code: 'JAVA101', credits: 4, enrolled: true, gradeStatus: 'passed' },
    { id: 2, name: 'Angular', code: 'ANG201', credits: 3, enrolled: false, gradeStatus: 'pending' },
    { id: 3, name: 'Spring Boot', code: 'SPR301', credits: 4, enrolled: true, gradeStatus: 'failed' },
    { id: 4, name: 'Python', code: 'PY101', credits: 3, enrolled: false, gradeStatus: 'pending' },
    { id: 5, name: 'Machine Learning', code: 'ML401', credits: 5, enrolled: true, gradeStatus: 'passed' }
  ];

  selectedCourseId = 0;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  trackByCourseId(index: number, course: Course): number {
    // trackBy lets Angular re-use DOM nodes for unchanged items and avoid re-rendering the whole list.
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

}
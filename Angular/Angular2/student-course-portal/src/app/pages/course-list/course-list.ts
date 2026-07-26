import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent {

  courses = [
    { id: 1, name: 'Java', code: 'JAVA101', credits: 4 },
    { id: 2, name: 'Angular', code: 'ANG201', credits: 3 },
    { id: 3, name: 'Spring Boot', code: 'SPR301', credits: 4 },
    { id: 4, name: 'Python', code: 'PY101', credits: 3 },
    { id: 5, name: 'Machine Learning', code: 'ML401', credits: 5 }
  ];

  selectedCourseId = 0;

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

}
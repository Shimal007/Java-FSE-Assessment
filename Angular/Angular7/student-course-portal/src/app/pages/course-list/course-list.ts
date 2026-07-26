import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent, HighlightDirective],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {

  isLoading = true;

  allCourses: Course[] = [];
  courses: Course[] = [];

  selectedCourseId = 0;
  searchTerm = '';

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allCourses = this.courseService.getCourses();
    
    this.route.queryParamMap.subscribe(params => {
      const search = params.get('search');
      this.searchTerm = search || '';
      this.filterCourses();
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
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
      this.courses = this.allCourses;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.courses = this.allCourses.filter(course =>
        course.name.toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term)
      );
    }
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
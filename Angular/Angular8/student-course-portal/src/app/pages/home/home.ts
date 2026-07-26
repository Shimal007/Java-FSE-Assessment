import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget';
import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses } from '../../store/course/course.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CourseSummaryWidgetComponent, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  portalName = "Student Course Portal";
  isPortalActive = true;
  message = "";
  searchTerm = "";
  courseCount$!: Observable<number>;

  constructor(private store: Store) {}

  onEnrollClick() {
    this.message = "Enrollment opened!";
  }

  ngOnInit(): void {
    // Ensure courses are loaded when Home is initialized
    this.store.dispatch(CourseActions.loadCourses());
    this.courseCount$ = this.store.select(selectAllCourses).pipe(
      map(courses => courses.length)
    );
    console.log("HomeComponent initialised - reading courses from store");
  }

  ngOnDestroy(): void {
    console.log("HomeComponent destroyed");
  }
}
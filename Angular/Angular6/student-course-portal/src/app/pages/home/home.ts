import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CourseSummaryWidgetComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  portalName = "Student Course Portal";

  isPortalActive = true;

  message = "";

  searchTerm = "";

  courseCount: number = 0;

  constructor(private courseService: CourseService) {}

  onEnrollClick() {
    this.message = "Enrollment opened!";
  }
  ngOnInit(): void {

  this.courseCount = this.courseService.getCourses().length;

  console.log("HomeComponent initialised - courses loaded");

}

  ngOnDestroy(): void {

  console.log("HomeComponent destroyed");

}

}
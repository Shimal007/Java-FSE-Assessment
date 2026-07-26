import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

interface CourseCardModel {
  id: number;
  name: string;
  code: string;
  credits: number;
  enrolled?: boolean;
  gradeStatus?: 'passed' | 'failed' | 'pending';
}

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCardComponent implements OnChanges, OnInit {

  @Input()
  course!: CourseCardModel;

  @Output()
  enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  isEnrolled$!: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEnrolled$ = this.store.select(selectEnrolledIds).pipe(
      map(ids => ids.includes(this.course.id))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course Changed:', changes);
  }

  get cardClasses(): Record<string, boolean> {
    return {
      'card--enrolled': Boolean(this.course?.enrolled),
      'card--full': (this.course?.credits ?? 0) >= 4,
      expanded: this.isExpanded
    };
  }

  get gradeColor(): string {
    switch (this.course?.gradeStatus) {
      case 'passed':
        return 'green';
      case 'failed':
        return 'red';
      default:
        return 'grey';
    }
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  toggleEnrollment(): void {
    this.isEnrolled$.pipe(take(1)).subscribe(isEnrolled => {
      if (isEnrolled) {
        this.store.dispatch(EnrollmentActions.unenrollFromCourse({ courseId: this.course.id }));
      } else {
        this.store.dispatch(EnrollmentActions.enrollInCourse({ courseId: this.course.id }));
      }
      // Still emit for any parent components tracking the interaction
      this.enrollRequested.emit(this.course.id);
    });
  }

  navigateToCourseDetail(event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/courses', this.course.id]);
  }
}
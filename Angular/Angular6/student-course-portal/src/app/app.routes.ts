import { Routes } from '@angular/router';
import { EnrollmentFormComponent } from './pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentComponent } from './pages/reactive-enrollment/reactive-enrollment';
import { StudentProfile } from './pages/student-profile/student-profile';
import { HomeComponent } from './pages/home/home';
import { CourseListComponent } from './pages/course-list/course-list';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'enroll', component: EnrollmentFormComponent },
  { path: 'enroll-reactive', component: ReactiveEnrollmentComponent },
  { path: 'profile', component: StudentProfile },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

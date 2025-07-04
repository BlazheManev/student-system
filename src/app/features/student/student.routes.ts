import { Routes } from '@angular/router';
import { StudentFormComponent } from './student-form.component';

export const STUDENT_ROUTES: Routes = [
  {
    path: 'add',
    component: StudentFormComponent
  },
  {
    path: 'edit/:id',
    component: StudentFormComponent
  }
];

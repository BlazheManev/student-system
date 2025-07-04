import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'overview',
    loadComponent: () => import('./features/students/overview/overview.component').then(m => m.OverviewComponent)
  },
  {
    path: 'student',
    loadChildren: () => import('./features/students/form-component/student.routes').then(m => m.STUDENT_ROUTES)
  },
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full'
  }
];

// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    loadChildren: () =>
      import('./features/overview/overview.routes').then((m) => m.OVERVIEW_ROUTES),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./features/student/student.routes').then((m) => m.STUDENT_ROUTES),
  }
];

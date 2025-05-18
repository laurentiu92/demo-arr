import { Routes } from '@angular/router';
import { HomeComponent } from './features/card-application/home/home.component';

export const routes: Routes = [
  {
    path: 'demo-arr',
    component: HomeComponent
  },
  {
    path: 'apply',
    children: [
      {
        path: 'driver_tachograph',
        loadComponent: () => import('./features/card-application/driver-tachograph/driver-tachograph.component')
          .then(m => m.DriverTachographComponent)
      },
      {
        path: 'company_tachograph',
        loadComponent: () => import('./features/card-application/company-tachograph/company-tachograph.component')
          .then(m => m.CompanyTachographComponent)
      },
      {
        path: 'workshop_tachograph',
        loadComponent: () => import('./features/card-application/workshop-tachograph/workshop-tachograph.component')
          .then(m => m.WorkshopTachographComponent)
      },
      {
        path: 'cpp',
        loadComponent: () => import('./features/card-application/cpp/cpp.component')
          .then(m => m.CppComponent)
      },
      {
        path: 'adr',
        loadComponent: () => import('./features/card-application/adr/adr.component')
          .then(m => m.AdrComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

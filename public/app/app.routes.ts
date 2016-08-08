import { provideRouter, RouterConfig }  from '@angular/router';
import { VoluntaryComponent } from './voluntary.component';
import { PatientComponent } from './patient.component';
import { MainComponent } from './main.component';
import { LoginComponent } from './login.component';

const routes: RouterConfig = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'voluntary/:userId',
    component: VoluntaryComponent
  },

  {
    path: 'patient',
    component: PatientComponent
  },
  {
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
},

  
];

export const appRouterProviders = [
  provideRouter(routes)
];
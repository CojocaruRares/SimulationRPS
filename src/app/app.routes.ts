import { Routes } from '@angular/router';
import { SimulationComponent } from './simulation/simulation.component';

export const routes: Routes = [
    {
      path: 'simulation',
      component: SimulationComponent,
    },
    {
      path: '',
      redirectTo: '/simulation',
      pathMatch: 'full',
    },
  ];
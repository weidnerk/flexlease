import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeasesComponent } from './leases.component';

const routes: Routes = [
  { path: '', component: LeasesComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
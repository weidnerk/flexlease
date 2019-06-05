import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaseComponent } from './lease.component';

const routes: Routes = [
  { path: '', component: LeaseComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

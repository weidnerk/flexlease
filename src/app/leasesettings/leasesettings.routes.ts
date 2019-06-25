import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaseResidualsComponent } from './leasesettings.component';

const routes: Routes = [
  { path: '', component: LeaseResidualsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

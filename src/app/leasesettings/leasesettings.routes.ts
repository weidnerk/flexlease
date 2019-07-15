import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaseSettingsComponent } from './leasesettings.component';

const routes: Routes = [
  { path: '', component: LeaseSettingsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

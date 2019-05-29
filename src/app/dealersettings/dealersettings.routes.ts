import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealersettingsComponent } from './dealersettings.component';

const routes: Routes = [
  { path: '', component: DealersettingsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiclesettingsComponent } from './vehiclesettings.component';

const routes: Routes = [
  { path: '', component: VehiclesettingsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

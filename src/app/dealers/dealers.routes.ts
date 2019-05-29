import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealersComponent } from './dealers.component';
import { AuthGuard } from '../_guards';

const routes: Routes = [
  { path: '', component: DealersComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

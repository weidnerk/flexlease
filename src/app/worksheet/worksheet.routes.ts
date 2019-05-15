import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorksheetComponent } from './worksheet.component';

const routes: Routes = [
  { path: '', component: WorksheetComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

import {Routes} from '@angular/router';
import { AuthGuard } from './_guards/index';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaseResidualsComponent } from './leaseresiduals/leaseresiduals.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'leases', loadChildren: () => import('./leases/leases.module').then(m => m.LeasesModule), canActivate: [AuthGuard] },
  { path: 'dealers', loadChildren: () => import('./dealers/dealers.module').then(m => m.DealersModule), canActivate: [AuthGuard] },
  { path: 'vehiclesettings', loadChildren: () => import('./vehiclesettings/vehiclesettings.module').then(m => m.VehiclesettingsModule), canActivate: [AuthGuard] },
  { path: 'worksheet/:appid', loadChildren: () => import('./worksheet/worksheet.module').then(m => m.WorksheetModule), canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule), canActivate: [AuthGuard] },
  { path: 'lease/:appid', loadChildren: () => import('./lease/lease.module').then(m => m.LeaseModule), canActivate: [AuthGuard] },
  { path: 'leaseresiduals', component: LeaseResidualsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];


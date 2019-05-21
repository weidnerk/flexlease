import {Routes} from '@angular/router';
import { AuthGuard } from './_guards/index';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'leases', loadChildren: './leases/leases.module#LeasesModule', canActivate: [AuthGuard] },
  { path: 'dealers', loadChildren: './dealers/dealers.module#DealersModule', canActivate: [AuthGuard] },
  { path: 'vehiclesettings', loadChildren: './vehiclesettings/vehiclesettings.module#VehiclesettingsModule', canActivate: [AuthGuard] },
  { path: 'worksheet/:appid', loadChildren: './worksheet/worksheet.module#WorksheetModule', canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule', canActivate: [AuthGuard] },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

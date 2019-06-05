import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import {AppRoutingModule} from './app-routing.module';
import {OneComponent} from './one/one.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './_services/index';
import { AuthGuard } from './_guards/index';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    OneComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    NgxChartsModule
  ],
  providers: [AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

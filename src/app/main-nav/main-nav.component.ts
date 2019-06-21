import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, filter, withLatestFrom } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  @ViewChild('drawer', { static: true }) drawer: MatSidenav;
  routes = [
    { path: '/', name: 'Home', icon: 'home' },
    { path: 'leases', name: 'Leases', icon: 'folder' },
    { path: 'settings', name: 'Settings', icon: 'settings' },
    { path: 'vehiclesettings', name: 'Vehicle Settings', icon: 'settings_applications' },
    { path: 'dealers', name: 'Franchise Dealers', icon: 'people' },
    { path: 'worksheet', name: 'Worksheet', icon: 'graphic_eq' },
    { path: 'leaseresiduals', name: 'Lease Residuals', icon: 'graphic_eq' }
  ];


  // If 'isHandset$' statement commented out, sidenav never closes
  //
  // Changed 'Breakpoints.Handset' to 'Breakpoints.XSmall' to avoid sidenav closing at 960
  // See answer here: https://stackoverflow.com/questions/53165736/angular-material-nav-schematics-breakpoint
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private route: Router) {
    route.events.pipe(
      withLatestFrom(this.isHandset$),
      filter(([a, b]) => b && a instanceof NavigationEnd)
    ).subscribe(_ => this.drawer.close());
  }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.route.navigate(['/login']);
  }

  // click on VERY top left house icon to open and close sidenav
  // if you open it, then stays open
  // if you close it, then opens and closes with mouse entry/exit
  // isExpanded = true;  // i.e. sidenav opened/closed

  // if sidenav is "partially" closed, as soon as you mouse over partically closed sidenave, then set this to true
  // and when you mouse out of the sidenav (partially closed or open), sidenave goes back to partially closed
  // isShowing = false;

  /*
    ~~~~~~~~~~ CONFIGURATION ~~~~~~~~~~~~~~~~~

    When startSideOpen = true, include as part of (in main-nav.component.html):
    <mat-sidenav #drawer

        [opened]="!(isHandset$ | async)"

    so we let the breakpoint handle the display

  FULL CODE IS:
  	<mat-sidenav #drawer
		class="sidenav"
		fixedInViewport="true"
		[attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
		[mode]="(isHandset$ | async) ? 'over' : 'side'"
		[opened]="!(isHandset$ | async)"
    >

  */
  startSideOpen = true;

  showSubmenu = false;
  showSubSubMenu = false;

  parent_click() {
    this.showSubmenu = !this.showSubmenu;
  }
  subparent_click() {
    this.showSubSubMenu = !this.showSubSubMenu;
  }

  // When startSideOpen = false, we are handling drawer close instead of using propery on mat-sidenav (i.e. don't put on mat-sidenav):
  // [opened]="!(isHandset$ | async)"
  subMenu_click() {
    if (!this.startSideOpen) {
      this.drawer.close();
    } else {
      this.isHandset$.subscribe(x => {
        if (x) {
          this.drawer.close();
        }
      });
    }
  }
  subSubMenu_click() {
    if (!this.startSideOpen) {
      this.drawer.close();
    } else {
      this.isHandset$.subscribe(x => {
        if (x) {
          this.drawer.close();
        }
      });
    }
  }

  // mouseenter() {
  //   if (!this.isExpanded) {
  //     this.isShowing = true;
  //   }
  // }

  // mouseleave() {
  //   if (!this.isExpanded) {
  //     this.isShowing = false;
  //   }
  // }
}

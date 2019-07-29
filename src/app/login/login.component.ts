import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/index';
import { User } from '../_models/index';
import { environment } from 'src/environments/environment';

@Component({
  // moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  model: User = {} as User;
  loading = false;
  errorMessage: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {

    this.loading = true;
    this.authenticationService.login(this.model.Username, this.model.Password, environment.API_KEY)
      .subscribe(
        response => {
          this.router.navigate(['/']);
        },
        error => {
          this.loading = false;
          if (error.status === 400) {
            if (error.error.error_description) {
              this.errorMessage = error.error.error_description;
            } else {
              this.errorMessage = error as any;
            }
          } else {
            this.errorMessage = error as any;
          }
        });
  }
}

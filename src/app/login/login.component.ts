import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/index';
import { User, ASPNETMembershipUser } from '../_models/index';
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
          if (error.status === 400) {     // 400 Bad Request
            if (error.error.error_description) {
              this.errorMessage = error.error.error_description;
            } else {
              if (error.error.message) {  // populated when server returns BadRequest("xxx")
                this.errorMessage = error.error.message;
              } else {
              this.errorMessage = error as any;
              }
            }
          } else {
            this.errorMessage = error as any;
          }
        });
  }

}

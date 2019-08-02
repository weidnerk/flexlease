import {throwError as observableThrowError,  Observable, BehaviorSubject, pipe } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ASPNETMembershipUser } from '../_models';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    /**
     * Curious method does not return type Observable (see Jason Watmore)
     * @param username 
     * @param password 
     * @param apikey 
     */
    login(username, password, apikey) {

        const url = environment.LOGIN_API_ENDPOINT + 'login';
        const body: ASPNETMembershipUser = { Username: username, Password: password};
        const _options = { headers: new HttpHeaders({ 'API_KEY': apikey }) };

        return this.http.post<any>(url, body, _options).pipe(
            map(user => {
                // login successful if there's a jwt token in the response

                // token is undefined
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('access_token', response.json().access_token);
                    // localStorage.setItem('expires_in', response.json().expires_in);
                    // localStorage.setItem('token_type', response.json().token_type);
                    // localStorage.setItem('userName', response.json().userName);

                    // localStorage.setItem('currentUser', JSON.stringify({ username: username, token: response.json().access_token }));

                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            }),
            catchError(this.handleError)
        );
    }

    public handleError(error: HttpErrorResponse) {
        return observableThrowError(error);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
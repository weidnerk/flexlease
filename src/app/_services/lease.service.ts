
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/internal/operators';

// import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import { Lease, VehicleMake, VehicleModel } from '../_models/index';
import { Vehicle } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class LeaseService {

    private getLeaseUrl: string = environment.API_ENDPOINT + 'lease';
    private getLeasesUrl: string = environment.API_ENDPOINT + 'appsview/lease';
    private getVehicleUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehicle';
    private getMakesUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehiclemakes';
    private getModelsUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehiclemodels';
    private API_KEY: string = environment.API_KEY;

    constructor(private http: HttpClient) { }

    getLeases(): Observable<Lease[]> {
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            const currentUser = JSON.parse(userJson);
            const url = `${this.getLeasesUrl}`;
            const httpOptions = { headers: new HttpHeaders({ 'API_KEY': this.API_KEY }) };
            return this.http.get<Lease[]>(url, httpOptions).pipe(
                catchError(this.handleError)
            );
        } else {
            return throwError(
                {
                    errMsg: 'could not obtain current user record'
                }
            );
        }
    }

    getLease(appid: string): Observable<Lease> {
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            const currentUser = JSON.parse(userJson);
            const url = `${this.getLeaseUrl}/${appid}`;
            const httpOptions = { headers: new HttpHeaders({ 'API_KEY': this.API_KEY }) };
            return this.http.get<Lease>(url, httpOptions).pipe(
                catchError(this.handleError)
            );
        } else {
            return throwError(
                {
                    errMsg: 'could not obtain current user record'
                }
            );
        }
    }

    getVehicle(appid: string): Observable<Vehicle> {
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            const currentUser = JSON.parse(userJson);
            const url = `${this.getVehicleUrl}/${appid}`;
            const httpOptions = { headers: new HttpHeaders({ 'API_KEY': this.API_KEY }) };
            return this.http.get<Vehicle>(url, httpOptions).pipe(
                catchError(this.handleError)
            );
        } else {
            return throwError(
                {
                    errMsg: 'could not obtain current user record'
                }
            );
        }
    }

    getMakes(): Observable<VehicleMake[]> {
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            const currentUser = JSON.parse(userJson);
            const url = `${this.getMakesUrl}`;
            const httpOptions = { headers: new HttpHeaders({ 'API_KEY': this.API_KEY }) };
            return this.http.get<VehicleMake[]>(url, httpOptions).pipe(
                // .do(data => console.log('All: ' +  JSON.stringify(data)))
                catchError(this.handleError)
            );
        } else {
            return throwError(
                {
                    errMsg: 'could not obtain current user record'
                }
            );
        }
    }

    getModels(makeId: number): Observable<VehicleModel[]> {
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            const currentUser = JSON.parse(userJson);
            const url = `${this.getModelsUrl}/${makeId}`;
            const httpOptions = { headers: new HttpHeaders({ 'API_KEY': this.API_KEY }) };
            return this.http.get<VehicleModel[]>(url, httpOptions).pipe(
                // .do(data => console.log('All: ' +  JSON.stringify(data)))
                catchError(this.handleError)
            );
        } else {
            return throwError(
                {
                    errMsg: 'could not obtain current user record'
                }
            );
        }
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ProgressEvent) { // connection problem
            return throwError(error.message || 'Server error');
        } else {
            if (error.error.errors) {
                return throwError(error.status + ' ' + error.error.errors[0].message);
            } else if (error) {
                return throwError(error.status + ' ' + error);
            } else {
                return throwError(error.status + ' and error occurred');
            }

        }
    }
}

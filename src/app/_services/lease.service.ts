
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';

const getUrlMap = new Map<string, string>();
const getListUrlMap = new Map<string, string>();
const getFromArrayUrlMap = new Map<string, string>();

const postFromArrayUrlMap = new Map<string, string>();
const postUrlMap = new Map<string, string>();

@Injectable()
export class LeaseService {

    private getLeaseUrl: string = environment.API_ENDPOINT + 'lease';
    private getLeasesUrl: string = environment.API_ENDPOINT + 'appsview/lease';
    private getVehicleUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehicle';
    private getVehicleModelUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehiclemodel';
    private getMakesUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehiclemakes';
    private getModelsUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehiclemodels';
    private getMaintenanceValueUrl: string = environment.API_MAINT_ENDPOINT;
    private getMaintValueArrayUrl: string = environment.API_MAINT_ENDPOINT + 'array';

    private postMaintenanceValueUrl: string = environment.API_MAINT_ENDPOINT;
    private postVehicleModelValueUrl: string = environment.API_VEHICLE_ENDPOINT;
    private postLeaseUrl: string = environment.API_ENDPOINT;

    private API_KEY: string = environment.API_KEY;

    constructor(private http: HttpClient) {
        getUrlMap.set('Lease', this.getLeaseUrl);
        getUrlMap.set('Vehicle', this.getVehicleUrl);
        getUrlMap.set('VehicleModel', this.getVehicleModelUrl);

        getListUrlMap.set('Lease', this.getLeasesUrl);
        getListUrlMap.set('VehicleMake', this.getMakesUrl);
        getListUrlMap.set('VehicleModel', this.getModelsUrl);

        getFromArrayUrlMap.set('MaintenanceValue', this.getMaintValueArrayUrl);

        postUrlMap.set('VehicleModel', this.postVehicleModelValueUrl);
        postUrlMap.set('CustomerApp', this.postLeaseUrl);

        postFromArrayUrlMap.set('MaintenanceValue', this.postMaintenanceValueUrl);
    }

    // Populate the id array with an array of ids to fetch
    getValueArray<T>(typeName: string, id: number[]): Observable<T[]> {
        let url = getFromArrayUrlMap.get(typeName);
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            const currentUser = JSON.parse(userJson);
            const httpOptions = { headers: new HttpHeaders({ 'API_KEY': this.API_KEY }) };
            return this.http.post<T[]>(url, id, httpOptions).pipe(
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

    getValue<T>(typeName: string, id: number): Observable<T> {
        let url = getUrlMap.get(typeName);
        url = `${url}/${id}`;
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            const currentUser = JSON.parse(userJson);
            const httpOptions = { headers: new HttpHeaders({ 'API_KEY': this.API_KEY }) };
            return this.http.get<T>(url, httpOptions).pipe(
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

    // Get list of values (such as tblMakes, but tblModels needs makeId)
    // Optionally pass id
    getValues<T>(typeName: string, id?: number): Observable<T[]> {
        let url = getListUrlMap.get(typeName);
        if (id !== undefined) {
            url = url + '/' + id;
        }
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            const currentUser = JSON.parse(userJson);
            const httpOptions = { headers: new HttpHeaders({ 'API_KEY': this.API_KEY }) };
            return this.http.get<T[]>(url, httpOptions).pipe(
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

    storeValueArray<T>(typeName: string, arr: T[]) {
        const url = postFromArrayUrlMap.get(typeName);
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            const currentUser = JSON.parse(userJson);
            const httpOptions = { headers: new HttpHeaders({ 'API_KEY': this.API_KEY }) };
            return this.http.post<T[]>(url, arr, httpOptions).pipe(
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

    storeValue<T>(typeName: string, value: T) {
        const url = postUrlMap.get(typeName);
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            const currentUser = JSON.parse(userJson);
            const httpOptions = { headers: new HttpHeaders({ 'API_KEY': this.API_KEY }) };
            return this.http.post<T[]>(url, value, httpOptions).pipe(
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

    private handleError(error: any) {
        if (error.error instanceof ProgressEvent) { // connection problem
            return throwError(error.message || 'Server error');
        } else {
            // server returned exception
            if (error.error.innerException) {
                return throwError(error.status + ' ' + error.error.innerException.exceptionMessage);
            }
            // Errors collection populated in CustomerAppLeaseResponse
            if (error.error.errors) {
                return throwError(error.status + ' ' + error.error.errors[0].message);
            }
            return throwError(error.status + ' an error occurred');
        }
    }
}


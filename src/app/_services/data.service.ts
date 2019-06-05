
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import { FLEXDealer } from '../_models/dealer';
import { MaintenanceValue } from '../_models/MaintenanceValue';

const getUrlMap = new Map<string, string>();
const getListUrlMap = new Map<string, string>();
const getFromArrayUrlMap = new Map<string, string>();

const postFromArrayUrlMap = new Map<string, string>();
const postUrlMap = new Map<string, string>();

@Injectable()
export class DataService {

    private getLeaseUrl: string = environment.API_ENDPOINT + 'lease';
    private getLeasesUrl: string = environment.API_ENDPOINT + 'appsview/lease';
    private getVehicleUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehicle';
    private getVehicleModelUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehiclemodel';
    private getMakesUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehiclemakes';
    private getModelsUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehiclemodels';
    private getMaintenanceValueUrl: string = environment.API_MAINT_ENDPOINT;
    private getMaintValueArrayUrl: string = environment.API_MAINT_ENDPOINT + 'array';
    private getDealersUrl: string = environment.API_DEALER_ENDPOINT + 'dealers';
    private getDealerUrl: string = environment.API_DEALER_ENDPOINT + 'flexdealer';

    private postMaintenanceValueUrl: string = environment.API_MAINT_ENDPOINT;
    private postVehicleModelValueUrl: string = environment.API_VEHICLE_ENDPOINT;
    private postLeaseUrl: string = environment.API_ENDPOINT;
    private postDealerUrl: string = environment.API_DEALER_ENDPOINT;

    private API_KEY: string = environment.API_KEY;

    constructor(private http: HttpClient) {
        this.SetUrlMappings();
    }

    // Populate the id array with an array of ids to fetch
    getValueArray<T>(typeName: string, id: number[]): Observable<T[]> {
        const url = getFromArrayUrlMap.get(typeName);
        if (!url) {
            return throwError('Url look up failed, keyvalue: \'' + typeName + '\', was not found.');
        }
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
        if (!url) {
            return throwError('Url look up failed, keyvalue: \'' + typeName + '\', was not found.');
        }
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
    // Optionally pass either an id or a 2D array of a field name and value to search
    // Don't know how to pass a predicate to the API
    getValues<T>(typeName: string, id?: number, where?: string[]): Observable<T[]> {
        let url = getListUrlMap.get(typeName);
        if (!url) {
            return throwError('Url look up failed, keyvalue: \'' + typeName + '\', was not found.');
        }
        if (id !== undefined) {
            url = url + '/' + id;
        }
        if (where !== undefined) {
            url = url + '?' + where[0] + '=' + where[1];
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
        if (!url) {
            return throwError('Url look up failed, keyvalue: \'' + typeName + '\', was not found.');
        }
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
        if (!url) {
            return throwError('Url look up failed, keyvalue: \'' + typeName + '\', was not found.');
        }
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
            // server returned inner exception
            if (error.error.innerException) {
                return throwError(error.status + ' ' + error.error.innerException.exceptionMessage);
            }
            // Errors collection populated in CustomerAppLeaseResponse
            if (error.error.errors) {
                return throwError(error.status + ' ' + error.error.errors[0].message);
            }
            // server returned an exception
            if (error.error) {
                return throwError(error.status + ' ' + error.error);
            }
            return throwError(error.status + ' an error occurred');
        }
    }

    private SetUrlMappings() {
        getUrlMap.set('Lease', this.getLeaseUrl);
        getUrlMap.set('Vehicle', this.getVehicleUrl);
        getUrlMap.set('VehicleModel', this.getVehicleModelUrl);
        getUrlMap.set('FLEXDealer', this.getDealerUrl);

        getListUrlMap.set('Lease', this.getLeasesUrl);
        getListUrlMap.set('VehicleMake', this.getMakesUrl);
        getListUrlMap.set('VehicleModel', this.getModelsUrl);
        getListUrlMap.set('FLEXDealer', this.getDealersUrl);

        getFromArrayUrlMap.set('MaintenanceValue', this.getMaintValueArrayUrl);

        postUrlMap.set('VehicleModel', this.postVehicleModelValueUrl);
        postUrlMap.set('CustomerApp', this.postLeaseUrl);
        postUrlMap.set('FLEXDealer', this.postDealerUrl);

        postFromArrayUrlMap.set('MaintenanceValue', this.postMaintenanceValueUrl);
    }
}

// function isFLEXDealer(obj: FLEXDealer | MaintenanceValue): obj is FLEXDealer {
//     return (obj as FLEXDealer).dba !== undefined;
// }

// function isFLEXDealer(toBeDetermined: any): toBeDetermined is FLEXDealer {
//     if ((toBeDetermined as FLEXDealer)._FLEXDealer) {
//       return true;
//     }
//     return false;
//   }

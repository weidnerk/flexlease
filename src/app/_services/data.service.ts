
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
export class DataService {

    private getLeaseUrl: string = environment.API_ENDPOINT + 'lease';
    private getLeasesUrl: string = environment.API_ENDPOINT + 'appsview/lease';
    private getLastEditedUrl: string = environment.API_ENDPOINT + 'lastedited';

    private getVehicleUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehicle';
    private getVehicleModelUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehiclemodel';
    private getMakesUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehiclemakes';
    private getModelsUrl: string = environment.API_VEHICLE_ENDPOINT + 'vehiclemodels';
    private getMaintenanceValueUrl: string = environment.API_MAINT_ENDPOINT;
    private getMaintValueArrayUrl: string = environment.API_MAINT_ENDPOINT + 'array';
    private getMaintValuesUrl: string = environment.API_MAINT_ENDPOINT + 'values';
    private getDealersUrl: string = environment.API_DEALER_ENDPOINT + 'dealers';
    private getDealerUrl: string = environment.API_DEALER_ENDPOINT + 'flexdealer';
    private getLeaseResidualsArrayUrl: string = environment.API_ENDPOINT + 'leaseresiduals';
    private getDealerStateProfileArrayUrl: string = environment.API_ENDPOINT + 'dealerstateprofile';
    private getYearResidualImpactorArrayUrl: string = environment.API_ENDPOINT + 'yearresidualimpactor';

    private postMaintenanceValueUrl: string = environment.API_MAINT_ENDPOINT;
    private postVehicleModelValueUrl: string = environment.API_VEHICLE_ENDPOINT + 'storevalues';
    private postLeaseUrl: string = environment.API_ENDPOINT;
    private postDealerUrl: string = environment.API_DEALER_ENDPOINT;

    private API_KEY: string = environment.API_KEY;

    constructor(private http: HttpClient) {
        this.SetUrlMappings();
    }

    /**
     * Fetch object from id
     * @param typeName 
     * @param id 
     */
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

    /**
     * Get list of values (such as tblMakes, but tblModels needs makeId)
     * Optionally pass either an id or a 2D array of a field name and value to search
     * How to pass a predicate to the API?
     * @param typeName 
     * @param id 
     * @param where 
     */
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
            if (where.length > 2) {
                url = url + '&' + where[2] + '=' + where[3];
            }
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

    storeValueArray<T>(typeName: string, arr: T[], fields: string[]) {
        let url = postFromArrayUrlMap.get(typeName);
        if (!url) {
            return throwError('Url look up failed, keyvalue: \'' + typeName + '\', was not found.');
        }
        url += '?fields=' + JSON.stringify(fields);
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

    /**
     * Pass object to store with field names to update
     * @param typeName  - string name of type to do URL lookup
     * @param value     - actual object
     * @param fields    - array of fields to update
     */
    storeObject<T>(typeName: string, value: T, fields: string[]) {
        let url = postUrlMap.get(typeName);
        if (!url) {
            return throwError('Url look up failed, keyvalue: \'' + typeName + '\', was not found.');
        }
        url += '?fields=' + JSON.stringify(fields);
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
        getUrlMap.set('string', this.getLastEditedUrl);

        getListUrlMap.set('Lease', this.getLeasesUrl);
        getListUrlMap.set('VehicleMake', this.getMakesUrl);
        getListUrlMap.set('VehicleModel', this.getModelsUrl);
        getListUrlMap.set('FLEXDealer', this.getDealersUrl);
        getListUrlMap.set('MaintenanceValue', this.getMaintValuesUrl);
        getListUrlMap.set('LeaseResidual', this.getLeaseResidualsArrayUrl);
        getListUrlMap.set('DealerStateProfile', this.getDealerStateProfileArrayUrl);
        getListUrlMap.set('YearResidualImpactor', this.getYearResidualImpactorArrayUrl);

        // getFromArrayUrlMap.set('MaintenanceValue', this.getMaintValueArrayUrl);

        postUrlMap.set('VehicleModel', this.postVehicleModelValueUrl);
        postUrlMap.set('CustomerApp', this.postLeaseUrl);
        postUrlMap.set('FLEXDealer', this.postDealerUrl);

        postFromArrayUrlMap.set('MaintenanceValue', this.postMaintenanceValueUrl);
    }
}

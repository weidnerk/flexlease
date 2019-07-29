// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_ENDPOINT: 'http://localhost:64995/api/v1/leases/',
  API_VEHICLE_ENDPOINT: 'http://localhost:64995/api/v1/vehicles/',
  API_MAINT_ENDPOINT: 'http://localhost:64995/api/v1/maintenancevalues/',
  LOGIN_API_ENDPOINT: 'http://localhost:64995/api/v1/membership/',
  API_DEALER_ENDPOINT: 'http://localhost:64995/api/v1/dealers/',
  // API_KEY: '1caa374a-3825-4ea5-ac02-3ea703385413'
  API_KEY: '87ffd279-5de6-4560-af6f-f6f5848e48b9'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// CMS API Company Controller defines a route prefix, whereas FloorPlannerController does not
//

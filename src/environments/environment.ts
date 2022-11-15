// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUserURL: "http://localhost:4005/mk-api/v1/user/",
  apiPassURL: "http://localhost:4005/mk-api/v1/password/",
  apiEmployeeURL: "http://localhost:4005/mk-api/v1/employee/",
  apiJobURL: "http://localhost:4005/mk-api/v1/job/",
  //apiJobURL: "http://13.115.154.253/mk-api/v1/job/",
  apiJobtestURL: "http://localhost:4005/mk-api/v1/jobtest/",
  apiAttendanceURL: "http://localhost:4005/mk-api/v1/attendance/"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://farmfunds.herokuapp.com/api/v1/',
  imagePath: "https://farmfunds.herokuapp.com",

  // baseUrl: 'http://localhost:3000/api/v1/',
  // imagePath: "http://localhost:3000",
  //paystack_key: 'pk_test_801d715bb68f121b21aac949a0f65b3a93dfb3d0'
   paystack_key: 'pk_test_e7861b0c2ca5ed383dc4d2934270218b5a88e292'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

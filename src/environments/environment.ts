// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl: 'http://192.168.0.20:8080/sasf-auditoria'
  //apiUrl: 'http://192.168.0.20:8765'
  //apiUrl: 'https://192.168.0.20:8443',
  //apiUrlAge: 'https://192.168.0.20:9443'

  apiUrl: 'http://192.168.1.15:8280',
  apiUrlAge: 'http://192.168.1.15:8280/age/1.0.0',
  apiUrlSri: 'http://192.168.1.15:8280/sri/1.0.0',
  apiUrlCib: 'http://192.168.1.15:8280/cib/1.0.0'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiBaseUrl: 'http://localhost:57759/api/',
  apiBaseUrlSignature: 'http://localhost:62367/api/',
  apiBaseUrlDossier:  'http://localhost:60684/api/' ,
 // apiBaseUrlFacade: 'http://localhost:50576/api/',
 // apiBaseUrlFacade: 'http://ngjeff000001_s:8024/TAQ.TNDM.Services.Facade/api/',
   apiBaseUrlFacade: 'http://taqqfrontald02:8088/taq.tndm.services.facade/api/',

  dossierPresentation: '',

  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

import 'angular'; // Import for side-effects, telling SystemJS to load it
import singleSpaAngularJS from 'single-spa-angularjs';
import { helloWorldDirective } from './components/hello-world.component';

// Access angular from global scope (loaded via side-effect import)
declare const angular: any; // Declare global angular for TypeScript

// Define the Angular module for this microfrontend
const appModule = angular.module('angularjsApp', []); // Use global angular

// Register the directive
appModule.directive('helloWorld', helloWorldDirective);

// Configure single-spa-angularjs helper
const ngLifecycles = singleSpaAngularJS({
  angular: angular, // Pass the global angular object
  mainAngularModule: 'angularjsApp',
  // uiRouter: false, // Set to true if using ui-router
  preserveGlobal: false, // Recommended for microfrontends
  template: '<hello-world />', // The root template for this microfrontend
  domElementGetter: () => document.getElementById('angularjs-app-container')
});

// Export the lifecycle functions
export const bootstrap = ngLifecycles.bootstrap;
export const mount = ngLifecycles.mount;
export const unmount = ngLifecycles.unmount; 
import * as angular from 'angular';
import singleSpaAngularJS from 'single-spa-angularjs';
import { helloWorldDirective } from './components/hello-world.component';

// Define the Angular module for this microfrontend
const appModule = angular.module('angularjsApp', []); // Use a unique name

// Register the directive
appModule.directive('helloWorld', helloWorldDirective);

// Configure single-spa-angularjs helper
const ngLifecycles = singleSpaAngularJS({
  angular: angular,
  mainAngularModule: 'angularjsApp',
  // uiRouter: false, // Set to true if using ui-router
  preserveGlobal: false, // Recommended for microfrontends
  template: '<hello-world />', // The root template for this microfrontend
});

// Export the lifecycle functions
export const bootstrap = ngLifecycles.bootstrap;
export const mount = ngLifecycles.mount;
export const unmount = ngLifecycles.unmount; 
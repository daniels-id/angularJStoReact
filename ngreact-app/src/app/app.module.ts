import angular from 'angular';
import 'ngreact'; // Import ngReact library - This initializes the 'react' module
import { helloWorldDirective } from './hello.component';
import SimpleReactComponent from './react/SimpleReactComponent';

// Define the Angular module and include 'react' module as a dependency
const appModule = angular.module('app', ['react']);

// Register the original AngularJS directive
appModule.directive('helloWorld', helloWorldDirective);

// Register the React component as an Angular value
console.log('Registering SimpleReactComponent as an Angular value.');
appModule.value('SimpleReactComponent', SimpleReactComponent);

export default appModule; 
import * as angular from 'angular';

// No controller needed for this simple directive

// Define the directive definition object for Angular 1.3
export function helloWorldDirective(): angular.IDirective {
    return {
        restrict: 'E', // Use as element <hello-world>
        template: '<h1>Hello, World from Angular 1.3!</h1>' // Simple template
        // No controller, controllerAs, or bindToController needed
    };
} 
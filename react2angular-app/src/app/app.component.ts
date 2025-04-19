import * as angular from 'angular';

class AppController implements angular.IController {
    public bindableName: string;
    public message: string;

    constructor(private $scope: angular.IScope) {
        this.message = 'Hello from the Angular Container!';
        this.bindableName = 'Initial Angular Value';
    }

    // Method to be passed to React component
    // Needs to be an arrow function to preserve 'this' context
    public handleNameChange = (newName: string) => {
        // Use $scope.$applyAsync or $timeout for safe digest cycle updates
        this.$scope.$applyAsync(() => {
            this.bindableName = newName;
            console.log('[Angular] bindableName updated to:', this.bindableName);
        });
    }

    // Dependency Injection
    static $inject = ['$scope'];
}

export const appComponent: angular.IComponentOptions = {
    template: `
        <div>
            <h1>{{$ctrl.message}}</h1>
            <p>Value in Angular Container: <strong>{{$ctrl.bindableName}}</strong></p>
            <hr />
            <!-- Use the wrapped React component -->
            <!-- Pass data down ('name') and the callback up ('onNameChange') -->
            <simple-react-angular-component 
                name="$ctrl.bindableName" 
                on-name-change="$ctrl.handleNameChange">
            </simple-react-angular-component>
        </div>
    `,
    controller: AppController
}; 
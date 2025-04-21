import * as angular from 'angular';

class AppController implements angular.IController {
    public bindableName: string;
    public message: string;
    public nestedValueDisplay: string = '';

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

    // Method to handle changes from the nested React component
    public handleNestedValueChange = (newNestedValue: string) => {
        this.$scope.$applyAsync(() => {
            this.nestedValueDisplay = newNestedValue;
            console.log('[Angular] nestedValueDisplay updated to:', this.nestedValueDisplay);
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
            <p>Nested Value in Angular Container: <strong>{{$ctrl.nestedValueDisplay}}</strong></p>
            <hr />
            <!-- Use the wrapped React component -->
            <!-- Pass data down ('name') and callbacks up ('onNameChange', 'onNestedValueChange') -->
            <simple-react-angular-component 
                name="$ctrl.bindableName" 
                on-name-change="$ctrl.handleNameChange"
                on-nested-value-change="$ctrl.handleNestedValueChange">
            </simple-react-angular-component>
        </div>
    `,
    controller: AppController
}; 
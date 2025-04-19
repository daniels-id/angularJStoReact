import angular, { IScope } from 'angular'; // Import IScope

class HelloWorldController implements angular.IController {
    public message: string;
    public bindableName: string; // Renamed from componentName for clarity, holds data for binding

    // Inject $scope to trigger digest cycle safely
    constructor(private $scope: IScope) { 
        this.message = 'Hello from AngularJS 1.3!';
        this.bindableName = 'InitialAngularValue'; // Initial value for binding
    }

    $onInit() {}

    // Function called by React component when its value changes
    public handleNameChange = (newName: string) => {
        console.log('[Angular] handleNameChange called with:', newName);
        // Use $evalAsync to safely update Angular scope and trigger digest
        this.$scope.$evalAsync(() => {
            this.bindableName = newName;
        });
    }

    // Static property for Angular DI
    static $inject = ['$scope'];
}

export function helloWorldDirective(): angular.IDirective {
    return {
        restrict: 'E',
        // Pass the data AND the callback function down as props
        template: `
            <div>
                <h1>{{$ctrl.message}}</h1>
                <p>Value in Angular Controller: <strong>{{$ctrl.bindableName}}</strong></p>
                <hr />
                <react-component 
                    name="SimpleReactComponent" 
                    props="{ name: $ctrl.bindableName, onNameChange: $ctrl.handleNameChange }">
                </react-component>
            </div>
        `,
        controller: HelloWorldController,
        controllerAs: '$ctrl',
        // bindToController needs to be an object for isolated scope in 1.3
        // For simplicity here, we rely on the default scope inheritance or use $ctrl.
        // If an isolated scope were used, bindToController: {} would be needed.
        bindToController: true // This is okay for non-isolated scope
    };
}

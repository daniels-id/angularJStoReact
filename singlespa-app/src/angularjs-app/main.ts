import 'angular';
import * as singleSpaAngularJS from 'single-spa-angularjs';


declare const window: any;
declare const angular: any;
declare const System: any;


// Define the main module, dependency 'single-spa-angularjs' is expected to be globally defined by SystemJS import
const appModule = angular.module('angularjsApp', ['single-spa-angularjs']);

appModule.directive('angularjsAppRoot', function() {
  return {
    restrict: 'E',
    template: `
      <div>
        <h1>Hello from Main AngularJS App!</h1>
        <p>Below is the React Parcel:</p>
        <hr/>
        <single-spa-parcel
          parcel-config="reactParcelConfig"
          props="reactParcelProps"
        ></single-spa-parcel>
        <hr/>
      </div>
    `,
    controller: ['$scope', function($scope: any) { 
      console.log('AngularJS App: angularjsAppRoot controller initialized.');


      $scope.reactParcelConfig = () => System.import('@singlespa-app/react-app');

      $scope.reactParcelProps = {
        customAppName: 'my-react-parcel'
      };
      
      $scope.$on('$destroy', () => {
        console.log('AngularJS App: angularjsAppRoot controller scope destroyed.');
      });
    }]
  };
});

// Access the factory function, checking for .default common with ES module interop
const lifecyclesFactory = singleSpaAngularJS.default || singleSpaAngularJS;

const ngLifecycles = lifecyclesFactory({
  angular: window.angular, // Keep Explicitly pass window.angular
  mainAngularModule: 'angularjsApp',
  preserveGlobal: false,
  template: '<angularjs-app-root />',
});

export const bootstrap = (props: any) => {
  return ngLifecycles.bootstrap(props);
};

// REVERT mount to original simple version
export const mount = (props: any) => {
  return ngLifecycles.mount(props);
};

export const unmount = (props: any) => {
  return ngLifecycles.unmount(props);
};

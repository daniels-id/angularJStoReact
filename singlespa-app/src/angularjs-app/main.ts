import 'angular';
import singleSpaAngularJS from 'single-spa-angularjs';

declare const angular: any;
declare const System: any; 

let capturedProps: any = {};

const appModule = angular.module('angularjsApp', []); // Use global angular


appModule.directive('angularjsAppRoot', function() {
  return {
    restrict: 'E',
    template: `
      <div>
        <h1>Hello from Main AngularJS App!</h1>
        <p>Below is the React Parcel:</p>
        <hr/>
        <div id="react-parcel-container"></div>
        <hr/>
      </div>
    `,
    link: function(scope: any, element: JQLite, attrs: any) {
      let reactParcel: any = null;
      const parcelContainer = element[0].querySelector('#react-parcel-container');
      const singleSpaMountParcel = capturedProps.mountParcel;

      if (!singleSpaMountParcel || !parcelContainer) {
        console.error('AngularJS App: singleSpaMountParcel function or parcel container element not available.', { singleSpaMountParcel, parcelContainer });
        return;
      }

      const mountReactParcel = () => {
        console.log('AngularJS App: Attempting to mount React parcel...');
        try {
          const parcelConfig = () => System.import('@singlespa-app/react-app');
          reactParcel = singleSpaMountParcel(parcelConfig, { 
            domElement: parcelContainer,
            customAppName: 'my-react-parcel' 
          });
          reactParcel.mountPromise.then(() => {
            console.log('AngularJS App: React parcel mounted successfully.');
          }).catch((err: any) => {
            console.error('AngularJS App: Error mounting React parcel:', err);
            if (parcelContainer) parcelContainer.innerHTML = 'Error mounting React parcel';
          });
        } catch (err) {
          console.error('AngularJS App: Error calling mountParcel:', err);
          if (parcelContainer) parcelContainer.innerHTML = 'Error calling mountParcel';
        }
      };

      const unmountReactParcel = () => {
        if (reactParcel && reactParcel.getStatus() === 'MOUNTED') {
          console.log('AngularJS App: Unmounting React parcel...');
          reactParcel.unmount().catch((err: any) => {
            console.error('AngularJS App: Error unmounting React parcel:', err);
          });
        }
      };

      // Mount the parcel immediately
      mountReactParcel();

      // Unmount the parcel when the directive scope is destroyed
      scope.$on('$destroy', unmountReactParcel);
    }
  };
});



const ngLifecycles = singleSpaAngularJS({
  angular: angular, 
  mainAngularModule: 'angularjsApp',
  preserveGlobal: false,
  template: '<angularjs-app-root />',
});

export const bootstrap = (props: any) => {
  capturedProps = props; 
  return ngLifecycles.bootstrap(props);
};

export const mount = (props: any) => {
  capturedProps = props;
  return ngLifecycles.mount(props);
};

export const unmount = (props: any) => {
  return ngLifecycles.unmount(props);
};

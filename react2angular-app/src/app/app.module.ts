import * as angular from 'angular';
import { react2angular } from 'react18-react2angular';
import SimpleReactComponent from './components/SimpleReactComponent';
import { appComponent } from './app.component';

const appModule = angular.module('app', [
]);

const SimpleReactAngularComponent = react2angular(
    SimpleReactComponent,
    ['name', 'onNameChange']
);

appModule.component('simpleReactAngularComponent', SimpleReactAngularComponent);

appModule.component('appRoot', appComponent);

export default appModule; 
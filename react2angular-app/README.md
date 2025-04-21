# React Integration with AngularJS using react18-react2angular

This project demonstrates integrating React components into an AngularJS application using `react18-react2angular`. This allows leveraging React components within an Angular 1.x environment.

## Overview

The `react18-react2angular` library acts as a bridge, allowing React components to be used as if they were native AngularJS components.

### Configuration

-   In `src/app/app.module.ts`, the `react2angular` function wraps the target React component (`SimpleReactComponent`).
-   This function requires specifying the React component itself and an array of prop names (`name`, `onNameChange`, `onNestedValueChange`) that the component expects.
-   The result is registered as a standard AngularJS component (named `simpleReactAngularComponent`), making it available for use in AngularJS templates.

### Usage in AngularJS

-   The wrapped component is used in AngularJS templates (like in `src/app/app.component.ts`) using its registered tag name (`<simple-react-angular-component>`).
-   Attributes on this tag correspond to the props defined during configuration.

### Data Flow

-   **AngularJS to React (Props Down):** Data is passed from the AngularJS controller to the React component by binding controller properties to attributes on the component tag (e.g., `name="$ctrl.bindableName"`). These become props within the React component.
-   **React to AngularJS (Callbacks Up):** To communicate changes back to AngularJS, callback functions are passed as props. AngularJS controller methods are bound to specific attributes (e.g., `on-name-change="$ctrl.handleNameChange"`, `on-nested-value-change="$ctrl.handleNestedValueChange"`). When an event occurs in the React component (like an input change), it calls the appropriate callback prop. This executes the corresponding method in the AngularJS controller. Inside the controller method, `$scope.$applyAsync` is typically used to ensure the AngularJS scope is updated and the changes are reflected in the view.

This approach allows for two-way communication: data flows down via props, and updates flow back up via callbacks passed as props. The nested component (`NestedReactComponent`) example demonstrates how this callback pattern can be chained through multiple React components to propagate changes from deep within the React tree back to the parent AngularJS application. 
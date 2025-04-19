# AngularJS 1.3 Starter

A barebones starter project using AngularJS 1.3, TypeScript, and Webpack.

## Prerequisites

*   Node.js and npm (or yarn)

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Run the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    This will open the application in your default browser at `http://localhost:9000`.

## Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

This will generate optimized assets in the `dist` directory.

## How ngReact Works (Embedding React Components)

Here's a step-by-step breakdown of how `ngReact` works to embed the `SimpleReactComponent` in this setup:

1.  **Initialization (`import 'ngreact';`)**:
    *   When your application bundles and runs, the line `import 'ngreact';` in `src/app/app.module.ts` executes the `ngReact` library code.
    *   This code defines a new AngularJS module named `'react'`. It also registers core components within this `'react'` module, most importantly the `react-component` directive and the `reactDirective` service (which `react-component` uses internally). This registration happens inside the `ngReact` library source code itself.

2.  **Making React Component Available (`app.value('SimpleReactComponent', SimpleReactComponent);`)**:
    *   In `src/app/app.module.ts`, the line `app.value('SimpleReactComponent', SimpleReactComponent)` takes your actual React component (`SimpleReactComponent` imported from its `.tsx` file) and registers it with Angular's dependency injector under the string name `'SimpleReactComponent'`. Angular can now inject this component when asked for by name.

3.  **Angular Template Encountering `react-component`**:
    *   AngularJS compiles the template of your Angular directive (e.g., `helloWorldDirective`).
    *   It encounters the tag: `<react-component name="SimpleReactComponent" props="{ name: $ctrl.componentName }"></react-component>`.
    *   Because `'react'` was included as a dependency (`angular.module('app', ['react']);`), Angular knows about the `react-component` directive defined by `ngReact`.

4.  **`react-component` Directive Linking**:
    *   The `link` function of the `react-component` directive executes.
    *   **`name` Attribute:** It reads the `name` attribute (`"SimpleReactComponent"`). It looks for an Angular injectable (like the one registered via `app.value()`) with this name.
    *   **`props` Attribute:** It reads the `props` attribute (`"{ name: $ctrl.componentName }"`). This is an Angular expression. The directive sets up an Angular `$watch` on this expression to detect changes in the values passed from the Angular scope (`$ctrl.componentName`).

5.  **React Rendering**:
    *   The `react-component` directive retrieves the actual React component (`SimpleReactComponent`) using the resolved `name`.
    *   It evaluates the `props` expression to get the current prop values (e.g., `{ name: 'AngularWorld' }`).
    *   It uses `React.createElement(SimpleReactComponent, props)` to create a React element.
    *   It then uses `ReactDOM.render()` to render this React element into the DOM element where the `<react-component>` tag was placed.

6.  **Updates**:
    *   If a value in the `props` expression (like `$ctrl.componentName`) changes in Angular, the `$watch` triggers.
    *   The directive re-evaluates the `props` expression.
    *   It calls `ReactDOM.render()` again on the same DOM element, passing the *new* props to the `SimpleReactComponent`. React efficiently updates the DOM.

In summary, `ngReact` bridges Angular and React by providing the `react-component` directive. This directive uses Angular's dependency injection to find React components and Angular's data binding (`$watch`, expression evaluation) to pass data as props, while using `ReactDOM` for the rendering lifecycle.
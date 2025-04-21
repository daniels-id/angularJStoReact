# Single-SPA AngularJS with React Parcel Example

This project demonstrates a single-spa setup where an AngularJS application mounts a React component as a single-spa parcel.

## Overview

The core concept involves:
1.  A **Root Config** (`src/root-config/root-config.ts`) that registers the microfrontends (AngularJS app and React parcel).
2.  An **AngularJS Application** (`src/angularjs-app/main.ts`) registered with single-spa.
3.  A **React Parcel** (`src/react-app/reactParcel.ts`) defined using `single-spa-react`.
4.  The AngularJS application uses the `<single-spa-parcel>` directive (provided by `single-spa-angularjs/lib/parcel.js`) to embed the React parcel within its template.

## Key Configuration Points

### 1. `index.html` Setup

The main entry point (`src/index.html`) is configured as follows:

*   **Global Angular:** AngularJS (v1.3.20) is loaded globally via a standard `<script>` tag *before* SystemJS. This ensures `window.angular` is available in the expected format for legacy scripts like `single-spa-angularjs/lib/parcel.js`.
*   **SystemJS:** SystemJS is used as the module loader for the single-spa applications and parcels built by Webpack.
*   **Import Map:**
    *   Maps essential libraries like `single-spa`, `react`, and `react-dom` to their CDN URLs for external loading.
    *   Maps the Webpack-built application bundles (`@singlespa-app/root-config`, `@singlespa-app/angularjs-app`, `@singlespa-app/react-app`) to their paths within the `dist` directory.
    *   Maps `angular` to the CDN URL. Even though Angular is global, this mapping satisfies internal resolution requests within SystemJS modules (like the bundled apps or `parcel.js`).
    *   Maps `single-spa-parcel-helper` to `/parcel.js`. This refers to the helper script copied into the `dist` directory by Webpack.
*   **Loading Sequence:**
    1.  `angular.min.js` is loaded via `<script>`.
    2.  `System.import('single-spa-parcel-helper')` loads the copied `parcel.js`, which defines the `single-spa-angularjs` module required by the Angular app.
    3.  `System.import('@singlespa-app/root-config')` loads the root configuration, which then registers and starts the applications.

### 2. `webpack.config.js`

The Webpack configuration (`webpack.config.js`) supports this setup:

*   **Entries:** Defines entry points for the root config, AngularJS app, and React app/parcel.
*   **Output:** Configured with `libraryTarget: 'system'` to produce SystemJS-compatible modules. Output is written to the `dist` directory.
*   **Externals:** Defines `angular`, `react`, and `react-dom` as externals using an object map (`{ 'angular': 'angular', ... }`). This tells Webpack not to bundle these libraries and to expect them to be provided by SystemJS according to the import map.
*   **`CopyWebpackPlugin`:** Explicitly copies `node_modules/single-spa-angularjs/lib/parcel.js` into the `dist` directory as `parcel.js`. This is necessary because loading it directly from `node_modules` via SystemJS or bundling it caused various issues.
*   **`devServer`:**
    *   Serves static files from the `dist` directory and the project root (`..`) to make `node_modules` potentially accessible (though the copied `parcel.js` is used).
    *   Uses `devMiddleware: { writeToDisk: true }` to force Webpack to write output files (including the copied `parcel.js`) to the `dist` directory, making them servable.

### 3. React Parcel (`src/react-app/reactParcel.ts`)

*   Uses `singleSpaReact` to wrap the main React component (`ReactComponent`).
*   Configures `React` and `ReactDOM` (using the standard import for compatibility with the globally loaded UMD build).
*   Exports the entire configuration object as `ReactParcel`.

### 4. AngularJS App (`src/angularjs-app/main.ts`)

*   Uses `singleSpaAngularJS` to create the single-spa lifecycle functions (`bootstrap`, `mount`, `unmount`).
*   Passes the global `window.angular` to the configuration.
*   Defines the main module (`angularjsApp`) and declares a dependency on `'single-spa-angularjs'` (the module provided by the globally loaded `parcel.js`).
*   Contains the `angularjsAppRoot` directive.
*   **Lifecycle Integration:** The code block using `singleSpaAngularJS({...})` is crucial. It takes configuration about the Angular app (like the main module name and root template element) and generates the standard `bootstrap`, `mount`, and `unmount` lifecycle functions. These functions are then exported, allowing the main single-spa framework to manage the loading, rendering, and unloading of the AngularJS application.

### 5. Embedding the Parcel

The key part of embedding the React parcel happens in the `angularjsAppRoot` directive within `src/angularjs-app/main.ts`:

*   **Template:** Uses the `<single-spa-parcel>` directive.
    *   `parcel-config="reactParcelConfig"`: Binds to a scope variable containing the parcel configuration.
    *   `props="reactParcelProps"`: Passes additional props down to the React parcel.
*   **Controller:**
    *   Defines `$scope.reactParcelConfig`: This is set to a *loading function* (`() => System.import('@singlespa-app/react-app').then(mod => mod.ReactParcel)`). This tells the directive to:
        1.  Use SystemJS to load the `@singlespa-app/react-app` module.
        2.  Access the exported `ReactParcel` configuration object from that module.
    *   Defines `$scope.reactParcelProps`: An object containing custom props for the React parcel.
*   **`mountParcel`:** The `<single-spa-parcel>` directive automatically receives the necessary `mountParcel` function from the single-spa context. Manual handling via `$rootScope` or attributes is not required.

This setup ensures the AngularJS application can dynamically load and mount the React parcel using the standard mechanisms provided by `single-spa-angularjs`. 
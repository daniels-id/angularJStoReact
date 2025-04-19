# Single-SPA Example: AngularJS with React Parcel

This project demonstrates a basic `single-spa` setup where an AngularJS application dynamically mounts a React component as a `single-spa` parcel.

## Overview

The core components are:

1.  **Root Config (`src/root-config/root-config.ts`):** Registers the microfrontend applications with `single-spa`.
2.  **AngularJS App (`src/angularjs-app/main.ts`):** The primary application that also renders the React parcel.
3.  **React App / Parcel (`src/react-app/reactParcel.ts` & `src/react-app/react.component.tsx`):** A React component configured as a `single-spa` parcel.
4.  **Build & Load Process:** Webpack bundles the applications, and SystemJS loads them using an import map defined in `src/index.html`.

## How It Works

### 1. Application Registration (`src/root-config/root-config.ts`)

- The `root-config.ts` file is the main entry point defined in `webpack.config.js` for the `root-config` bundle.
- It uses `singleSpa.registerApplication()` to register **only the AngularJS app** (`@singlespa-app/angularjs-app`) as a top-level application.
- The React app (`@singlespa-app/react-app`) is **not registered here** because it is intended to be loaded dynamically as a parcel by the AngularJS app.
- Registration for the AngularJS app involves providing:
    - Its unique name (`@singlespa-app/angularjs-app`).
    - A loading function (`() => System.import(...)`) that tells `single-spa` how to load the application's code using SystemJS.
- Finally, `singleSpa.start()` is called to activate `single-spa`.

### 2. React Parcel Creation (`src/react-app/reactParcel.ts`)

- This file serves as the entry point for the React application/parcel.
- It imports `React`, `ReactDOM`, the root React component (`./react.component.tsx`), and the `singleSpaReact` helper.
- The core step is calling `singleSpaReact({...})`. This function takes the React essentials and the root component as input.
- It returns an object containing the standard `single-spa` lifecycle functions (`bootstrap`, `mount`, `unmount`) tailored for this React component.
- These lifecycle functions are exported from this file, making the React component usable as a `single-spa` application or parcel.

### 3. Parcel Mounting in AngularJS (`src/angularjs-app/main.ts`)

- The AngularJS application is registered as a `single-spa` application using the `singleSpaAngularJS` helper.
- Its main UI is defined in the `angularjsAppRoot` directive.
- **Crucially, the `link` function** of this directive is where the React parcel is mounted:
    - **Props Capture:** The `bootstrap` and `mount` lifecycle functions exported by this file capture the `props` passed by `single-spa`, which include the essential `mountParcel` function.
    - **Finding Target:** The `link` function finds the placeholder `div` (`#react-parcel-container`) in its template.
    - **Loading:** It calls `System.import('@singlespa-app/react-app')` to load the React parcel's code (using the SystemJS import map defined in `src/index.html` which points to the bundled `react-app.js`).
    - **Mounting:** It retrieves the captured `mountParcel` function and calls it, passing:
        - The loaded parcel configuration (the exported lifecycles from `reactParcel.ts`).
        - An options object containing the `domElement` (the placeholder `div`) where the React parcel should render itself.
    - **Unmounting:** A listener on the scope's `$destroy` event ensures the parcel's `unmount` function is called when the AngularJS directive is removed.

## Build Process (`webpack.config.js`)

- Webpack is configured to create separate bundles for the root config, AngularJS app, and React app.
- The `entry` points define the source files (`root-config.ts`, `angularjs-app/main.ts`, `react-app/reactParcel.ts`).
- The `output` is configured with `libraryTarget: 'system'` to produce bundles compatible with SystemJS.
- The `HtmlWebpackPlugin` processes `src/index.html`, which contains the SystemJS import map linking the application names to their corresponding bundled JS files (e.g., `@singlespa-app/react-app` maps to `/react-app.js`).

This setup allows the AngularJS application to dynamically load and embed the React component at runtime, managed by the `single-spa` framework. 
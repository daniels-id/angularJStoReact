import React from 'react';
// Import standard ReactDOM
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './react.component';

const reactParcel = singleSpaReact({
  React,
  // Pass standard ReactDOM - using type assertion to bypass build error
  ReactDOM: ReactDOM as any,
  rootComponent: Root,
  domElementGetter: () => document.getElementById('react-app-container')!,
  errorBoundary(err, info, props) {
    // Customize the error boundary for your needs
    return React.createElement('div', null, `Error occurred in ${props.name}: ${err.message}`);
  },
});

export const { bootstrap, mount, unmount } = reactParcel; 
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import Root from './root.component';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the error boundary for your needs
    return React.createElement('div', null, `Error occurred in ${props.name}: ${err.message}`);
  },
});

export const { bootstrap, mount, unmount } = lifecycles; 
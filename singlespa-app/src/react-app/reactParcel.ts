import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import ReactComponent from './react.component';

export const ReactParcel = singleSpaReact({
  React,
  ReactDOM: ReactDOM as any,
  rootComponent: ReactComponent,
  errorBoundary(err, info, props) {
    return React.createElement('div', null, `Error occurred in ${props.name}: ${err.message}`);
  },
}); 
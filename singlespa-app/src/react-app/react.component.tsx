import React from 'react';

export default function ReactComponent(props) {
  // Read the custom prop passed from mountParcel
  // props.name will still be 'parcel-0' (the internal single-spa name)
  return (
    <section>
      <h1>Hello from React App!</h1>
      <p>App Name: {props.customAppName}</p>
    </section>
  );
} 
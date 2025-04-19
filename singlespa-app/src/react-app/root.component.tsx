import React from 'react';

export default function Root(props) {
  // props includes useful single-spa props like name, singleSpa, mountParcel
  return (
    <section>
      <h1>Hello from React App!</h1>
      <p>App Name: {props.name}</p>
    </section>
  );
} 
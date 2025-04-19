import { registerApplication, start } from "single-spa";

// Declare SystemJS for TypeScript
declare const System: {
  import(moduleId: string): Promise<any>;
};

registerApplication(
  // Name of our application
  "@singlespa-app/angularjs-app",
  // Our loading function
  () => System.import("@singlespa-app/angularjs-app"),
  // Our activity function
  (location) => location.pathname.startsWith('/angularjs')
);

registerApplication(
  "@singlespa-app/react-app",
  () => System.import("@singlespa-app/react-app"),
  (location) => location.pathname.startsWith('/react')
);

console.log("single-spa root config: Applications registered.");

// Start single-spa
start({
  urlRerouteOnly: true, // Recommended setting
}); 
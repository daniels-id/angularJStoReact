import { registerApplication, start } from "single-spa";

// Declare SystemJS for TypeScript
declare const System: {
  import(moduleId: string): Promise<any>;
};

registerApplication(
  "@singlespa-app/angularjs-app",
  () => System.import("@singlespa-app/angularjs-app"),
  (location) => true // Always active
);

console.log("single-spa root config: AngularJS app registered.");

// Start single-spa
start({
  urlRerouteOnly: true,
}); 
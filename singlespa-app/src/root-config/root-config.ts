import { registerApplication, start } from "single-spa";

// We will register applications here later
console.log("single-spa root config loaded.");

// Start single-spa
start({
  urlRerouteOnly: true, // Recommended setting
}); 
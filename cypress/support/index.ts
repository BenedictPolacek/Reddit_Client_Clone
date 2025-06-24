Cypress.on("uncaught:exception", (err) => {
  if (
    /Minified React error #418/.test(err.message) 
  ) {
    return false;
  }
});
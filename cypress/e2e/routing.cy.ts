describe('Доступные страницы:', () => {
  it('reverse строки', function() {
    cy.viewport(1440, 900);
    cy.visit('http://localhost:3000/recursion');
    cy.wait(1000)
  });
  it('фибоначчи', function() {
    cy.viewport(1440, 900);
    cy.visit('http://localhost:3000/fibonacci');
    cy.wait(1000)
  });
  it('сортировка массива', function() {
    cy.viewport(1440, 900);
    cy.visit('http://localhost:3000/sorting');
    cy.wait(1000)
  });
  it('стек', function() {
    cy.viewport(1440, 900);
    cy.visit('http://localhost:3000/stack');
    cy.wait(1000)
  });
  it('очередь', function() {
    cy.viewport(1440, 900);
    cy.visit('http://localhost:3000/queue');
    cy.wait(1000)
  });
  it('список', function() {
    cy.viewport(1440, 900);
    cy.visit('http://localhost:3000/list');
    cy.wait(1000)
  });
})
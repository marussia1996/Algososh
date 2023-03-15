describe('Сервис доступен', function() {
  it('по адресу localhost:3000', function() {
    cy.viewport(1440, 900);
    cy.visit('http://localhost:3000');
  });
}); 
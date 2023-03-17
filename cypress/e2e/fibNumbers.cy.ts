describe('Проверка работы страницы чисел Фибаначчи:', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci')
    //находим необходимые элементы на странице
    cy.get('[data-testid="val"]').as('value');
    cy.get('[data-testid="button"]').as('button');
  })
  it('кнопка добавления недоступна при пустом инпуте', () => {
    cy.get('@value').should('have.value','');
    cy.get('@button').should('be.disabled');
  })
  it('числа генерируются верно', () => {
    const number = 4;
    const result = [1,1,2,3,5];
    cy.get('@value').type(number);
    cy.get('@button').should('be.not.disabled').click();
    //ждем появление кружков
    cy.wait(500 * result.length)
    cy.get('[data-testid="circle"]').as('circles')
    //проверяем кол-во кружков
    cy.get("@circles").should('have.length', result.length)
    //проверяем у текущего кружка значение
    for(let i = 0; i < result.length; i++){
      cy.get("@circles").should(async($circle) => {;
        expect($circle[i]).to.have.text(result[i]);
      })
    } 
  })
})
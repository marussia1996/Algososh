describe('Страница reverse строки', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion')
    //утверждаем что значение инпута пустая строка
    cy.get('[data-testid="input"]').should('have.value', '').as('string');
    cy.get('[data-testid="button"]').as('button')
  })

  it('кнопка недоступна при пустом инпуте', () => {
    cy.get('@button').should('be.disabled')
  })
  it('строка разворачивается корректно', () => {
    const testString = 'apple';
    cy.get('@string').type(testString);
    cy.get('@button').should('be.not.disabled').click();

    cy.get('[data-testid="circle"]').as('circles')
    cy.get("@circles").should(async($circle) => {
      //проверка кол-во кружков
      expect($circle).to.have.length(testString.length);
      //проверка что кружки имеют правильное значение и цвет
      for(let i = 0; i < testString.length; i++){
        expect($circle[i]).to.have.text(testString[i]);
        expect($circle[i]).to.have.css("border",'4px solid rgb(0, 50, 255)');
      }
      //итерация 1
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect($circle[0]).to.have.css("border",'4px solid rgb(210, 82, 225)');
        expect($circle[4]).to.have.css("border",'4px solid rgb(210, 82, 225)');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect($circle[0]).to.have.text(testString[4]);
        expect($circle[4]).to.have.text(testString[0]);
        expect($circle[0]).to.have.css("border",'4px solid rgb(127, 224, 81)');
        expect($circle[4]).to.have.css("border",'4px solid rgb(127, 224, 81)');
      //итерация 2
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect($circle[1]).to.have.css("border",'4px solid rgb(210, 82, 225)');
        expect($circle[3]).to.have.css("border",'4px solid rgb(210, 82, 225)');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect($circle[1]).to.have.text(testString[3]);
        expect($circle[3]).to.have.text(testString[1]);
        expect($circle[1]).to.have.css("border",'4px solid rgb(127, 224, 81)');
        expect($circle[3]).to.have.css("border",'4px solid rgb(127, 224, 81)');
      //итерация 3
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect($circle[2]).to.have.text(testString[2]);
        expect($circle[2]).to.have.text(testString[2]);
        expect($circle[2]).to.have.css("border",'4px solid rgb(127, 224, 81)');
        expect($circle[2]).to.have.css("border",'4px solid rgb(127, 224, 81)');
      
    });   
   
  })
})
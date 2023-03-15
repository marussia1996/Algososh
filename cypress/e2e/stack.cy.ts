describe('template spec', () => {
  const testArr = [2,3,4,3,6];
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack')
    //находим необходимые элементы на странице
    cy.get('[data-testid="val"]').as('value');
    cy.get('[data-testid="push"]').as('push');
    cy.get('[data-testid="pop"]').as('pop');
    cy.get('[data-testid="clear"]').as('clear');
  })
  it('кнопка добавления недоступна при пустом инпуте', () => {
    cy.get('@value').should('have.value','');
    cy.get('@push').should('be.disabled');
  })
  it('Добавление в стек происходит верно', () => {
   
    for(let i = 0; i < testArr.length ;i++)
    {  
      //записываем в инпут значение и добавляем в стек
      cy.get('@value').type(testArr[i]);
      cy.get('@push').should('be.not.disabled').click();
      cy.get('[data-testid="circle"]').as('circles')
      //проверяем у текущего кружка значение и цвет рамки
      cy.get("@circles").should(async($circle) => {
        expect($circle[i]).to.contain(testArr[i]);
        expect($circle[i]).to.have.css(
          "border",
          '4px solid rgb(210, 82, 225)'
        );

      await new Promise((resolve) => setTimeout(resolve, 500));
        expect($circle).to.have.css(
          "border",
          '4px solid rgb(0, 50, 255)'
        );
      });
    }
  });
  it('Удаление из стека происходит верно', () => {
    //заполняем стек
    for(let i = 0; i < testArr.length; i++){
      cy.get('@value').type(testArr[i]);
      cy.get('@push').should('be.not.disabled').click();
    }
    //нажатие на кнопку удаления
    cy.get('@pop').should('be.not.disabled').click();
    cy.get('[data-testid="circle"]').as('circles')
    //проверяем у удаляемого кружка цвет рамки
    cy.get("@circles").should(async($circle) => {
      expect($circle[testArr.length -1]).to.have.css(
        "border",
        '4px solid rgb(210, 82, 225)'
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      //проверка что кол-во кружков уменьшилось
      expect($circle).to.have.length(testArr.length - 1)
    });
  });
  it('Удаление из стека происходит верно', () => {
    //заполняем стек
    for(let i = 0; i < testArr.length; i++){
      cy.get('@value').type(testArr[i]);
      cy.get('@push').should('be.not.disabled').click();
    }
    //нажатие на кнопку очистки
    cy.get('@clear').should('be.not.disabled').click();
    //проверка что стек пуст
    cy.get('[data-testid="stack"]').should('be.empty')
  });
})
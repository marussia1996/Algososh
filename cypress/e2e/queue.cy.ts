describe('Проверка работы страницы очередь:', () => {
  const testArr = [2,3,4,3,6];
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue')
    //находим необходимые элементы на странице
    cy.get('[data-testid="val"]').as('value');
    cy.get('[data-testid="add"]').as('add');
    cy.get('[data-testid="del"]').as('del');
    cy.get('[data-testid="clear"]').as('clear');
  })
  it('кнопка добавления недоступна при пустом инпуте', () => {
    cy.get('@value').should('have.value','');
    cy.get('@add').should('be.disabled');
  })
  it('добавление в очередь происходит верно', () => {
    for(let i = 0; i < 7; i++){
      //записываем в инпут значение и добавляем в очередь
      cy.get('@value').type(i);
      cy.get('@add').should('be.not.disabled').click();
      cy.get('[data-testid="circle"]').as('circles')
      cy.get('[data-testid="head"]').as('heads')
      //проверка головы очереди
      cy.get("@heads").eq(0).should('have.text', 'head')
      //проверяем у текущего кружка значение и цвет рамки
      cy.get("@circles").should(async($circle) => {
        expect($circle[i]).to.contain(i);
        expect($circle[i]).to.have.css(
          "border",
          '4px solid rgb(210, 82, 225)'
        );
      await new Promise((resolve) => setTimeout(resolve, 500));
        expect($circle[i]).to.have.css(
          "border",
          '4px solid rgb(0, 50, 255)'
        );
      });
      //проверка хвоста очереди
      cy.get('[data-testid="tail"]').as('tails')
      cy.get("@tails").eq(i).should('have.text', 'tail')
    }
  })
  it('удаление из очереди происходит верно', () => {
    //заполняем очередь
    for(let i = 0; i < 7; i++){
      //записываем в инпут значение и добавляем в очередь
      cy.get('@value').type(i);
      cy.get('@add').should('be.not.disabled').click();
    }
    cy.get('@del').should('be.not.disabled').click();
    cy.get('[data-testid="head"]').as('heads')
    //получаем кружки
    cy.get('[data-testid="circle"]').as('circles');
    cy.get("@circles").should(async($circle) => {
      expect($circle[0]).to.have.css(
        "border",
        '4px solid rgb(210, 82, 225)'
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      expect($circle[0]).to.have.text('')
    })
    //проверка головы очереди
    cy.get("@heads").eq(0).should('have.text', '')
    cy.get("@heads").eq(1).should('have.text', 'head')
  });
  it('Очистка очереди происходит верно', () => {
    //заполняем очередь
    for(let i = 0; i < 7; i++){
      //записываем в инпут значение и добавляем в очередь
      cy.get('@value').type(i);
      cy.get('@add').should('be.not.disabled').click();
    }
    cy.get('@clear').should('be.not.disabled').click();
    //проверяем что нет надписи головы
    cy.get('[data-testid="head"]').as('heads')
    cy.get('@heads').should('have.text', '')
    //проверяем что кружки пустые
    cy.get('[data-testid="circle"]').as('circles');
    cy.get('@circles').should('have.text', '')
    //проверяем что нет надписи хвоста
    cy.get('[data-testid="tail"]').as('tails')
    cy.get('@tails').should('have.text', '')
  });
})
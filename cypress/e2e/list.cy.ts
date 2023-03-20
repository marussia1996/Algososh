describe('Проверка работы страницы списка:', () => {
  const defaultList = [32,2,70]
  beforeEach(() => {
    cy.visit('http://localhost:3000/list')
    //находим необходимые элементы на странице
    cy.get('[data-testid="val"]').as('value');
    cy.get('[data-testid="index"]').as('index');
    cy.get('[data-testid="addH"]').as('addHead');
    cy.get('[data-testid="delH"]').as('delHead');
    cy.get('[data-testid="addT"]').as('addTail');
    cy.get('[data-testid="delT"]').as('delTail');
    cy.get('[data-testid="addI"]').as('addInd');
    cy.get('[data-testid="delI"]').as('delInd');
  })
  it('кнопки добавления, добавления и удаления по индексу при пустом инпуте недоступны', () => {
    cy.get('@value').should('have.value','');
    cy.get('@addHead').should('be.disabled');
    cy.get('@addTail').should('be.disabled');
    cy.get('@addInd').should('be.disabled');
    cy.get('@delInd').should('be.disabled');
  });
  it('отрисовка дефолтного списка', () => {
    cy.get('[data-testid="circle"]').as('circles')
    cy.get("@circles").should('have.length', defaultList.length)
    cy.get('[data-testid="head"]').as('heads')
    //проверка головы списка
    cy.get("@heads").eq(0).should('have.text', 'head')
    for(let i = 0; i < defaultList.length ;i++)
    {  
      cy.get("@circles").should($circle => {
        expect($circle[i]).to.contain(defaultList[i]);
        expect($circle[i]).to.have.css("border",'4px solid rgb(0, 50, 255)');
      })
    }
    cy.get('[data-testid="tail"]').as('tails')
    //проверка хвоста списка
    cy.get("@tails").eq(2).should('have.text', 'tail')
  });
  it('добавление элемента в head', () => {
    cy.get('@value').type(4);
    cy.get('@addHead').should('be.not.disabled').click();
    cy.get('[data-testid="circle"]').as('circles')
    cy.get("@circles").eq(0).should('have.text', '4').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(1000)
    cy.get("@circles").should('have.length', defaultList.length + 1);
    cy.get('[data-testid="head"]').as('heads')
    //проверка головы списка
    cy.get("@heads").eq(0).should('have.text', 'head')
    //проверка значения в голове списка
    cy.get("@circles").eq(0).should('have.text', '4')
  })
  it('добавление элемента в tail', () => {
    cy.get('@value').type(5);
    cy.get('@addTail').should('be.not.disabled').click();
    cy.get('[data-testid="circle"]').as('circles')
    cy.get("@circles").eq(defaultList.length - 1).should('have.text', '5').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(1000)
    cy.get("@circles").should('have.length', defaultList.length + 1);
    //проверка значения в хвосте списка
    cy.get("@circles").eq(3).should('have.text', '5')
    cy.get('[data-testid="tail"]').as('tails')
    //проверка хвоста списка
    cy.get("@tails").eq(3).should('have.text', 'tail')
  })
  it('добавление элемента по индексу', () => {
    const index = 2;
    cy.get('@value').type(5);
    cy.get('@index').type(index);
    cy.get('@addInd').should('be.not.disabled').click();
    cy.get('[data-testid="circle"]').as('circles')
    cy.wait(1000);
    cy.get("@circles").eq(defaultList.length - 1 ).should('have.text', '5').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(1000);
    cy.get("@circles").should('have.length', defaultList.length + 1);
    cy.get("@circles").eq(index).should('have.text', '5')
  })
  it('удаление элемента из head', () => {
    cy.get('@delHead').should('be.not.disabled').click();
    cy.get('[data-testid="circle"]').as('circles')
    cy.get("@circles").eq(0).should('have.text', '')
    cy.get("@circles").eq(1).should('have.text', '32').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(1000);
    cy.get("@circles").should('have.length', defaultList.length - 1)
  })
  it('удаление элемента из tail', () => {
    cy.get('@delTail').should('be.not.disabled').click();
    cy.get('[data-testid="circle"]').as('circles')
    cy.get("@circles").eq(defaultList.length - 1 ).should('have.text', '')
    cy.get("@circles").eq(defaultList.length).should('have.text', '70').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(1000);
    cy.get("@circles").should('have.length', defaultList.length - 1)
  })
  it('удаление элемента по индексу', () => {
    const index = 2;
    cy.get('@value').type(5);
    cy.get('@index').type(index);
    cy.get('@delInd').should('be.not.disabled').click();
    cy.get('[data-testid="circle"]').as('circles')
    cy.wait(1000);
    cy.get("@circles").eq(defaultList.length - 1 ).should('have.text', '').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.get("@circles").eq(defaultList.length).should('have.text', '70').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(1000);
    cy.get("@circles").should('have.length', defaultList.length - 1)
  })
});
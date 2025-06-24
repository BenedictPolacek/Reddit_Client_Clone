import { PostData } from "@/lib/api";


describe('Navigation', () => {
  const firstEndpoint = {
    name: 'Popular',
    endpoint: 'Popular',
  };
  const secondTopic = {
    name: 'Music',
    endpoint: 'Music',
  };
  const personalWebUrl = 'https://benedictpolacek.github.io/BenedictPolacek-Personal-Portfolio-Website/';
  
  describe('on large screens', () => {

    beforeEach(() => {
      cy.viewport('macbook-16');
    })
    it('it should navigate from one topic to another', () => {
      cy.intercept('GET', '**').as('getPosts');

      cy.visit('http://localhost:3000/');
      cy.url().should('include', `/${firstEndpoint.name}`);

      cy.get('[data-testid="skeleton"]').as('load-layout').should('be.visible');
      cy.get('@load-layout').should('have.length', 2);

      cy.wait('@getPosts');

      cy.get('button[data-testid="topic-button"]').click();
      cy.get('[data-testid="drawer"]').should('be.visible');

      cy.get('[data-testid="drawer"]').contains(secondTopic.name).click();
      cy.url().should('include', `/${secondTopic.name}`);

      cy.get('[data-testid="skeleton"]').as('load-layout').should('be.visible');
      cy.get('@load-layout').should('have.length', 2);

      cy.wait('@getPosts');
    });
    it('navigates to different url', () => {
      cy.viewport('macbook-16');
      
      cy.visit('http://localhost:3000/');
      cy.url().should('include', `/${firstEndpoint.name}`);

      cy.contains('Benedict Polacek').click();
      cy.origin('https://benedictpolacek.github.io', () => {
        cy.url().should('eq', `https://benedictpolacek.github.io/BenedictPolacek-Personal-Portfolio-Website/`);
      });
    });
  });
  describe('on small screens', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr');
    })
    it('it should navigate from one topic to another', () => {
      cy.intercept('GET', '**').as('getPosts');

      cy.visit('http://localhost:3000/');
      cy.url().should('include', `/${firstEndpoint.name}`);

      cy.get('[data-testid="skeleton"]').as('load-layout').should('be.visible');
      cy.get('@load-layout').should('have.length', 1);

      cy.wait('@getPosts');

      cy.get('button[data-testid="topic-button"]').click();
      cy.get('[data-testid="drawer"]').should('be.visible')

      cy.get('[data-testid="drawer"]').contains(secondTopic.name).click()
      cy.url().should('include', `/${secondTopic.name}`);

      cy.get('[data-testid="skeleton"]').as('load-layout').should('be.visible');
      cy.get('@load-layout').should('have.length', 1);

      cy.wait('@getPosts');
    });
    it('navigates to different url', () => {
      cy.viewport('macbook-16');
      
      cy.visit('http://localhost:3000/');
      cy.url().should('include', `/${firstEndpoint.endpoint}`);

      cy.contains('Benedict Polacek').click();
      cy.origin('https://benedictpolacek.github.io', () => {
        cy.url().should('eq', `https://benedictpolacek.github.io/BenedictPolacek-Personal-Portfolio-Website/`);
      });
    });
  });
  
});
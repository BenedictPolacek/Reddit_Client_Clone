import { makeRedditEndpoint, PostData } from "../../src/lib/api";

const displaysElements = (items: PostData[]) => {
  cy.get('[data-testid="card"]').should('have.length', items.length);
};
describe('Searching', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
  });
  it('should search terms', () => {
    const searchTerm = 'trump';
    const searchUrl = 'https://www.reddit.com/' + makeRedditEndpoint({topic: 'search', after: null, searchTerm: searchTerm});
    cy.intercept('GET', searchUrl).as('getPosts');
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="topic-button"]').prev('[data-testid="search-bar"]').find('[data-testid="search-input"]')
        .as('search-input').should('have.length', 1);

    cy.get('@search-input').type('trump');
    cy.get('[data-testid="topic-button"]').prev('[data-testid="search-bar"]').find('[data-testid="search-button"]').click()

    cy.wait('@getPosts').then((interception) => {
      displaysElements(interception.response?.body.data.children)
    });
  });
  it('should make multiple searches one after another', () =>{
    const searchTerm1 = 'trump';
    const searchTerm2 = 'food';
    const searchUrl1 = 'https://www.reddit.com/' + makeRedditEndpoint({topic: 'search', after: null, searchTerm: searchTerm1});
    const searchUrl2 = 'https://www.reddit.com/' + makeRedditEndpoint({topic: 'search', after: null, searchTerm: searchTerm2});
    cy.intercept('GET', searchUrl1).as('getPosts1');
    cy.intercept('GET', searchUrl2).as('getPosts2');

    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="topic-button"]').prev('[data-testid="search-bar"]').find('[data-testid="search-input"]').as('search-input').should('have.length', 1);

    cy.get('@search-input').type(searchTerm1);
    cy.get('[data-testid="topic-button"]').prev('[data-testid="search-bar"]').find('[data-testid="search-button"]').as('search-button').click()
    
    cy.wait('@getPosts1').then((interception) => {
      displaysElements(interception.response?.body.data.children)
    });

    cy.get('@search-input').type(searchTerm2);
    cy.get('@search-button').click()

    cy.wait('@getPosts2').then((interception) => {
      displaysElements(interception.response?.body.data.children)
    });
  });
})
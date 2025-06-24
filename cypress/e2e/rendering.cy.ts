import { makeRedditEndpoint, PostData, RedditApiResponse } from "../../src/lib/api";
 
const mockRedditResponse: {kind: unknown, data: RedditApiResponse} = {
  kind: 'Listing',
  data: {
    children: [
      {
        data: {
          author: 'author1',
          title: 'title1',
          selftext: 'selftext1',
          created: 1720000000,
          url: 'https://example.com/image1.jpg',
          thumbnail: 'wrong sample',
          is_video: false,
        },
      },
      {
        data: {
          author: 'author2',
          title: 'title2',
          selftext: 'selftext2',
          created: 1720000100,
          url: 'wrong sample',
          thumbnail: 'https://example.com/thumb2.jpg',
          is_video: false,
        },
      },
      {
        data: {
          author: 'author3',
          title: 'title3',
          selftext: 'selftext3',
          created: 1720000200,
          url: 'https://example.com/video.jpg',
          thumbnail: 'wrong sample',
          is_video: true,
          media: {
            reddit_video: {
              fallback_url: 'https://example.com/video.mp4',
            },
          },
        },
      },
      {
        data: {
          author: 'author4',
          title: 'title4',
          selftext: 'selftext4',
          created: 1720000300,
          url: 'https://example.com/image4.jpg',
          thumbnail: 'https://example.com/thumb4.jpg',
          is_video: false,
        },
      },
      {
        data: {
          author: 'author5',
          title: 'title5',
          selftext: 'selftext5',
          created: 1720000400,
          url: 'https://example.com/image5.jpg',
          thumbnail: 'https://example.com/thumb5.jpg',
          is_video: false,
        },
      },
    ],
    after: null,
  },
};
const baseRedditUrl = 'https://www.reddit.com/';
describe('Rendering', () => {
  const displaysElements = (items: PostData[]) => {
    cy.get('[data-testid="card"]').should('have.length', items.length);
  }
  const baseUrl = baseRedditUrl + makeRedditEndpoint({topic: 'popular', after: mockRedditResponse.data.after});
  describe('on large screens', () => {
    beforeEach(() => {
      cy.viewport('macbook-16');
    });
    it('should display loading when fetching', () => {
      cy.intercept('GET', baseUrl).as('getPosts');

      cy.visit('http://localhost:3000/');

      cy.get('[data-testid="skeleton"]').as('load-layout').should('be.visible');
      cy.get('@load-layout').should('have.length', 2);

      cy.wait('@getPosts');
    });
    it('should display Posts with existing data', () => {
      cy.intercept('GET', baseUrl, {
        statusCode: 200,
        body: mockRedditResponse,
      }).as('getPosts');;
      cy.visit('http://localhost:3000/');
      cy.wait('@getPosts');

      displaysElements(mockRedditResponse.data.children)
    });
  });
  describe('on small screens', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr');
    });
    it('should display loading when fetching', () => {
      cy.intercept('GET', baseUrl).as('getPosts');

      cy.visit('http://localhost:3000/');

      cy.get('[data-testid="skeleton"]').as('load-layout').should('be.visible');
      cy.get('@load-layout').should('have.length', 1);

      cy.wait('@getPosts');
    });
    it('should display Posts with existing data', () => {
      cy.intercept('GET', baseUrl, {
        statusCode: 200,
        body: mockRedditResponse,
      }).as('getPosts');;
      cy.visit('http://localhost:3000/');
      cy.wait('@getPosts');

      displaysElements(mockRedditResponse.data.children)
    });
  });
  it('should display error when no posts returned', () => {
    it('should display Posts with existing data', () => {
      cy.intercept('GET', baseUrl, {
        statusCode: 200,
        body: {
          kind: "Listing",
          data: {
            after: null,
            children: [],
          }
        },
      }).as('getPosts');;
      cy.visit('http://localhost:3000/');
      cy.wait('@getPosts');

      cy.contains('Error').should('be.visible');
      cy.contains('No posts returned').should('be.visible');
    });
  });
  it('should display error on fetch failure', () => {
      cy.intercept('GET', baseUrl, {
        statusCode: 500,
      }).as('getPosts');;
      cy.visit('http://localhost:3000/');
      cy.wait('@getPosts');

      cy.contains('Error').should('be.visible');
      cy.contains('Failed to fetch data.').should('be.visible');
  });
  it('should render real data for selected topic', () => {
    const firstTopic = {
      name: 'Business',
      endpoint: 'business',
    }
    const secondTopic = {
      name: 'Esports',
      endpoint: 'esports',
    }
    cy.intercept('GET', baseRedditUrl + makeRedditEndpoint({topic: firstTopic.endpoint, after: null})).as('getPosts1');
    cy.intercept('GET', baseRedditUrl + makeRedditEndpoint({topic: secondTopic.endpoint, after: null})).as('getPosts2');
    cy.visit(`http://localhost:3000/${firstTopic.name}`);
    cy.wait('@getPosts1').then((interception) => {
      displaysElements(interception.response?.body.data.children);
    });
    cy.get('button[data-testid="topic-button"]').click();
    cy.get('[data-testid="drawer"]').should('be.visible')

    cy.get('[data-testid="drawer"]').contains('Games').click()
    cy.get('[data-testid="drawer"]').contains(secondTopic.name).click()
    cy.url().should('include', `/${secondTopic.name}`);

    cy.wait('@getPosts2').then((interception) => {
      displaysElements(interception.response?.body.data.children);
    });
  });
});
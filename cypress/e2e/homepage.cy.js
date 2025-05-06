/**
 * Test scenarios
 *
 * - Homepage spec
 *   - should display the main page title and filter section
 *   - should render each thread card with:
 *     - avatar and username
 *     - formatted date
 *     - title and body preview
 *     - category info
 *     - vote and comment counts
 *     - detail link
 *   - should filter threads based on selected category
 */

describe('Homepage spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.get('input[placeholder="Enter your email"]').type('siti.n@example.com');
    cy.get('input[placeholder="Enter your password"]').type('123456');
    cy.get('button')
      .contains(/^Sign In$/)
      .click();
  });

  it('should display page title and filter section', () => {
    cy.contains('Explore All Threads').should('be.visible');
    cy.contains('Filter by Category').should('be.visible');
    cy.get('button').contains('All Categories').should('exist');
  });

  it('should render each thread card with expected content', () => {
    cy.get('[data-cy="thread-card"]').each(($el) => {
      // User info (avatar + name)
      cy.wrap($el).find('img').should('have.attr', 'src');
      cy.wrap($el).find('p').first().should('not.be.empty');

      // Formatted date (e.g. Mon, May 29, 2023)
      // Tanggal diformat
      cy.wrap($el).contains(/[A-Z][a-z]{2}, [A-Z][a-z]{2} \d{1,2}, \d{4}/);

      // Title & body preview
      cy.wrap($el).find('h2').should('exist');
      cy.wrap($el).find('p').should('exist');

      // Pastikan ada elemen kategori
      cy.get('[data-cy="thread-card"]').each(($innerEl) => {
        cy.wrap($innerEl)
          .contains(/^\w+$/) // cocokkan string satu kata seperti "redux", "perkenalan"
          .should('exist');

        // Atau kalau kamu bisa bedakan lewat struktur atau elemen tertentu:
        cy.wrap($innerEl)
          .find('[data-cy="thread-category"]')
          .should('exist')
          .and('not.be.empty');
      });

      // Thread meta info (category, votes, comments)
      cy.wrap($el)
        .contains(/Votes$/)
        .should('exist');
      cy.wrap($el)
        .contains(/Comments$/)
        .should('exist');

      // Detail link
      cy.wrap($el).contains('View Details').should('have.attr', 'href');
    });
  });

  it('should filter threads based on selected category', () => {
    // Klik tombol filter dengan label "redux"
    cy.get('button')
      .contains(/^redux$/i)
      .click();

    // Pastikan thread yang ditampilkan setidaknya 1
    cy.get('[data-cy="thread-card"]').should('have.length.at.least', 1);

    // Opsional: Pastikan semua thread yang ditampilkan memang kategori redux
    cy.get('[data-cy="thread-card"]').each(($el) => {
      cy.wrap($el).contains(/redux/i).should('exist');
    });
  });
});

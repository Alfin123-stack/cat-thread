/**
 * Test scenarios
 *
 * - Login spec
 *   - should display sign-in page correctly
 *   - should show validation error when email is empty
 *   - should show validation error when password is empty
 *   - should display alert when username and password are wrong
 *   - should redirect to homepage on successful login
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/sign-in');
  });

  it('should display sign-in page correctly', () => {
    cy.get('input[placeholder="Enter your email"]').should('be.visible');
    cy.get('input[placeholder="Enter your password"]').should('be.visible');
    cy.get('button').contains(/^Sign In$/).should('be.visible');
  });

  it('should show validation error when email is empty', () => {
    cy.get('button').contains(/^Sign In$/).click();

    // karena kamu pakai `react-hook-form`, validasi akan muncul sebelum request
    cy.get('input[placeholder="Enter your email"]')
      .then(($input) => {
        expect($input[0].validationMessage).to.not.eq('');
      });
  });

  it('should show validation error when password is empty', () => {
    cy.get('input[placeholder="Enter your email"]').type('test@example.com');
    cy.get('button').contains(/^Sign In$/).click();

    cy.get('input[placeholder="Enter your password"]')
      .then(($input) => {
        expect($input[0].validationMessage).to.not.eq('');
      });
  });

  it('should display alert when username and password are wrong', () => {
    cy.get('input[placeholder="Enter your email"]').type('siti.n@example.com');
    cy.get('input[placeholder="Enter your password"]').type('wrongpassword');
    cy.get('button').contains(/^Sign In$/).click();

    // pastikan pesan error dari hook muncul
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should redirect to homepage on successful login', () => {
    cy.get('input[placeholder="Enter your email"]').type('siti.n@example.com');
    cy.get('input[placeholder="Enter your password"]').type('123456');
    cy.get('button').contains(/^Sign In$/).click();

    // verifikasi redirect ke homepage
    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains(/^Home$/).should('be.visible');
    cy.get('button').contains('Logout').should('be.visible');
  });
});

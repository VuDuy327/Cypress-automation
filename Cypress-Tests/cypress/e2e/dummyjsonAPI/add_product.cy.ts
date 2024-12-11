const env = Cypress.env();

describe("Add new product", () => {
  it("Should add a new product", () => {
    cy.fixture("newProduct").then((filecontent: any) => {
      filecontent.newProduct.forEach((product: any) => {
        cy.request({
          method: "POST",
          url: `${env.API_HOST}/add`,
          body: product,
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.include(product);
        });
      });
    });
  });
});

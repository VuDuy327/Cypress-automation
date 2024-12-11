const env = Cypress.env();

describe("Fetch Products API Tests", () => {
  it("Should fetch a list of products", () => {
    cy.request({
      method: "GET",
      url: `${env.API_HOST}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("products");
      expect(response.body.products).to.be.an("array");
    });
  });

  it("Should fetch a single product by ID", () => {
    cy.fixture(`products`).then((filecontent: any) => {
      filecontent.products.forEach((expectedProduct: any) => {
        cy.request({
          method: "GET",
          url: `${[expectedProduct.id]}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("id", expectedProduct.id);
          expect(response.body).to.have.property(
            "title",
            expectedProduct.title
          );
          expect(response.body).to.have.property(
            "description",
            expectedProduct.description
          );
          expect(response.body).to.have.property(
            "category",
            expectedProduct.category
          );
        });
      });
    });
  });
});

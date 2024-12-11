describe("Add new product", () => {
  it("Should add a new product", () => {
    cy.fixture("newProducts").then((filecontent: any) => {
      filecontent.newProduct.forEach((product: any) => {
        cy.request({
          method: "POST",
          url: `/add`,
          body: product,
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.include(product);
        });
      });
    });
  });
});

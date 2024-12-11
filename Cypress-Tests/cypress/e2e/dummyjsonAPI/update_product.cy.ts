describe("Should update an existing product", () => {
  it("Should update an existing product", () => {
    cy.fixture("updateProducts").then((filecontent: any) => {
      filecontent.updateProducts.forEach((product: any) => {
        cy.request({
          method: "PUT",
          url: `${[product.id]}`,
          body: product.update,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.include(product.update);
        });
      });
    });
  });
});

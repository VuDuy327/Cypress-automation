describe("Delete an existing product", () => {
  it("Should delete an existing product", () => {
    cy.fixture("deleteProducts").then((filecontent: any) => {
      filecontent.deleteProducts.forEach((product: any) => {
        cy.request({
          method: "DELETE",
          url: `${[product.id]}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("isDeleted", true);
        });
      });
    });
  });
});

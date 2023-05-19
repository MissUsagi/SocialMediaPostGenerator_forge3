describe("Chat Bot", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should open chat if the chat icon was clicked", () => {
    cy.get('[data-test="chat-widget-content"]').should("not.exist");
    cy.get('[data-test="chat-toggle-btn"]').click();
    cy.get('[data-test="chat-widget-content"]').should("be.visible");
  });

  it("should display the user message on input + enter and display the bpts response", () => {
    const message = "Hello Cypress";
    cy.intercept("POST", "/api/ai", {
      fixture: "chatbot-response.json", //mockup
    }).as("ai-request");
    //ACT
    cy.get('[data-test="chat-widget-content"]').should("not.exist");
    cy.get('[data-test="chat-toggle-btn"]').click();
    cy.get('[data-test="chat-widget-content"]').should("be.visible");
    cy.get('[data-test="chat-input"]')
      .should("be.visible")
      .type(`${message}{enter}`);

    //ASSERT
    cy.wait("@ai-request").its("response.statusCode").should("equal", 200);
    cy.get(
      '[data-test="chat-bubble"]:last-of-type [data-test="chat-bubble-text"]'
    )
      .invoke("text")
      .should("not.be.empty");
  });
});

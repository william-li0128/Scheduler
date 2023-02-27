describe("Appointments", () => {

  beforeEach(() => {
    // Reset database before testing
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // locate available interview spots
    cy.get("[alt=Add]")
      .first()
      .click();
    
    // type in must-have contents
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.contains("Save")
      .click();

    // show correct student and interviewer name
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({force: true});//pass { force: true } to the button to bypass the hover act

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");

    cy.get("[alt='Tori Malcolm']")
      .click();

    cy.contains("Save")
      .click();

    // render with updated data
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .first()
      .click({force: true});//pass { force: true } to the button to bypass the hover act

    cy.contains("Confirm")
      .click();

    //check that the "Deleting" indicator should exist
    cy.contains("Deleting").should("exist");
    //Then check that the "Deleting" indicator should not exist.
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});
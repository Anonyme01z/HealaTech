/// <reference types="cypress"/>
import jsonData from "../fixtures/jsonData.config.json"
import LandingPage from "../pageObjects/landingPage";

const landingPage = new LandingPage();


describe('HealaTechTests', {
    viewportHeight: 1300,
    viewportWidth: 960
});

beforeEach(() => {
    const Url = jsonData.HealaURl
    cy.visit(Url)
    cy.title().should('eq', 'Virtual Health Platform')
    cy.url().should('eq', Url)

});

it('Test', () => {
    cy.Login();
});

// it('insert otp', () => {
//     // Assuming the previous step is generating the random email and inbox
//     cy.generateEmailAddress().then(() => {
//         // Retrieve the inboxId stored by the generateEmailAddress command
//         cy.get('@inboxId').then((inboxId) => {
//             // Perform your actions like clicking 'View previous consultation'
//             landingPage.viewPreConsult().should('have.text', 'View previous consultation').click();

//             // Wait for the latest email to arrive in the generated inbox
//             cy.waitForLatestEmail(inboxId).then((email) => {
//                 const emailBody = email.body;

//                 // Parse the email body (if you need to extract content using DOMParser)
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(emailBody, 'text/html');

//                 // Extract the OTP from the email (adjust the selector as needed)
//                 const otp = doc.querySelector('tr:nth-of-type(2) > td > table td > p:nth-of-type(3)').textContent;

//                 // Trim and log the OTP code
//                 const otpCode = otp.trim();
//                 cy.log(otpCode);

//                 // You can now use otpCode in the next step, e.g., inputting it into a form
//                 landingPage.otpInput().type(otpCode);
//                 landingPage.getSigninBtn().click();
//             });
//         });
//     });
// });

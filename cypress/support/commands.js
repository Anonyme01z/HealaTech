import LandingPage from "../pageObjects/landingPage";
import 'cypress-iframe';
import axios from 'axios';

const landingPage = new LandingPage();

// Generate a random Mailinator email address and save it as an alias
Cypress.Commands.add("generateMailinatorEmail", () => {
    const names = ["John", "Jane", "Alice", "Bob", "Charlie", "Daisy", "Eve", "Frank", "Grace", "Hank"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomSuffix = Math.random().toString(36).substring(2, 5); // Add a suffix for uniqueness
    const email = `${randomName}${randomSuffix}@mailinator.com`;
  
    cy.wrap(email).as("email");
  });
  



  Cypress.Commands.add("getMailinatorOTP", (email) => {
    // Check if email is passed as an array and extract the first element
    if (Array.isArray(email)) {
      email = email[0]; // Extract the first element of the array
    }
  
    // Ensure email is a string
    if (typeof email !== 'string') {
      throw new Error('Provided email is not a string');
    }
  
    const inbox = email.split('@')[0]; // Extract the inbox name from the email (before '@')
  
    // Switch to the Mailinator domain using only the base URL
    cy.origin('https://www.mailinator.com', { args: email }, (email) => {
      // Log the email to verify it's being passed correctly
      cy.log('Email:', email);
  
      if (typeof email === 'string') {
        const inbox = email.split('@')[0]; // Extract the inbox name from the email (before '@')
        //const publicMailinatorUrl = `https://www.mailinator.com/v4/public/inboxes.jsp?to=${inbox}`;
         
        const publicMailinatorUrl = `https://www.mailinator.com/v4/public/inboxes.jsp?to=${'c7f8y5ec@mailinator.com'}`;
        // Navigate to the inbox page with the query parameters
        cy.visit(publicMailinatorUrl);
  
        // Wait for the inbox table row to be visible and click on the first message
        cy.get('[style="width:300px;max-width:300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size: 22px;"]', { timeout: 1000000 })
          .should('be.visible')
          .click();
  
        // Wait for the "JSON" tab and click it, immediately extract OTP from the <pre> tag
        cy.get('#pills-json-tab').click(); // Switch to JSON tab
  
        // Directly target the <pre> tag that holds the OTP information
        cy.get('pre').should('be.visible').then(($pre) => {
          const preText = $pre.text();  // Extract text content from the <pre> element
  
          // Log the content of the <pre> element for debugging
          cy.log('Pre content:', preText);
  
          // Use regex to extract OTP from the <strong> tag inside the <pre> element
          const otpRegex = /<strong>(\d{6})<\/strong>/;  // Regex to find the OTP inside <strong>
          const otpMatch = preText.match(otpRegex);  // Match the OTP
  
          if (otpMatch && otpMatch[1]) {
            const otp = otpMatch[1];  // Get OTP from the capturing group
            cy.log('OTP:', otp);  // Log OTP for debugging
            Cypress.env('OTP', otp);  // Optionally store OTP in Cypress environment variable
            return otp;  // Return the OTP
          } else {
            throw new Error('OTP not found in the <pre> element');
          }
        });
      } else {
        throw new Error('Invalid email format');
      }
    });
  });
  
  

  
  
//   cy.get('#html_msg_body')
  
  
//   Cypress.Commands.add("Fola", () => {
    
// cy.visit('https://www.mailinator.com/v4/public/inboxes.jsp?to=Alicegf2')
//   })

  
  
Cypress.Commands.add("Login", () => {
  
  // Generate a new email for this test session
  cy.generateMailinatorEmail().then(() => {
    cy.get("@email").then((email) => {
      
  //     // Verify consultation details on the landing page
  //     landingPage.ActCon().within(() => {
  //       cy.contains('RDHTOCO9');
  //       cy.contains('Steph');
  //       cy.contains(
  //         'With 24/7 access to online doctors, care is always available, anytime and anywhere. Select and see your favorite providers again and again, right from your smartphone, tablet or computer'
  //       );
  //     });

  //     // 
  //     cy.wait(5000);
  //     landingPage.viewPreConsult().should('have.text', 'View previous consultation')
  //     landingPage.getStartConsult().should('have.text', 'Start Consultation').click()
  //     cy.wait(3000)
  //     landingPage.getSymptomsInput().type('Headache')
  //     cy.get('.heela-symptoms-option').click()

  //     cy.get('.MuiSelect-select').first().click();  // Open the dropdown
  //     cy.get('[data-value="Mild"]').click()

  //     cy.get('.MuiSelect-select').eq(1).click(); 
  //     cy.get('[data-value="This week"]').click()

  //     landingPage.getAnythnelse().type('None')
  //     cy.contains('Next').click()


  //     //Time
  //     cy.get('.MuiSelect-select').eq(0).click(); 
  //     cy.get('.MuiList-root > .MuiButtonBase-root').click()

  //     //Communication Channel
  //     cy.get('.MuiSelect-select').click()
  //     //.eq(1).click(); 
  //     cy.get('[data-value="video"]').click()

  //     //Enter email 
  //     landingPage.getEmailAddressfld().type(email)
      

  //     cy.contains('Next').click()

  //     //Enter first name lastname phone numeber
  //     landingPage.getfirstName().type('Daniel')
  //     landingPage.getlstName().type('Arnold')
  //     landingPage.getPhnNum().type('81071448293')
  //     landingPage.getGender().click()
  //     cy.get('.MuiList-root > [tabindex="-1"]').click()

  //     landingPage.getSigninBtn().should('have.text', 'Book Appointment').click()
  //     cy.log('Paystack does not allow automation')


      cy.visit('https://doctor-direct-api-v2.vercel.app/access')




      landingPage.loginTxt().should('have.text', 'Log in');
      landingPage.loginSubTxt().should(
        'have.text',
        'When you log in via email, we’ll send a one-time authentication key to your email address. Enter the key to verify your login.'
      );
      landingPage.emailLabel().should('have.text', 'Email Address');

      // Enter the generated email address and click send
      landingPage.emailInput().type('c7f8y5ec@mailinator.com');
      cy.wait(5000)
      landingPage.getSigninBtn().click();
      cy.wait(5000)

      // Wait and retrieve OTP from Mailinator
      cy.getMailinatorOTP(email).then((otp) => {
        // Enter the retrieved OTP
        landingPage.otpInput().type(otp);
        landingPage.getSigninBtn().should('contain', 'Sign in').click();
      });
    });
  });
});

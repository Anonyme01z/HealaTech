class LandingPage {
    viewPreConsult(){
        return cy.get('.w-full > .text-primary')
    }
    ActCon(){
        return cy.get('.heala-doc-profile')
    }
    loginTxt(){
        return cy.get('.font-semibold')
    }
    loginSubTxt(){
        return cy.get('.w-full > p')
    }
    emailInput(){
        return cy.get('.MuiInputBase-input')
    }
    emailLabel(){
        return cy.get('.block')
    }
    getSigninBtn(){
        return cy.get('.MuiButtonBase-root')
    }
    getStartConsult(){
        return cy.get('.w-full > .MuiButtonBase-root')
    }
    getSymptomsInput(){
        return cy.get('.chips-input > .MuiFormControl-root > .MuiInputBase-root')
    }
    getDiscomfortLevel(){
        return cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select-helper')
    }
    getSymptomsStrtDate(){
        return cy.get(':nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select-helper')
    }
    getAnythnelse(){
        return cy.get('#outlined-basic')
    }
    getEmailAddressfld(){
        return cy.get('.mb-10 > :nth-child(2) > .MuiInputBase-root > .MuiInputBase-input')
    }
    getfirstName(){
        return cy.get(':nth-child(2) > :nth-child(2) > .MuiInputBase-root > .MuiInputBase-input')
    }
    getlstName(){
        return cy.get(':nth-child(3) > :nth-child(2) > .MuiInputBase-root > .MuiInputBase-input')
    }
    getPhnNum(){
        return cy.get('.form-control')
    }
    getGender(){
        return cy.get('.MuiFormControl-root > .MuiInputBase-root')
    }
}
export default LandingPage;

 describe("Home page", () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
//     it("header contains recipe heading with a message that there are no recipes", () => {
//       cy.get('.App-header').should('contain', 'My Recipes')
//       cy.get('p').should('contain', 'There are no recipes to list.')
//     })
  
//     it("contains an add recipe button that when clicked opens a form", () => {
//       const addRecipeButton = cy.get('#add-recipe');
//       addRecipeButton.click();
  
//       expect(cy.get('#recipe-form')).to.exist;
//     })
  
//     it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
//       const addRecipeButton = cy.get('#add-recipe');
//       addRecipeButton.click();
  
//       expect(cy.get('input[name="newRecipeName"]')).to.exist;
//       expect(cy.get('textarea[name="newRecipeInstructions"]')).to.exist;
//     })
  
//     it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
//       const addRecipeButton = cy.get('#add-recipe');
//       const instructions = '1. Two slices of bread. 2. Spread peanut butter and jelly on one side. 3. Fold over on itself + throw other piece of bread away. 4. Eat.';
//       const recipeName = 'PB&J';
  
//       addRecipeButton.click().then(() => {
//         cy.get('input[name="newRecipeName"]').type(recipeName, { delay: 50 });
//         cy.get('textarea[name="newRecipeInstructions"]').type(instructions, { delay: 50 });
//       })
//       cy.get('input[type=submit]').click();
//       cy.get('ul').then(() => {
//         cy.get('ul').contains(recipeName);
//       })
//     })
//     it("displays 2 recipe names under the 'My Recipes' heading after they have been added through the 'Add Recipe' form", () => {
//       const addRecipeButton = cy.get('#add-recipe');
//       //const instructions = '1. Two slices of bread. 2. Spread peanut butter and jelly on one side. 3. Fold over on itself + throw other piece of bread away. 4. Eat.';
//   //    const recipeName = 'PB&J';
  
//       const submittedRecipe1 = { name: "Soup", instructions: "Add water, boil, put a onion in it" }
//       const submittedRecipe2 = { name: "Cold Soup", instructions: "Add Milk, Add grains, put a onion in it" }
    
//       addRecipeButton.click().then(() => {
//         cy.get('input[name="newRecipeName"]').type(submittedRecipe1.name, { delay: 50 });
//         cy.get('textarea[name="newRecipeInstructions"]').type(submittedRecipe1.instructions, { delay: 200 });
//       })
//       cy.get('input[type=submit]').click();
//       addRecipeButton.click().then(() => {
//         cy.get('input[name="newRecipeName"]').type(submittedRecipe2.name, { delay: 50 });
//         cy.get('textarea[name="newRecipeInstructions"]').type(submittedRecipe2.instructions, { delay: 200 });
//       })
//       cy.get('input[type=submit]').click();
  
//       cy.get('ul').then(() => {
//         cy.get('ul').contains(submittedRecipe1.name);
//         cy.get('ul').contains(submittedRecipe2.name)
//       })
//     })
   })
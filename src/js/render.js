import { showModal } from "./modal.js";
import { getRecipes } from "./localStorage.js";

export function renderRecipes() {
  const recipes = getRecipes();

  const recipeList = document.querySelector(".recipe-list");

  // Delete all existing event-listeners
  recipeList.innerHTML = "";

  if (recipes.length === 0) {
    return (recipeList.innerHTML = `
        <div class="text-center text-lg text-gray-500 col-span-2">
          No recipes found. Add a new recipe to get started.
        </div>
      `);
  }
  console.log({ recipes });
  recipeList.innerHTML = recipes.map((recipe) => renderRecipe(recipe)).join("");

  const deleteButtons = document.querySelectorAll(".delete-recipe");
  const updateButtons = document.querySelectorAll(".edit-recipe");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      handleDeleteRecipe(event, btn.dataset.recipeName);
    });
  });

  updateButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const recipeName = event.currentTarget.dataset.recipeName;
      const recipe = recipes.find((recipe) => recipe.recipeName === recipeName);
      const recipeIndex = recipes.findIndex(
        (recipe) => recipe.recipeName === recipeName
      );
      showModal(recipe, recipeIndex);
    });
  });
}

export function renderRecipe(recipe) {
  return `
        <div>
          <div class="group relative lg:hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-xl border p-4 bg-card text-card-foreground shadow-lg overflow-hidden">
              
              <h2 class="text-center text-2xl mb-3 headline" contentEditable>${
                recipe.recipeName
              }</h2>
              <div class="-mx-4">
              <img class="group-hover:grayscale-0 grayscale transition-all duration-300 inline-block aspect-video object-cover object-center" src="${
                recipe.recipeImage
              }" alt="${recipe.recipeName}" />
              </div>
              <div class="flex items-center gap-2 pt-4">
                  <button title="Delete ${
                    recipe.recipeName
                  }" class="delete-recipe border rounded-lg p-2" data-recipe-name="${
    recipe.recipeName
  }">
                      <svg class="w-4 h-4 !text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                      </svg>
                  </button>
                  <button title="Edit ${
                    recipe.recipeName
                  }" class="edit-recipe border rounded-lg p-2" data-recipe-name="${
    recipe.recipeName
  }">
                      <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                      </svg>
                  </button>
              </div>
              <p class="mt-4 headline font-bold">Ingredients:</p>
              <ul class="list-disc list-inside mb-4">
                  ${recipe.recipeIngredients
                    .replace(/\n/g, " ")
                    .split(", ")
                    .map((ingredient) => `<li>${ingredient}</li>`)
                    .join("")}
              </ul>
              <p class="headline font-bold">Instructions:</p>
              <ol class="list-decimal list-inside">
                  ${recipe.recipeInstructions
                    .replace(/\n/g, " ")
                    .split(". ")
                    .map((instruction) => `<li>${instruction}</li>`)
                    .join("")}
              </ol>
          </div>
        </div>
      `;
}

function handleDeleteRecipe(e) {
  const recipeName = e.currentTarget.dataset.recipeName;
  const prompt = `Are you sure you want to delete the recipe for ${recipeName}?`;

  if (confirm(prompt)) {
    const recipes = getRecipes();
    const updatedRecipes = recipes.filter(
      (recipe) => recipe.recipeName !== recipeName
    );
    setRecipes(updatedRecipes);
    renderRecipes();
  }
}

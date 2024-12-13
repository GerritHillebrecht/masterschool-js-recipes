import { renderRecipes } from "./render.js";
import { getRecipes, setRecipes } from "./localStorage.js";

const recipeForm = document.forms.recipeForm;
const deleteHistoryBtn = document.querySelector(".delete-history");

recipeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { recipeName, recipeIngredients, recipeInstructions, recipeImage } =
    recipeForm;

  const recipe = {
    recipeName: recipeName.value,
    recipeIngredients: recipeIngredients.value,
    recipeInstructions: recipeInstructions.value,
    recipeImage: recipeImage.value,
  };

  const recipes = getRecipes();
  setRecipes([recipe, ...recipes]);
  renderRecipes();
  recipeForm.reset();
});

window.addEventListener("load", () => {
  renderRecipes();
});

deleteHistoryBtn.addEventListener("click", deleteHistory);

function deleteHistory() {
  if (confirm("Are you sure you want to delete all recipes?")) {
    localStorage.removeItem("recipe");
    renderRecipes();
  }
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

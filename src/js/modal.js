import { getRecipes, setRecipes } from "./localStorage.js";
import { renderRecipes } from "./render.js";

const modalBackdrop = document.getElementById("recipe-update-modal-backdrop");
const updateRecipeForm = document.forms.updateRecipeForm;
const updateBtn = document.querySelector(".update");
const cancelBtn = document.querySelector(".cancel");

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    updateRecipeForm.reset();
    hideModal();
  }
});

cancelBtn.addEventListener("click", () => {
  updateRecipeForm.reset();
  hideModal();
});

updateBtn.addEventListener("click", () => {
  const { recipeName, recipeIngredients, recipeInstructions, recipeImage } =
    updateRecipeForm;
  const recipes = getRecipes();
  const updateRecipeIndex = updateBtn.dataset.recipeIndex;

  const recipe = {
    recipeName: recipeName.value,
    recipeIngredients: recipeIngredients.value,
    recipeInstructions: recipeInstructions.value,
    recipeImage: recipeImage.value,
  };

  recipes[updateRecipeIndex] = recipe;

  setRecipes(recipes);
  renderRecipes();
  updateRecipeForm.reset();

  hideModal();
});

function hideModal() {
  modalBackdrop.classList.add("hidden");
}

export function showModal(recipe, recipeIndex) {
  setRecipeValues(recipe, recipeIndex);
  modalBackdrop.classList.remove("hidden");
}

function setRecipeValues(
  { recipeName, recipeIngredients, recipeInstructions, recipeImage },
  recipeIndex
) {
  updateRecipeForm.recipeName.value = recipeName;
  updateRecipeForm.recipeIngredients.value = recipeIngredients;
  updateRecipeForm.recipeInstructions.value = recipeInstructions;
  updateRecipeForm.recipeImage.value = recipeImage;

  updateBtn.dataset.recipeIndex = recipeIndex;
}

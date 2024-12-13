export function getRecipes() {
  return JSON.parse(localStorage.getItem("recipe")) || [];
}

export function setRecipes(recipes) {
  localStorage.setItem("recipe", JSON.stringify(recipes));
}

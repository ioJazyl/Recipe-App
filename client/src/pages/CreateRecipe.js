/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import useGetUserId from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function CreateRecipe() {
  const userID = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  }

  function handleIngredientChange(e, i) {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[i] = value;

    setRecipe({ ...recipe, ingredients: ingredients });
  }

  function addIngredient() {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="grid gap-4">
      <h2 className="text-center text-xl font-bold">Create Recipe</h2>
      <form className="m-10 grid" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="border bg-slate-50"
          onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="border bg-slate-50"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, i) => (
          <input
            key={i}
            type="text"
            name="ingredients"
            value={ingredient}
            className="border bg-slate-50"
            onChange={(e) => handleIngredientChange(e, i)}
          />
        ))}
        <button onClick={addIngredient} type="button">
          Add Ingredient
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          className="border bg-slate-50"
          onChange={handleChange}
        ></textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          className="border bg-slate-50"
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          className="border bg-slate-50"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateRecipe;

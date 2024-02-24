/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import useGetUserId from "../hooks/useGetUserId";

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserId();

  useEffect(() => {
    async function fetchSavedRecipe() {
      try {
        //in get requests we cant send a body we have to grab it through the params
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`,
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    }

    fetchSavedRecipe();
  }, [userID]);

  return (
    <div className="mx-5 my-2 grid justify-center gap-2 text-xl">
      <h1 className="text-center text-xl">Saved Recipes</h1>
      <ul className="grid justify-center gap-3">
        {savedRecipes.map((recipe) => (
          <li
            className="grid gap-3 rounded-md bg-slate-100 p-2"
            key={recipe._id}
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">{recipe.name}</h2>
            </div>
            <div>
              <p className="text-sm text-zinc-700">{recipe.instructions}</p>
            </div>
            <img
              className="w-full rounded-sm"
              src={recipe.imageUrl}
              alt={recipe.name}
            />
            <p className="text-end text-sm text-zinc-500">
              Cooking Time : {recipe.cookingTime} (minutes){" "}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedRecipes;

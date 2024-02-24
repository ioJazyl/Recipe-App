/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import useGetUserId from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserId();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    async function fetchSavedRecipe() {
      try {
        //in get requests we cant send a body we have to grab it through the params
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`,
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    }

    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipe();
  }, [userID, cookies]);

  async function saveRecipe(recipeID) {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } },
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  }

  function isRecipeSaved(id) {
    return savedRecipes.includes(id);
  }

  return (
    <div className="mx-5 grid justify-center gap-2 text-xl">
      <h1 className="text-center text-xl">Recipes</h1>
      <ul className="grid justify-center gap-3">
        {recipes.map((recipe) => (
          <li
            key={recipe._id}
            className="grid gap-3 rounded-md bg-slate-100 p-2"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">{recipe.name}</h2>
              <button
                className={
                  isRecipeSaved(recipe._id)
                    ? "rounded-sm bg-orange-200 px-2 py-0.5"
                    : "rounded-sm border px-2 py-0.5"
                }
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div>
              <h2>Instructions :</h2>
              <p className="text-slate-500">{recipe.instructions}</p>
            </div>
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full rounded-sm"
            />
            <p className="text-end text-zinc-600">
              Cooking Time : {recipe.cookingTime} (minutes){" "}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

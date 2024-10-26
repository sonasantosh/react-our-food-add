import {
  useEffect,
  useState,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import Search from "../../components/search";
import "./style.css";
import RecipeItem from "../../components/recipe-item";
import FavoriteItem from "../../components/favorite-item";
import { ThemeContext } from "../../App";

const dummyData = "dummyData";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavorites":
      console.log(action);
      return {
        ...state,
        filteredValue: action.value,
      };

    default:
      return state;
  }
};

const initialState = {
  filteredValue: "",
};

const Homepage = () => {
  const { theme } = useContext(ThemeContext);
  const [loadingState, setLoadingState] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

  const [filteredState, dispatch] = useReducer(reducer, initialState);

  const getDataFromSearchComponent = (getData) => {
    setLoadingState(true);
    async function getReceipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=ad31de41a5444f138fb9d59d25d69b42&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;
      if (results && results.length > 0) {
        setLoadingState(false);
        setRecipes(results);
        setApiCalledSuccess(true);
      }
    }

    getReceipes();
  };

  console.log(loadingState, recipes, "loadingState, recipes");

  const addToFavorites = useCallback((getCurrentRecipeItem)=>{
    let cpyFavorites = [...favorites];
    const index = cpyFavorites.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );
    console.log(index);
    if (index === -1) {
      cpyFavorites.push(getCurrentRecipeItem);
      setFavorites(cpyFavorites);
      localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
      window.scrollTo({top:'0',behavior:'smooth'})
    } else {
      alert("Item is already present in favorites");
    }
  },[favorites])

  const removeFromFavorites = (getCurrentId) => {
    let cpyFavorites = [...favorites];
    cpyFavorites = cpyFavorites.filter((item) => item.id !== getCurrentId);
    setFavorites(cpyFavorites);
    localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
  };

  useEffect(() => {
    const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorites")
    ) || [];
    setFavorites(extractFavoritesFromLocalStorageOnPageLoad);
  }, []);

  console.log(filteredState, "filteredState");

  const filteredFavoritesItems = favorites && favorites.length > 0 ? favorites.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filteredValue)
  ) : [];

  return (
    <div className="homepage">
      <div className="container">
        <Search
          getDataFromSearchComponent={getDataFromSearchComponent}
          dummyData={dummyData}
          apiCalledSuccess={apiCalledSuccess}
          setApiCalledSuccess={setApiCalledSuccess}
        />

        {/* Show the Favorite items */}
        <div className="favorites-wrapper">
          <h2
            style={theme ? { color: "#12343b" } : {}}
            className="favorites-title"
          >
            Favorites Item
          </h2>

          <div className="search-favorites">
            <input
              value={filteredState.filteredValue}
              onChange={(event) =>
                dispatch({ type: "filterFavorites", value: event.target.value })
              }
              name="searchfavorites"
              placeholder="Search favorites item"
            />
          </div>

          <div className="favorites">
            {
              !filteredFavoritesItems.length && <div className="no-items" style={theme ? { color: "#12343b" } : {}}>No Favorite Recipes are found</div>
            }
            {filteredFavoritesItems && filteredFavoritesItems.length > 0
              ? filteredFavoritesItems.map((item) => (
                  <FavoriteItem
                    key={item.id}
                    removeFromFavorites={() => removeFromFavorites(item.id)}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                  />
                ))
              : null}
          </div>
        </div>
        {/* Show the Favorite items */}

        {/* Show loading state */}
        {loadingState && (
          <div className="loading">Loading recipes ! Please wait.</div>
        )}
        {/* Show loading state */}

        {/* Map through all the recipes */}
        <h2
            style={theme ? { color: "#12343b" } : {}}
            className="favorites-title"
          >
            Recipes Item
          </h2>
        <div className="items">
            {
              useMemo(()=>(
                !loadingState && recipes && recipes.length > 0
                ? recipes.map((item)=>(
                  <RecipeItem
                  key={item.id}
                  addToFavorites={()=> addToFavorites(item)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  />
                ))
                : null
              ),[loadingState, recipes, addToFavorites])
            }
          {/* Map through all the recipes */}

          {
            !loadingState && !recipes.length && <div className="no-items" style={theme ? { color: "#12343b" } : {}}>No Recipes are found</div>
          }

        </div>
      </div>
    </div>
  );
};
export default Homepage;

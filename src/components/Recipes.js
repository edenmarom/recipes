import React, { useState, useEffect } from "react";
import "../css/Recipes.css";
import Recipe from "./Recipe";
import loading from "../images/generating.gif";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { initRecipes } from "../Slices/recipeSlice";
import { serverAddress } from "../utils/http-communication";
import Comment from './Comment';
import CommetForm from './CommetForm';



export default function Recipes() {
  const [comments, setComments] = useState({});
  const [recipeIdCommentForm, setRecipeIdCommentForm] = useState(null);
  const [recepiesDisplay, setRecepiesDisplay] = useState({
    displayCategories: false,
    displayRecipes: true,
    recipes: [],
    searchValue: "",
    timeFilter: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    loadData();
  }, []);


  const addNewComment = e => {
    const isCurrentIDClicked = parseInt(e.target.dataset.recipeid) === recipeIdCommentForm;
    setRecipeIdCommentForm(!isCurrentIDClicked ? parseInt(e.target.dataset.recipeid) : null);
  }

  const approveComment = (recipeId , comment) =>{
      const tempComments = comments[recipeId] ? comments[recipeId].slice() : [];
      tempComments.push(comment);
      setComments({
        ...comments,
        [recipeId]: tempComments
      })
  }

  useEffect(() => {
    const recipes = recepiesDisplay.recipes;
    const arrayOfIds = recipes.filter(item => item.id).map(item => item.id);
    const mapOfRecepies = {};
    const promises = arrayOfIds.map(item => fetch(serverAddress + `/recipe-comments/${item}`));
    Promise.all(promises)
      .then(array => {
        return Promise.all(array.map(item => item.json()));
      }).then(result => {
        result.forEach((item, idx) => {
          const recepieID = arrayOfIds[idx];
          mapOfRecepies[recepieID] = item?.data?.comments;
        });
        setComments(mapOfRecepies);
      }).catch(error => {
        console.log('error getting comments.')
      });

  }, [recepiesDisplay.recipes]);

  const loadData = async () => {
    try {
      let result = await fetch(serverAddress + "/recipes");
      result = await result.json();
      const formatedRecipes = formatRecipe(result.data);
      dispatch(initRecipes(formatedRecipes));
      setRecepiesDisplay((previousState) => {
        return { ...previousState, recipes: formatedRecipes };
      });


    } catch (err) {
      console.log("Could not fetch recipes.");
      console.log("Error: " + err);
    }
  };

  const formatRecipe = (recipes) => {
    let tempRecipes = recipes.map((recipe) => {
      let image = recipe.image;
      let name = recipe.title;
      let id = recipe.id;
      let time = recipe.maxReadyTime;
      let ingredients = recipe.includeIngredients
        .map((ingredient) => ingredient.name)
        .join(",");
      let description = recipe.description;
      let tempRecipe = { id, image, name, time, ingredients, description };
      return tempRecipe;
    });

    return tempRecipes;
  };

  const searchClicked = () => {
    let result = findInValues(
      recepiesDisplay.recipes,
      recepiesDisplay.searchValue
    );

    setRecepiesDisplay((previousState) => {
      return { ...previousState, recipes: result };
    });
  };

  const filterClicked = () => {
    const results = recepiesDisplay.recipes.filter((recipe) => {
      return +recipe.time < +recepiesDisplay.timeFilter;
    });

    setRecepiesDisplay((previousState) => {
      return { ...previousState, recipes: results };
    });
  };

  const clearSearch = () => {
    loadData();
    setRecepiesDisplay((previousState) => {
      return { ...previousState, searchValue: "", timeFilter: "" };
    });
  };

  const updateSearchValue = (ev) => {
    const searchedText = ev.target.value;
    setRecepiesDisplay((previousState) => {
      return { ...previousState, searchValue: searchedText };
    });
  };

  const updateFilterValue = (ev) => {
    const filter = ev.target.value;
    setRecepiesDisplay((previousState) => {
      return { ...previousState, timeFilter: filter };
    });
  };

  const findInValues = (arr, value) => {
    value = String(value).toLowerCase();
    return arr.filter((o) =>
      Object.entries(o).some((entry) =>
        String(entry[1]).toLowerCase().includes(value)
      )
    );
  };

  return (
    <>
      {recepiesDisplay.displayRecipes && recepiesDisplay.recipes ? (
        <div>
          <div className="container">
            <Form className="d-flex search-form">
              <Form.Control
                type="search"
                placeholder="prep time filter"
                className="search-input"
                onChange={updateFilterValue}
                value={recepiesDisplay.timeFilter}
              />
              <Button
                className="search-btn"
                variant="primary"
                onClick={filterClicked}
              >
                Filter
              </Button>
              <Form.Control
                type="search"
                placeholder="Search by name or ingredient "
                className="search-input"
                aria-label="Search"
                onChange={updateSearchValue}
                value={recepiesDisplay.searchValue}
              />
              <Button
                className="search-btn"
                variant="primary"
                onClick={searchClicked}
              >
                Search
              </Button>
              <Button
                className="search-btn"
                variant="primary"
                onClick={clearSearch}
              >
                Clear
              </Button>
            </Form>
            {recepiesDisplay.recipes.map((recipe, id) => {
              return (<div key={id}>
                <Recipe recipe={recipe} />


                <div className="col-md-9">
                  {comments && comments[recipe.id] && <Comment data={comments[recipe.id]} />}
                  <button onClick={addNewComment} data-recipeId={recipe.id}>Add Comment</button>
                  {recipeIdCommentForm === recipe.id && <CommetForm recipeId={recipe.id} approveComment={approveComment} />}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      ) : recepiesDisplay.displayRecipes ? (
        <img className="loading" src={loading} alt="loading.." />
      ) : null}
    </>
  );
}

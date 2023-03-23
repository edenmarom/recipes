import React from 'react'
import Chip from "@mui/material/Chip";
import "../css/Recipe.css";
import removeTags from './useRemoveTags';


export default function Recipe(props) {

  const ingredientList = props.recipe.ingredients
    .split(",")
    .map((ingredient, index) => (
      <Chip
        key={index}
        label={ingredient.trim()}
        color="primary"
        variant="outlined"
      />
    ));




  return (
    <div key={props.id} className="row">
      <div className="col-md-9">
        <h3>{props.recipe.name}</h3>
        <div>{removeTags(props.recipe.description)}</div>
        <div className="ingredient-List">{ingredientList}</div>
        <p>Prep Time: {props.recipe.time}</p>
      </div>
      <div className="col-md-3">
        <img src={props.recipe.image} alt={props.recipe.name} />
      </div>
    </div>
  );
}

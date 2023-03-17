import React, { useState, useEffect } from "react";
import '../css/Recipes.css';
import Recipe from './Recipe';
import loading from '../images/generating.gif';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { initUser, updateUserID } from "../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { initRecipes } from "../Slices/recipeSlice";

let mock = [
  {
    "cook-time": "",
    created: "2020-08-03T11:42:20.910175+00:00",
    "created-by": "RapidAPI",
    "customer-uuid": "8e1fc598-2d58-4ae9-b4cc-62364a0c6ce3",
    description:
      "Full of great veggies and high-fibre quinoa, this easy-to-make salad is nutritious, delicious and super-satisfying. Top with juicy pomegranate seeds for a great burst of flavour.",
    images: [
      "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1460_1_1436891540.jpg",
    ],
    ingredients: [
      "2 sweet potatoes (350g each)",
      "1 pinch of dried chilli flakes",
      "1 pinch of ground coriander",
      "1 small pinch of ground cinnamon",
      "olive oil",
      "200 g quinoa",
      "320 g broccoli",
      "35 g mixed nuts such as walnuts, almonds, Brazils",
      "1 pomegranate",
      "extra virgin olive oil",
      "1 splash of balsamic vinegar",
      "2 limes",
      "40 g mixed sprouts",
      "1 punnet of salad cress (use a mixture of varieties, if possible)",
      "1 bunch of fresh coriander (30g)",
      "1 fresh red chilli",
      "1 ripe avocado",
      "20 g feta cheese",
    ],
    instructions: [
      {
        steps: [
          "Preheat the oven to 200°C/400°F/gas 6.",
          "Scrub and chop the sweet potatoes into 2.5cm chunks. Place into a roasting tray with the chilli flakes, ground coriander and cinnamon, a drizzle of olive oil and a little sea salt and black pepper, then toss well.",
          "Spread out into an even layer and place in the hot oven for 15 to 20 minutes, or until golden and crisp.",
          "Meanwhile, cook the quinoa in boiling salted water according to the packet instructions.",
          "Slice the broccoli into small florets, then halve and finely slice the stalk. Place into a heatproof colander and rest it over the quinoa pan. Cover and steam for 3 minutes, or until just tender.",
          "Once cooked, drain and rinse the quinoa under cold running water, then leave to cool along with the broccoli. Remove the sweet potato from the oven and leave it to cool, too.",
          "Meanwhile, toast the nuts in a dry frying pan over a medium-high heat for 2 to 3 minutes, then transfer to a pestle and mortar and crush lightly.",
          "Halve the pomegranate and squeeze half the juice into a large bowl. Add 3 times as much extra virgin olive oil, the lime juice and balsamic vinegar. Whisk well and season to taste.",
          "Add the cooled broccoli and sprouts to the dressing, then snip in the cress. Roughly chop the coriander (stalks and all), finely slice the chilli and add to the bowl along with the quinoa and sweet potato.",
          "Toss well, spread out on a serving platter, then scoop out and dot over the avocado flesh.",
          "Bash the reserved pomegranate half with a wooden spoon so the seeds come tumbling out and scatter these over the platter along with the nuts, snip the cress on top, then serve with the feta crumbled over the top.",
        ],
      },
    ],
    name: "Superfood salad",
    "new-images": [
      {
        hUnits: "px",
        height: 534,
        length: 79231,
        mime: "image/jpeg",
        type: "jpg",
        url: "https://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1460_1_1436891540.jpg",
        wUnits: "px",
        width: 400,
      },
    ],
    "new-original-images": [
      {
        hUnits: "px",
        height: 534,
        length: 79231,
        mime: "image/jpeg",
        type: "jpg",
        url: "https://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1460_1_1436891540.jpg",
        wUnits: "px",
        width: 400,
      },
    ],
    "original-description":
      "Full of great veggies and high-fibre quinoa, this easy-to-make salad is nutritious, delicious and super-satisfying. Top with juicy pomegranate seeds for a great burst of flavour.",
    "original-ingredients": [
      "2 sweet potatoes (350g each)",
      "1 pinch of dried chilli flakes",
      "1 pinch of ground coriander",
      "1 small pinch of ground cinnamon",
      "olive oil",
      "200 g quinoa",
      "320 g broccoli",
      "35 g mixed nuts such as walnuts, almonds, Brazils",
      "1 pomegranate",
      "extra virgin olive oil",
      "1 splash of balsamic vinegar",
      "2 limes",
      "40 g mixed sprouts",
      "1 punnet of salad cress (use a mixture of varieties, if possible)",
      "1 bunch of fresh coriander (30g)",
      "1 fresh red chilli",
      "1 ripe avocado",
      "20 g feta cheese",
    ],
    "original-instructions": [
      {
        steps: [
          "Preheat the oven to 200°C/400°F/gas 6.",
          "Scrub and chop the sweet potatoes into 2.5cm chunks. Place into a roasting tray with the chilli flakes, ground coriander and cinnamon, a drizzle of olive oil and a little sea salt and black pepper, then toss well.",
          "Spread out into an even layer and place in the hot oven for 15 to 20 minutes, or until golden and crisp.",
          "Meanwhile, cook the quinoa in boiling salted water according to the packet instructions.",
          "Slice the broccoli into small florets, then halve and finely slice the stalk. Place into a heatproof colander and rest it over the quinoa pan. Cover and steam for 3 minutes, or until just tender.",
          "Once cooked, drain and rinse the quinoa under cold running water, then leave to cool along with the broccoli. Remove the sweet potato from the oven and leave it to cool, too.",
          "Meanwhile, toast the nuts in a dry frying pan over a medium-high heat for 2 to 3 minutes, then transfer to a pestle and mortar and crush lightly.",
          "Halve the pomegranate and squeeze half the juice into a large bowl. Add 3 times as much extra virgin olive oil, the lime juice and balsamic vinegar. Whisk well and season to taste.",
          "Add the cooled broccoli and sprouts to the dressing, then snip in the cress. Roughly chop the coriander (stalks and all), finely slice the chilli and add to the bowl along with the quinoa and sweet potato.",
          "Toss well, spread out on a serving platter, then scoop out and dot over the avocado flesh.",
          "Bash the reserved pomegranate half with a wooden spoon so the seeds come tumbling out and scatter these over the platter along with the nuts, snip the cress on top, then serve with the feta crumbled over the top.",
        ],
      },
    ],
    "original-name": "Superfood salad",
    "original-total-time": "PT40M",
    "original-yield": "6",
    "prep-time": "",
    "total-time": "PT40M",
    updated: "2020-08-03T11:42:20.910175+00:00",
    url: "https://www.jamieoliver.com/recipes/vegetables-recipes/superfood-salad/",
    uuid: "ac9333c3-2cef-4fb0-becf-430c8a201482",
    yield: "6",
  },
  {
    "cook-time": "",
    created: "2020-08-03T11:42:20.910175+00:00",
    "created-by": "RapidAPI",
    "customer-uuid": "8e1fc598-2d58-4ae9-b4cc-62364a0c6ce3",
    description:
      "Full of great veggies and high-fibre quinoa, this easy-to-make salad is nutritious, delicious and super-satisfying. Top with juicy pomegranate seeds for a great burst of flavour.",
    images: [
      "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1460_1_1436891540.jpg",
    ],
    ingredients: [
      "2 sweet potatoes (350g each)",
      "1 pinch of dried chilli flakes",
      "1 pinch of ground coriander",
      "1 small pinch of ground cinnamon",
      "olive oil",
      "200 g quinoa",
      "320 g broccoli",
      "35 g mixed nuts such as walnuts, almonds, Brazils",
      "1 pomegranate",
      "extra virgin olive oil",
      "1 splash of balsamic vinegar",
      "2 limes",
      "40 g mixed sprouts",
      "1 punnet of salad cress (use a mixture of varieties, if possible)",
      "1 bunch of fresh coriander (30g)",
      "1 fresh red chilli",
      "1 ripe avocado",
      "20 g feta cheese",
    ],
    instructions: [
      {
        steps: [
          "Preheat the oven to 200°C/400°F/gas 6.",
          "Scrub and chop the sweet potatoes into 2.5cm chunks. Place into a roasting tray with the chilli flakes, ground coriander and cinnamon, a drizzle of olive oil and a little sea salt and black pepper, then toss well.",
          "Spread out into an even layer and place in the hot oven for 15 to 20 minutes, or until golden and crisp.",
          "Meanwhile, cook the quinoa in boiling salted water according to the packet instructions.",
          "Slice the broccoli into small florets, then halve and finely slice the stalk. Place into a heatproof colander and rest it over the quinoa pan. Cover and steam for 3 minutes, or until just tender.",
          "Once cooked, drain and rinse the quinoa under cold running water, then leave to cool along with the broccoli. Remove the sweet potato from the oven and leave it to cool, too.",
          "Meanwhile, toast the nuts in a dry frying pan over a medium-high heat for 2 to 3 minutes, then transfer to a pestle and mortar and crush lightly.",
          "Halve the pomegranate and squeeze half the juice into a large bowl. Add 3 times as much extra virgin olive oil, the lime juice and balsamic vinegar. Whisk well and season to taste.",
          "Add the cooled broccoli and sprouts to the dressing, then snip in the cress. Roughly chop the coriander (stalks and all), finely slice the chilli and add to the bowl along with the quinoa and sweet potato.",
          "Toss well, spread out on a serving platter, then scoop out and dot over the avocado flesh.",
          "Bash the reserved pomegranate half with a wooden spoon so the seeds come tumbling out and scatter these over the platter along with the nuts, snip the cress on top, then serve with the feta crumbled over the top.",
        ],
      },
    ],
    name: "Greek salad",
    "new-images": [
      {
        hUnits: "px",
        height: 534,
        length: 79231,
        mime: "image/jpeg",
        type: "jpg",
        url: "https://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1460_1_1436891540.jpg",
        wUnits: "px",
        width: 400,
      },
    ],
    "new-original-images": [
      {
        hUnits: "px",
        height: 534,
        length: 79231,
        mime: "image/jpeg",
        type: "jpg",
        url: "https://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1460_1_1436891540.jpg",
        wUnits: "px",
        width: 400,
      },
    ],
    "original-description":
      "Full of great veggies and high-fibre quinoa, this easy-to-make salad is nutritious, delicious and super-satisfying. Top with juicy pomegranate seeds for a great burst of flavour.",
    "original-ingredients": [
      "2 sweet potatoes (350g each)",
      "1 pinch of dried chilli flakes",
      "1 pinch of ground coriander",
      "1 small pinch of ground cinnamon",
      "olive oil",
      "200 g quinoa",
      "320 g broccoli",
      "35 g mixed nuts such as walnuts, almonds, Brazils",
      "1 pomegranate",
      "extra virgin olive oil",
      "1 splash of balsamic vinegar",
      "2 limes",
      "40 g mixed sprouts",
      "1 punnet of salad cress (use a mixture of varieties, if possible)",
      "1 bunch of fresh coriander (30g)",
      "1 fresh red chilli",
      "1 ripe avocado",
      "20 g feta cheese",
    ],
    "original-instructions": [
      {
        steps: [
          "Preheat the oven to 200°C/400°F/gas 6.",
          "Scrub and chop the sweet potatoes into 2.5cm chunks. Place into a roasting tray with the chilli flakes, ground coriander and cinnamon, a drizzle of olive oil and a little sea salt and black pepper, then toss well.",
          "Spread out into an even layer and place in the hot oven for 15 to 20 minutes, or until golden and crisp.",
          "Meanwhile, cook the quinoa in boiling salted water according to the packet instructions.",
          "Slice the broccoli into small florets, then halve and finely slice the stalk. Place into a heatproof colander and rest it over the quinoa pan. Cover and steam for 3 minutes, or until just tender.",
          "Once cooked, drain and rinse the quinoa under cold running water, then leave to cool along with the broccoli. Remove the sweet potato from the oven and leave it to cool, too.",
          "Meanwhile, toast the nuts in a dry frying pan over a medium-high heat for 2 to 3 minutes, then transfer to a pestle and mortar and crush lightly.",
          "Halve the pomegranate and squeeze half the juice into a large bowl. Add 3 times as much extra virgin olive oil, the lime juice and balsamic vinegar. Whisk well and season to taste.",
          "Add the cooled broccoli and sprouts to the dressing, then snip in the cress. Roughly chop the coriander (stalks and all), finely slice the chilli and add to the bowl along with the quinoa and sweet potato.",
          "Toss well, spread out on a serving platter, then scoop out and dot over the avocado flesh.",
          "Bash the reserved pomegranate half with a wooden spoon so the seeds come tumbling out and scatter these over the platter along with the nuts, snip the cress on top, then serve with the feta crumbled over the top.",
        ],
      },
    ],
    "original-name": "Superfood salad",
    "original-total-time": "PT40M",
    "original-yield": "6",
    "prep-time": "",
    "total-time": "PT30M",
    updated: "2020-08-03T11:42:20.910175+00:00",
    url: "https://www.jamieoliver.com/recipes/vegetables-recipes/superfood-salad/",
    uuid: "ac9333c3-2cef-4fb0-becf-430c8a201482",
    yield: "6",
  },
];

export default function Recipes() {
  const [recepiesDisplay, setRecepiesDisplay] = useState({
    displayCategories: false,
    displayRecipes: true,
    recipes:"",
    searchValue: "",
    timeFilter: ""
  });
  const dispatch = useDispatch();
  const currentUserID = useSelector((state) => state.user.id);
  const currentUser = useSelector((state) => state.user);
  const recipesFromStore = useSelector((state) => state.recipes.recipeslist);

  useEffect(() => {
    if (recepiesDisplay.recipes === "") {
      loadData();
    }
  });

  const loadData = () => {
    // fetch(`https://api.edamam.com/search?q=${searchKey}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    // .then(response => response.json())
    // .then(data => {
    //     this.setState({
    //         recipes : this.formatRecipe(data.hits),
    //         displayCategories : false,
    //         displayRecipes : true
    //     })
    // }).then(data => console.log(this.state.recipes))

    //using mock data and not real api data:
    dispatch(initRecipes(formatRecipe(mock)));
    setRecepiesDisplay((previousState) => {
      return { ...previousState, recipes: recipesFromStore };
    });

    // TODO inituser example to be removed:
    dispatch(initUser("22222"));
    dispatch(updateUserID("33333"));
  };

  const formatRecipe = (recipes) => {
    let tempRecipes = recipes.map((recipe) => {
      let image = recipe.images[0];
      let name = recipe.name;
      let time = recipe["total-time"].substring(2);
      let ingredients = recipe.ingredients
        .map((ingredient) => ingredient)
        .join(",");
      let tempRecipe = { image, name, time, ingredients };
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
       return { ...previousState, recipes: result};
    });
  };

  const filterClicked = () => {
    //TODO! check how longer recipies that are more than 1 hour preptime looks like...
    const results = recepiesDisplay.recipes.filter((recipe) => {
      return +recipe.time.slice(0, -1) < +recepiesDisplay.timeFilter;
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
  }

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
              return <Recipe key={id} recipe={recipe} />;
            })}
          </div>
        </div>
      ) : recepiesDisplay.displayRecipes ? (
        <img className="loading" src={loading} alt="loading.." />
      ) : null}
      {/* {
          <Main message="You are not logged in. Please login to view" showbutton="true" />} */}
    </>
  );
}

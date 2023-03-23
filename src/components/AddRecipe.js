import React, { useState, useEffect } from "react";
import { TextField } from '@material-ui/core';
import '../css/AddRecipe.css';
import { useSelector } from "react-redux";

export default function AddRecipe(props) {

    const currentUserID = useSelector((state) => state.user.id);
    let firstRecipe = {
        title: "",
        image: "",
        imageType: "",
        includeIngredients: [
            {
                amount: "",
                name: "",
            }
        ],
        maxReadyTime: 0,
        description: "",
        firebaseUserId: currentUserID
    }

    let ingredient = {
        amount: "",
        name: "",
    }

    const [recipe, setRecipe] = useState(firstRecipe);
    const [ingredients , setIngredients] = useState(ingredient)

    function close(e) {
        if (e.target.className == "popup") {
            props.setAdd(false);
        }
    }

    async function addNew() {
        if(recipe.title == "" || recipe.image == ""  || recipe.imageType == "" ||recipe.includeIngredients.length == 0 || recipe.maxReadyTime == "" || recipe.description == "" ){
            alert("You need to fill all the fields")
            return;
        }

        let result = await isImgUrl(recipe.image);
        if (!result) {
            recipe.image = "https://spoonacular.com/recipeImages/667707-312x231.jpg"
        }
        function isImgUrl(url) {
            const img = new Image();
            img.src = url;
            return new Promise((resolve) => {
                img.onerror = () => resolve(false);
                img.onload = () => resolve(true);
            });
        }
        props.setRecipes([...props.myRecipes, recipe])
        // TODO : send rhe recipe to the server
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': 'token = 33'
            },
            body: JSON.stringify(recipe)
        }
        try {
            let result = await fetch(`https://colman-recipe-backend.onrender.com/recipes`, options);
            result = await result.json();
            console.log(result);
            props.setAdd(false)
        }
        catch (err) {
            console.log(err)
            console.log("no");
        }
    }

    const addIngredients = ()=>{
        let array = recipe.includeIngredients;
        array.push(ingredient)
        setRecipe(previousState => {
            return { ...previousState, includeIngredients: array }
        })
    }

    let addIngredientsUi = recipe.includeIngredients.map((item ,index)=>{
        return (
            <div className='divLabel' style={{padding:"10px" , marginTop:"0px"}} key={index}>
                <TextField id="outlined-basic" label="amount" variant="outlined"
                           type="number"
                           value={recipe.includeIngredients[index].amount}
                           onChange={(event) => {
                               event.persist();
                               let array = recipe.includeIngredients;
                               array.map((item1 , index1)=>{
                                   if(index1 == index) {
                                       array[index1] = {
                                           amount : event.target.value ,
                                           name : recipe.includeIngredients[index].name
                                       }

                                   }
                               })
                               console.log(array)
                               setRecipe(previousState => {
                                   return { ...previousState, includeIngredients : array }
                               })
                           }} />
                <TextField id="outlined-basic" label="name" variant="outlined"
                           style={{marginLeft:"10px"}}
                           value={recipe.includeIngredients[index].name}
                           onChange={(event) => {
                               event.persist();
                               let array = recipe.includeIngredients;
                               array.map((item1 , index1)=>{
                                   if(index1 == index) {
                                       array[index1] = {
                                           amount : recipe.includeIngredients[index].amount ,
                                           name : event.target.value
                                       }
                                   }
                               })
                               console.log(array , recipe.includeIngredients)
                               setRecipe(previousState => {
                                   return { ...previousState, includeIngredients : array }
                               })
                           }} />

            </div>
        )
    })

    return (
        <div className='popup' onClick={(e) => close(e)}>
            <div className='app1'>
                <div>
                    <h2 className='h2'>Add Recipe</h2>
                    <div className='links'>
                        <div className='divLabel'>
                            <TextField id="outlined-basic" label="title" variant="outlined"
                                       value={recipe.title}
                                       onChange={(event) => {
                                           event.persist();
                                           setRecipe(previousState => {
                                               return { ...previousState, title: event.target.value }
                                           })
                                       }} />

                        </div>
                        <div className='divLabel'>
                            <TextField id="outlined-basic" label="image" variant="outlined"
                                       value={recipe.image}
                                       onChange={(event) => {
                                           event.persist();
                                           setRecipe(previousState => {
                                               return { ...previousState, image: event.target.value }
                                           })
                                       }} />

                        </div>
                        <div className='divLabel'>
                            <TextField id="outlined-basic" label="imageType" variant="outlined"
                                       value={recipe.imageType}
                                       onChange={(event) => {
                                           event.persist();
                                           setRecipe(previousState => {
                                               return { ...previousState, imageType: event.target.value }
                                           })
                                       }} />
                        </div>
                        <div className='divLabel'>
                            <TextField id="outlined-basic" label="maxReadyTime" variant="outlined"
                                       value={recipe.maxReadyTime}
                                       onChange={(event) => {
                                           event.persist();
                                           setRecipe(previousState => {
                                               return { ...previousState, maxReadyTime: event.target.value }
                                           })
                                       }} />

                        </div>
                        <div className='divLabel'>
                            <TextField id="outlined-basic" label="description" variant="outlined"
                                       value={recipe.description}
                                       onChange={(event) => {
                                           event.persist();
                                           setRecipe(previousState => {
                                               return { ...previousState, description: event.target.value }
                                           })
                                       }} />
                        </div>
                        <h5 style={{padding:"10px" , marginTop:"10px"}}>:Ingredients</h5>
                        {addIngredientsUi}
                        <button className='buttonAddMore' onClick={() => {addIngredients() }}>Add more ingredients</button>
                    </div>
                    <div className='buttons'>
                        <button className='buttonSave' onClick={() => { addNew() }}>save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
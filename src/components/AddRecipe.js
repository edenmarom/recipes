import React, { useState, useEffect } from "react";
import { TextField } from '@material-ui/core';
import '../css/AddRecipe.css'

export default function AddRecipe(props) {

    let firstRecipe = {
        title: "",
        image: "",
        imageType: ""
    }

    const [recipe, setRecipe] = useState(firstRecipe);

    function close(e) {
        if (e.target.className == "popup") {
            props.setAdd(false);
        }
    }

    async function addNew() {
        console.log(recipe)
        if(recipe.title == "" || recipe.image == ""  || recipe.imageType == ""){
            alert("You need to fill all the fields")
            return;
        }

        let result = await isImgUrl(recipe.image);
        if(!result){
            // alert("the image is not image")
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


        props.setRecipes([...props.myRecipes , recipe])
        // TODO : send rhe recipe to the server
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' ,
                'Set-Cookie': 'token = 33'
            },
            body: JSON.stringify(recipe)
        }
        try {
            let result = await fetch(`http://localhost:3000/recipes`, options);
            result = await result.json();
            console.log(result);
            props.setAdd(false)
        }
        catch (err){
            console.log(err)
            console.log("no");
        }
    }

    return (
        <div className='popup' onClick={(e) => close(e)}>
            <div className='app1'>
                <div>
                    <h2 className='h2'>Add Recipe</h2>
                    {/* <form> */}
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
                    </div>
                    {/* </form> */}
                    <div className='buttons'>
                        <button className='buttonSave' onClick={() => {addNew()}}>save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
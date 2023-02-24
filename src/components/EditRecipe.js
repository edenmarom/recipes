import React, { useState, useEffect } from "react";
import { TextField } from '@material-ui/core';
import '../css/AddRecipe.css'

export default function EditRecipe(props) {

    const [recipe, setRecipe] = useState(props.recipe);

    function close(e) {
        if (e.target.className === "popup") {
            props.setEdit(false);
        }
    }

    async function addNew() {
        console.log(recipe)
        if(recipe.title === "" || recipe.image === ""  || recipe.imageType === ""){
            alert("You need to fill all the fields")
            return;
        }
        let array = props.myRecipes.filter((recipe1)=>recipe1._id !== recipe._id)
        props.setRecipes([...array , recipe]) //TODO CHENA - if recipe first switch between them
        // TODO : send rhe recipe to the server
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' ,
                'Set-Cookie': 'token = 33'
            },
            body: JSON.stringify(recipe)
        }
        try {
            let result = await fetch(`http://localhost:3000/recipes/${props.recipe._id}`, options);
            result = await result.json();
            console.log(result);
            props.setEdit(false)
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
                    <h2 className='h2'>Edit Recipe</h2>
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
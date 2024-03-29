import React, { useState, useEffect } from "react";
import '../css/MyPage.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddRecipe from "./AddRecipe";
import EditRecipe from "./EditRecipe";
import { useSelector } from "react-redux";
import PopUpOneRecipe from "./PopUpOneRecipe";


export default function MyPage() {
    const [ myRecipes , setRecipes] = useState([]);
    const [add , setAdd] = useState(false)
    const [edit , setEdit] = useState(false)
    const [description , setDescription] = useState(false);
    const [chosenRecipe , setChosenRecipe] = useState(null)
    const [selectedEdit, setSelectedEdit] = useState(null);
    const currentUserID = useSelector((state) => state.user.id);

    console.log(currentUserID)
    async function getRecapies(){
        try {
            let result = await fetch(`https://colman-recipe-backend.onrender.com/recipes/${currentUserID}`);
            result = await result.json();
            console.log(result);
            setRecipes(result.data);
        }
        catch (err){
            console.log(err)
            console.log("no");
        }
    }

    useEffect(()=>{
        getRecapies()
    },[])

    async function deleteRecipe(recipe1 , index1){
        let array = myRecipes.filter((recipe , index)=> index !== index1)
        console.log(array)
        setRecipes(array)

        // TODO : delete from server- fetch
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' ,
                'Set-Cookie': 'token = 33'
            }            }
        try {
            let result = await fetch(`https://colman-recipe-backend.onrender.com/recipes/${recipe1._id}`, options);
            result = await result.json();
            console.log(result);
        }
        catch (err){
            console.log(err)
            console.log("no");
        }
    }

    function addRecipe(){
        setAdd(true);
    }

    function editRecipe(recipe1 , index1){
        setEdit(true)
        setSelectedEdit(recipe1)
    }



    let recipesUi = myRecipes.map((recipe , index)=>{
        return (
            <Card key={index} className="oneRecipe" onClick={()=>{
                setChosenRecipe(recipe);
                setDescription(true)
            }}>
                <Card.Img variant="top" src={recipe.image} alt={recipe.title} className="recipeImage"/>
                <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>
                    </Card.Text>
                    <Button variant="primary" style={{marginRight:"20px"}} onClick={()=>deleteRecipe(recipe , index)}>Delete</Button>
                    <Button variant="primary" onClick={()=>editRecipe(recipe , index)}>Edit</Button>
                </Card.Body>
            </Card>
        )
    })
    return (
        <div>

            {myRecipes ? <Button variant="primary" onClick={()=>addRecipe()} style={{marginTop:"20px"}}>Add new recipe</Button> : <></>}
            <div className="allRecipes">
                {recipesUi}
            </div>
            {add  ? <AddRecipe setAdd={setAdd} setRecipes={setRecipes} myRecipes={myRecipes} /> : <></>}
            {edit ? <EditRecipe setEdit={setEdit} recipe={selectedEdit} setRecipes={setRecipes} myRecipes={myRecipes}/> : <></>}
            {description ? <PopUpOneRecipe setDescription={setDescription} chosenRecipe={chosenRecipe}/> : <></>}
        </div>
    );
}
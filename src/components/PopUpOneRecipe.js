import React, { useState, useEffect } from "react";
import { TextField } from '@material-ui/core';
import '../css/AddRecipe.css';
import { useSelector } from "react-redux";
import '../css/description.css'

export default function PopUpOneRecipe(props) {

    function close(e) {
        if (e.target.className == "popup") {
            props.setDescription(false);
        }
    }

    function removeTags(str) {
        if ((str===null) || (str===''))
            return ;
        else
            str = str.toString();
        return str.replace( /(<([^>]+)>)/ig, '');
    }

    let IngredientsUi = props.chosenRecipe.includeIngredients.map((item , index)=>{
        return (
            <div key={index} className="oneIngredient">
                <p>{item.name} {item.amount}</p>
            </div>
        )
    })

    return (
        <div className='popup' onClick={(e) => close(e)}>
            <div className='allInfo'>
                <div>
                    <h1>{props.chosenRecipe.title}</h1>
                    <img src={props.chosenRecipe.image}></img>
                    <h6>{removeTags(props.chosenRecipe.description)}</h6>
                    <h3>Ingredients:</h3>
                    <div className="Ingredients">
                        {IngredientsUi}
                    </div>
                </div>
            </div>
        </div>
    )
}
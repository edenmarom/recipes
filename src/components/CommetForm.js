
import React, { useState } from 'react';
// import './Comment.css';
import { serverAddress } from "../utils/http-communication";
const CommetForm = ({ recipeId, approveComment }) => {

    const [comment, setComment] = useState('')
    const onSubmit = async e => {
        e.preventDefault();
        try{

            const result = await fetch(`${serverAddress}/recipe-comments/${recipeId}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({x: comment})
            })
            const finalResult = await result.json();
            approveComment(recipeId,comment);
        }catch(e){

        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <textarea onChange={e => setComment(e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn btn-dark" onClick={onSubmit}>
                Submit
            </button>
        </form>
    )
}

export default CommetForm;
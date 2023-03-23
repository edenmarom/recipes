
import React from 'react';
// import './Comment.css';

const Comment = ({data}) => {

    if(!Array.isArray(data)){
        return null;
    }

    return(
        <div className="commentsWrapper">
        <h4>Comments</h4>
        <ul>
        {data.map((res,idx) => <li key={idx}>{res}</li>)} 
       </ul>    
       </div>
    )
}

export default Comment;
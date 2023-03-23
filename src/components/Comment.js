
import React from 'react';
// import './Comment.css';

const Comment = (data) => {
    return(
        <ol>
        {data.map((res,idx) => <li key={idx}>{res}</li>)} 
       </ol>    
    )
}

export default Comment;
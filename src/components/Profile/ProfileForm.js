import React, { useContext, useRef } from 'react';
import AuthContext from '../../store/AuthContext';
import { useNavigate } from "react-router-dom";
import '../../css/ProfileForm.css';

const ProfileForm = () => {

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = event => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBvsP0fDH9aLU8VIGZrrj4ik75P8UmqFqs',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: true
        }),
        headers: {
          'content-type': 'application/json'
        }
      }
    ).then(res => {
      console.log("password changed");
      navigate('/recipes');
    })
  }

  return (
   <div className='ProfileForm'>
    <form className='form' onSubmit={submitHandler}>
      <div className='control'>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className='action'>
        <button>Change Password</button>
      </div>
    </form>
    </div>  
  );
}

export default ProfileForm;

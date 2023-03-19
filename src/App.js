import React, { useState } from 'react';
import './css/App.css';
import Header from './components/Header';
import Main from './components/Main';
import Recipes from './components/Recipes';
import Admin from "./components/Admin";
import MyPage from './components/MyPage'
import UserProfile from './components/Profile/UserProfile'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthForm from './components/AuthForm';
import { AuthContextProvider } from './store/AuthContext'

var userDetailContext = React.createContext(null);   
const logOutUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBvsP0fDH9aLU8VIGZrrj4ik75P8UmqFqs';

function App() {

  var [useDeatials, setUserDetails] = useState({
    name: "",
    isLogin: false
  });

  const logout = () => {
    fetch(logOutUrl,
      {
        method: 'POST',
        body: JSON.stringify({
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        return res.json();
      }).then(res => {
        console.log('signout => ', res);
        setUserDetails({ name: '', isLogin: false })
      }).catch(err => {
        console.log('err.message =>', err.message);
      });
  }

  return (
    <div className="App">
        <AuthContextProvider>
      <BrowserRouter>
      <Header isLogin={useDeatials.isLogin} logout={logout} />

        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <Main
                  message="Welcome to our recipes website!"
                  showbutton="true"
                />
              }
            />
            <Route
              path="about"
              element={
                <Main message="Thank you for visiting us!" showbutton="false" />
              }
            />
            <Route path="recipes" element={<Recipes showbutton="false" />} />
            <Route path="admin" element={<Admin showbutton="false" />} />
            <Route path="myPage" element={<MyPage />} />
            {useDeatials.isLogin && <Route path="UserProfile" element={<UserProfile />} />}
            <Route exact path="login" element={<AuthForm showbutton="false" setUserDetails={setUserDetails} />}>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './css/App.css';
import Header from './components/Header';
import Main from './components/Main';
// import Callback from './components/Callback';
import Recipes from './components/Recipes';
import Admin from "./components/Admin";
import MyPage from './components/MyPage'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Auth from './Auth';
import AuthForm from './components/AuthForm';
import { auth } from "./Base";

// const auth = new Auth()
// var userDetailContext = React.createContext(null);   
const logOutUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBvsP0fDH9aLU8VIGZrrj4ik75P8UmqFqs';

;






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
      <Header isLogin={useDeatials.isLogin} logout={logout} />
      <Router>
        <Switch>
          <Route exact path="/">
            <Main message="Welcome to our recipes website!" showbutton="true" />
          </Route>
          <Route exact path="/about">
            <Main message="Thank you for visiting us!" showbutton="false" />
          </Route>
          {/* <Route exact path="/callback">
          <Callback />
      </Route> */}
            {/* <Route exact path="/notfound">
          <Main message="404 Page Not Found" showbutton="false"/>
      </Route> */}
            <Route exact path="/recipes">
              <Recipes showbutton="false" />
            </Route>
            <Route exact path="/admin">
              <Admin showbutton="false" />
            </Route>
          <Route exact path="/login">
            <AuthForm showbutton="false" setUserDetails={setUserDetails} />
          </Route>
            <Route exact path="/myPage">
              <MyPage/>
            </Route>
            {/* <Route exact path="/loginFailed">
          <Main message="Login Failed. Try Again" showbutton="true" />
      </Route> */}
          </Switch>
        </Router>
      </div>
  );
}

export default App;
//test
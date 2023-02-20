import React from 'react';
import './css/App.css';
import Header from './components/Header';
import Main from './components/Main';
// import Callback from './components/Callback';
import Recipes from './components/Recipes';
import Admin from "./components/Admin";
import MyPage from './components/MyPage'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Auth from './Auth';

// const auth = new Auth()


function App() {
  return (
      <div className="App">
        <Header />
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
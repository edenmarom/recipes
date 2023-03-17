import React from 'react';
import './css/App.css';
import Header from './components/Header';
import Main from './components/Main';
import Recipes from './components/Recipes';
import Admin from "./components/Admin";
import MyPage from './components/MyPage'
import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
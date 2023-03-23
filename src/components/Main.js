import React, {useEffect, useState} from 'react';
import '../css/Main.css'
import {serverAddress} from "../utils/http-communication";
import {initRecipes} from "../Slices/recipeSlice";

const Main = props => {
const [dateAsNumber,setDateAsNumber] = useState("");

    useEffect(() => {
        creationDate();
    }, []);
    const creationDate = async () => {
        try {
            let result = await fetch(serverAddress + "/site-info");
            result = await result.json();
            setDateAsNumber( result.data.date);
        } catch (err) {
            console.log("Could not fetch site Info.");
            console.log("Error: " + err);
        }
    }

    return (
      <div className="Main">
        <h1>{props.message}</h1>
        {props.showbutton === "false" ? (
          <div>
              <p>{new Date(dateAsNumber).toDateString()}</p>
            <p className='dev-header'>Development team:</p>
            <p>Diana Alankry</p>
            <p>Chen Atedgi</p>
            <p>Peleg Admi</p>
            <p>Eden Marom</p>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-lg btn-main"
            // onClick={() => {
            //   console.log("signin");
            // }}
          >
          </button>
        )}
      </div>
    );
}

export default Main;
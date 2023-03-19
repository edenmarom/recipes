import React from 'react';
import '../css/Main.css'

const Main = props => {
    return (
      <div className="Main">
        <h1>{props.message}</h1>
        {props.showbutton === "false" ? (
          <div>
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
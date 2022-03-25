import React from "react";
import "./App.css";
import FullControl from "./Player";

const AMOUNT_OF_PLAYERS = 8;
// 1.getUrls is an arrow function that returns the following object.
// 2.Declaring a constant variable called url, the variable gets an empty array.
// 3.Creates a for loop that will iterate 8 times.
// 4.Adds 8 sound examples urls to the array.
const getUrls = () => {
  const urls = [];
  for (let i = 0; i < AMOUNT_OF_PLAYERS; i++) {
    urls.push(
      `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${i + 1}.mp3`
    );
  }

  return urls;
};
// 1.Initial state object
// this state is later used to signal the players to stop / play togther.
const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// generate array of colors for the background of the players
const colors = [];
for (let i = 0; i < AMOUNT_OF_PLAYERS; i++) {
  colors.push(getRandomColor());
}
const App = () => {
  // holding handlers to control the handlers
  const startHandlers = [];
  const stopHandlers = [];

 // functions that childrens [players] will use to return the handlers to the parent
  const pushStartHandler = (handler) => {
    startHandlers.push(handler)
  }
  const pushStopHandler = (handler) => {
    stopHandlers.push(handler)
  }

  // functions to use the handlers on the parent side.
  const startAllPlayers = () => {
    startHandlers.map(startHandler => startHandler())
  }
  const stopAllPlayers = () => {
    stopHandlers.map(stopHandler => stopHandler())
  }

  return (
    <div>
      {
        // 1.Mapping over url list and returning FullControl component for each url.
        getUrls().map((url, index) => (
          <div style={{ borderColor: "white" }}>
            <FullControl
              key={index}
              backGroundColor={colors[index]} // take the colors
              id={index} // Providing unique ID for each player(FullControl)
              src={url} // Audio file endpoint
              pushStopHandler={pushStopHandler} // pass the stop handler to the children
              pushStartHandler={pushStartHandler} // pass the start handler to the children
            />
          </div>
        ))
      }
      <div>
        {/* Creating two buttons which on-click will play all songs or stop all songs. */}
        <button onClick={startAllPlayers}>Play All</button>
        <button onClick={stopAllPlayers}>Stop All</button>
      </div>
    </div>
  );
};

export default App;

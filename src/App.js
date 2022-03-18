import React, { useState } from "react";
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
const initialState = {
  isPlayAll: false,
  isStopAll: false,
};

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
  // 1.initialize the state
  const [allActions, setAllActions] = useState(initialState);

  //  set the signal to all start playing, also making sure stop all is false.
  const setPlayAll = () => {
    setAllActions({
      ...allActions,
      isPlayAll: true,
      isStopAll: false,
    });
  };

  //  set the signal to all stop playing, also making sure play all is false.
  const setStopAll = () => {
    setAllActions({
      ...allActions,
      isStopAll: true,
      isPlayAll: false,
    });
  };

  // this function is used by the players [childrens]
  // signaling they stopped playing
  const handleStopAll = () => {
    setAllActions({
      ...allActions,
      isStopAll: false,
    });
  };

  // this function is used by the players [childrens]
  // signaling they started playing
  const handlePlayAll = () => {
    setAllActions({
      ...allActions,
      isPlayAll: false, // changed from false to true and each ch is stopping when i click stop after stop all.
    });
  };

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
              isPlayAll={allActions.isPlayAll} // do we play all songs simultaneously.
              isStopAll={allActions.isStopAll} // do we stop all songs simultaneously.
              handleStopAll={handleStopAll} // callback to signal finish of action stop-all.
              handlePlayAll={handlePlayAll} // callback to signal finish of action play-all.
            />
          </div>
        ))
      }
      <div>
        {/* Creating two buttons which on-click will play all songs or stop all songs. */}
        <button onClick={setPlayAll}>Play All</button>
        <button onClick={setStopAll}>Stop All</button>
      </div>
    </div>
  );
};

export default App;

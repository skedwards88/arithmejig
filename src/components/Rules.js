import React from "react";
import packageJson from "../../package.json";

export default function Rules({setDisplay, setHasSeenWhatsNew}) {
  return (
    <div className="App rules">
      <h1 id="rulesHeader">Arithmejig: How to play</h1>
      <div id="rulesText">
        {/* todo remove this */}
        <p>
          <b>
            Thanks for play testing! Expect some bugs or missing features while
            this game is in development.
          </b>
        </p>
        <p>~~~</p>

        <p>
          <b>Drag</b> the pieces to the board to make equations vertically and
          horizontally. All equations must connect.
        </p>
        <p>
          <b>Drag a blank space</b> to move the whole puzzle.
        </p>
        <p>
          <b>Long press and drag</b> to move a group of touching pieces.
        </p>
        <p>
          Click <span id="hintIcon" className="rulesIcon"></span> to get a hint.
          A hint will move all pieces that are on the board to their correct
          location. If all pieces are already in the correct location, a new
          piece will be added to the board.
        </p>
        <p>
          Click <span id="settingsIcon" className="rulesIcon"></span> to change
          the number of pieces in the puzzle or the validity indication.
        </p>
        <p>
          Click <span id="calendarIconSolved" className="rulesIcon"></span> to
          play the daily challenge. The daily challenge is easiest on Monday and
          gets harder over the week.
        </p>
        <p>
          Click <span id="customIcon" className="rulesIcon"></span> to build
          your own arithmejig to share with friends.
        </p>
      </div>
      <button
        id="rulesClose"
        className="close"
        onClick={() => {
          setDisplay("game");
          setHasSeenWhatsNew(true);
        }}
      >
        {"Play"}
      </button>
      <small id="rulesVersion">version {packageJson.version}</small>
    </div>
  );
}

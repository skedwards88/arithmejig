import React from "react";
import Share from "./Share";

export default function GameOver({dispatchGameState, gameState, setDisplay}) {
  if (gameState.isDaily) {
    return (
      <div id="gameOver">
        <div>Daily challenge solved!</div>
        <button
          onClick={() => {
            setDisplay("dailyStats");
          }}
        >
          View daily stats
        </button>
      </div>
    );
  }
  return (
    <div id="gameOver">
      <div>Complete!</div>
      <button
        onClick={() => {
          dispatchGameState({
            ...gameState,
            action: "newGame",
          });
        }}
      >
        New game
      </button>
      <Share
        appName="Arithmejig"
        text={
          gameState.isCustom
            ? "Check out this custom arithmejig!"
            : "Check out this arithmejig!"
        }
        url="https://skedwards88.github.io/arithmejig"
        seed={
          gameState.isCustom
            ? `custom-${gameState.seed}`
            : `${gameState.seed}_${gameState.numLetters}`
        }
      ></Share>
    </div>
  );
}

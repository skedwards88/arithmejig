import React from "react";
import Game from "./Game";
import Heart from "./Heart";
import Rules from "./Rules";
import ExtendedMenu from "./ExtendedMenu";
import MoreGames from "./MoreGames";
import Stats from "./Stats";
import CustomCreation from "./CustomCreation";
import CustomShare from "./CustomShare";
import ControlBar from "./ControlBar";
import FallbackInstall from "./FallbackInstall";
import CustomError from "./CustomError";
import WhatsNew from "./WhatsNew";
import {
  handleAppInstalled,
  handleBeforeInstallPrompt,
} from "../common/handleInstall";
import Settings from "./Settings";
import {gameInit} from "../logic/gameInit";
import {customInit} from "../logic/customInit";
import getDailySeed from "../common/getDailySeed";
import {getSeedFromDate} from "../common/getSeedFromDate";
import {gameReducer} from "../logic/gameReducer";
import {parseUrlQuery} from "../logic/parseUrlQuery";
import {getInitialState} from "../common/getInitialState";
import {hasVisitedSince} from "../common/hasVisitedSince";
import {handleShare} from "../common/handleShare";
import {convertGridToRepresentativeString} from "../logic/convertGridToRepresentativeString";
import {getGridFromPieces} from "../logic/getGridFromPieces";
import {pickRandomIntBetween} from "@skedwards88/word_logic";
import {resizeGrid} from "../logic/resizeGrid";

export default function App() {
  // If a query string was passed,
  // parse it to get the data to regenerate the game described by the query string
  const [isCustom, seed, numLetters] = parseUrlQuery();

  // Determine when the player last visited the game
  // This is used to determine whether to show the rules instead of the game
  const hasVisitedEver = hasVisitedSince("arithmejigLastVisited", "20240429");

  const savedHasSeenWhatsNew = JSON.parse(
    localStorage.getItem("arithmejigHasSeenWhatsNew20240909"),
  );

  const [hasSeenWhatsNew, setHasSeenWhatsNew] = React.useState(
    savedHasSeenWhatsNew ?? false,
  );

  React.useEffect(() => {
    window.localStorage.setItem(
      "arithmejigHasSeenWhatsNew20240909",
      JSON.stringify(hasSeenWhatsNew),
    );
  }, [hasSeenWhatsNew]);

  const [lastVisited] = React.useState(getSeedFromDate());
  React.useEffect(() => {
    window.localStorage.setItem(
      "arithmejigLastVisited",
      JSON.stringify(lastVisited),
    );
  }, [lastVisited]);

  // Determine what view to show the user
  const savedDisplay = JSON.parse(localStorage.getItem("arithmejigDisplay"));
  const [display, setDisplay] = React.useState(
    getInitialState(savedDisplay, hasVisitedEver, hasSeenWhatsNew, isCustom),
  );

  // Determine the opacity for the validity indicator
  const savedValidityOpacity =
    JSON.parse(localStorage.getItem("arithmejigValidityOpacity")) ?? 0.15;
  const [validityOpacity, setValidityOpacity] =
    React.useState(savedValidityOpacity);

  // Set up states that will be used by the handleAppInstalled and handleBeforeInstallPrompt listeners
  const [installPromptEvent, setInstallPromptEvent] = React.useState();
  const [showInstallButton, setShowInstallButton] = React.useState(true);

  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {
      seed,
      numLetters,
      isCustom,
    },
    gameInit,
  );

  let [dailyGameState, dailyDispatchGameState] = React.useReducer(
    gameReducer,
    {isDaily: true},
    gameInit,
  );

  const [customState, dispatchCustomState] = React.useReducer(
    gameReducer,
    {},
    customInit,
  );

  const [, setLastVisible] = React.useState(Date.now());

  function handleCustomGeneration() {
    // If there is nothing to share, display a message with errors
    if (!customState.pieces.some((piece) => piece.boardTop >= 0)) {
      throw new Error("Add some letters to the board first!");
    }

    // Validate the grid
    // - The UI restricts the grid size, so don't need to validate that
    // - Make sure all letters are connected
    // - Make sure all horizontal and vertical words are known
    const grid = getGridFromPieces({
      pieces: customState.pieces,
      gridSize: customState.gridSize,
      solution: false,
    });

    const {gameIsSolved, reason} = {gameIsSolved: false, reason: "todo"}; // todo implement this logic

    // If the board is not valid, display a message with errors
    if (!gameIsSolved) {
      throw new Error(reason);
    }

    // Center and resize/pad the grid
    // Convert the grid to a representative string
    const resizedGrid = resizeGrid(grid);
    const cipherShift = pickRandomIntBetween(5, 9);
    const representativeString = convertGridToRepresentativeString(
      resizedGrid,
      cipherShift,
    );

    return representativeString;
  }

  function handleVisibilityChange() {
    // If the visibility of the app changes to become visible,
    // update the state to force the app to re-render.
    // This is to help the daily challenge refresh if the app has
    // been open in the background since an earlier challenge.
    if (!document.hidden) {
      setLastVisible(Date.now());
    }
  }

  React.useEffect(() => {
    // When the component is mounted, attach the visibility change event listener
    // (and remove the event listener when the component is unmounted).
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  React.useEffect(() => {
    // Need to store the function in a variable so that
    // the add and remove actions can reference the same function
    const listener = (event) =>
      handleBeforeInstallPrompt(
        event,
        setInstallPromptEvent,
        setShowInstallButton,
      );

    window.addEventListener("beforeinstallprompt", listener);
    return () => window.removeEventListener("beforeinstallprompt", listener);
  }, []);

  React.useEffect(() => {
    // Need to store the function in a variable so that
    // the add and remove actions can reference the same function
    const listener = () =>
      handleAppInstalled(setInstallPromptEvent, setShowInstallButton);

    window.addEventListener("appinstalled", listener);
    return () => window.removeEventListener("appinstalled", listener);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("arithmejigDisplay", JSON.stringify(display));
  }, [display]);

  React.useEffect(() => {
    window.localStorage.setItem(
      "arithmejigValidityOpacity",
      JSON.stringify(validityOpacity),
    );
  }, [validityOpacity]);

  React.useEffect(() => {
    window.localStorage.setItem("arithmejigState", JSON.stringify(gameState));
  }, [gameState]);

  React.useEffect(() => {
    window.localStorage.setItem(
      "dailyArithmejigState",
      JSON.stringify(dailyGameState),
    );
  }, [dailyGameState]);

  React.useEffect(() => {
    window.localStorage.setItem(
      "arithmejigCustomCreation",
      JSON.stringify(customState),
    );
  }, [customState]);

  switch (display) {
    case "rules":
      return (
        <Rules
          setDisplay={setDisplay}
          setHasSeenWhatsNew={setHasSeenWhatsNew}
        ></Rules>
      );

    case "heart":
      return <Heart setDisplay={setDisplay} repoName="arithmejig" />;

    case "settings":
      return (
        <Settings
          setDisplay={setDisplay}
          dispatchGameState={dispatchGameState}
          gameState={gameState}
          setValidityOpacity={setValidityOpacity}
          originalValidityOpacity={validityOpacity}
        />
      );

    case "daily":
      // force reinitialize the daily state if the day has changed
      if (dailyGameState.seed != getDailySeed()[0]) {
        dailyDispatchGameState({
          action: "newGame",
          isDaily: true,
          useSaved: false,
        });
      }
      return (
        <div className="App" id="arithmejig">
          <div id="exitDaily">
            <button
              id="hintIcon"
              className="controlButton"
              disabled={dailyGameState.gameIsSolved}
              onClick={() => dailyDispatchGameState({action: "getHint"})}
            ></button>
            <button id="exitDailyIcon" onClick={() => setDisplay("game")}>
              Exit daily challenge
            </button>
          </div>
          <Game
            dispatchGameState={dailyDispatchGameState}
            gameState={dailyGameState}
            validityOpacity={validityOpacity}
            setDisplay={setDisplay}
          ></Game>
        </div>
      );

    case "dailyStats":
      return (
        <Stats setDisplay={setDisplay} stats={dailyGameState.stats}></Stats>
      );

    case "custom":
      return (
        <div className="App" id="arithmejig">
          <div id="controls">
            <button
              id="playIcon"
              className="controlButton"
              onClick={() => {
                let representativeString;
                try {
                  representativeString = handleCustomGeneration();
                } catch (error) {
                  const invalidReason = error.message;
                  dispatchCustomState({
                    action: "updateInvalidReason",
                    invalidReason: invalidReason,
                  });
                  setDisplay("customError");
                  return;
                }

                dispatchGameState({
                  action: "playCustom",
                  representativeString,
                });
                setDisplay("game");
              }}
            ></button>

            <button
              id="shareIcon"
              className="controlButton"
              onClick={() => {
                let representativeString;
                try {
                  representativeString = handleCustomGeneration();
                } catch (error) {
                  const invalidReason = error.message;
                  dispatchCustomState({
                    action: "updateInvalidReason",
                    invalidReason: invalidReason,
                  });
                  setDisplay("customError");
                  return;
                }

                // Share (or show the link if sharing is not supported)
                if (navigator.canShare) {
                  handleShare({
                    appName: "Arithmejig",
                    text: "Try this custom arithmejig that I created!",
                    url: "https://skedwards88.github.io/arithmejig",
                    seed: `custom-${representativeString}`,
                  });
                } else {
                  dispatchCustomState({
                    action: "updateRepresentativeString",
                    representativeString,
                  });
                  setDisplay("customShare");
                }
              }}
            ></button>

            <button id="exitCustomButton" onClick={() => setDisplay("game")}>
              Exit creation
            </button>
          </div>
          <CustomCreation
            dispatchCustomState={dispatchCustomState}
            validityOpacity={validityOpacity}
            customState={customState}
            setDisplay={setDisplay}
          ></CustomCreation>
        </div>
      );

    case "customError":
      return (
        <CustomError
          invalidReason={customState.invalidReason}
          dispatchCustomState={dispatchCustomState}
          setDisplay={setDisplay}
        ></CustomError>
      );

    case "customShare":
      return (
        <CustomShare
          representativeString={customState.representativeString}
          dispatchCustomState={dispatchCustomState}
          setDisplay={setDisplay}
        ></CustomShare>
      );

    case "moreGames":
      return <MoreGames setDisplay={setDisplay}></MoreGames>;

    case "fallbackInstall":
      return <FallbackInstall setDisplay={setDisplay}></FallbackInstall>;

    case "extendedMenu":
      return (
        <ExtendedMenu
          setDisplay={setDisplay}
          setInstallPromptEvent={setInstallPromptEvent}
          showInstallButton={showInstallButton}
          installPromptEvent={installPromptEvent}
        ></ExtendedMenu>
      );

    case "whatsNew":
      return (
        <WhatsNew
          setDisplay={setDisplay}
          setHasSeenWhatsNew={setHasSeenWhatsNew}
        ></WhatsNew>
      );

    default:
      return (
        <div className="App" id="arithmejig">
          <ControlBar
            setDisplay={setDisplay}
            dispatchGameState={dispatchGameState}
            gameState={gameState}
            dailyIsSolved={dailyGameState.gameIsSolved}
          ></ControlBar>
          <Game
            dispatchGameState={dispatchGameState}
            gameState={gameState}
            validityOpacity={validityOpacity}
          ></Game>
        </div>
      );
  }
}

import React from "react";

export default function Heart({setDisplay, repoName}) {
  return (
    <div className="App info">
      <div className="infoText">
        {/* todo remove this */}
        <p><b>Thanks for play testing! Expect some bugs or missing features while this game is in development.</b></p>
        <p>~~~</p>

        {"Feedback? "}
        <a
          href={`https://github.com/skedwards88/${repoName}/issues/new/choose`}
        >
          Open an issue
        </a>
        {" on GitHub or email SECTgames@gmail.com."}
        {`\n\n`}
        {<hr></hr>}
        {`\n`}
        <a href="./privacy.html">Privacy policy</a>
      </div>
      <button className="close" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}

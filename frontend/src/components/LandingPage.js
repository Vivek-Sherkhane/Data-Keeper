import React from "react";

export default function LandingPage() {
  return (
    <div>
      <div
        className="landing-div"
        style={{
          backgroundImage: "url(/images/landing.jpeg)",
        }}
      ></div>
      <div className="text-container">
        <h1 id="main-tag">WELCOME TO DATA KEEPER</h1>
        <p id="tagline">An educational institute utility application.</p>
      </div>
    </div>
  );
}

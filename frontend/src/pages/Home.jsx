import React from "react";
import Chatbox from "../components/Chatbox";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 60px)", // subtract navbar height
        width: "100vw",
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5",
        paddingTop: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Sohrab Moradi — Engineer, Developer, and Problem Solver</h1>
      <Chatbox />
    </div>
  );
}

export default Home;

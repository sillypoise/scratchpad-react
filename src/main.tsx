import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/tailwind.css";

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//     <React.StrictMode>
//     </React.StrictMode>
// );
const root = document.getElementById("root") as HTMLElement;
ReactDOM.render(<App />, root);

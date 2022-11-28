import { useState } from "react";
import data from "./data/data-nested.json";

function App() {
    return (
        <main className="mlb-l">
            <article className="stack center">
                <h1 className="text-3">React Scratchpad</h1>
                <MemoryGame />
            </article>
        </main>
    );
}

function MemoryGame() {
    return <article></article>;
}

function Card() {}

export default App;

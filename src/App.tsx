import { useEffect, useState } from "react";
import { initialTravelPlan } from "./data/places";
import data from "./data/data-plain.json";
import { Mock } from "./Mock";
import { Fundamentals } from "./Fundamentals";

interface INode {
  id: string;
  fileName: string;
  children: Array<string>;
  root?: boolean;
}

function App() {
  return (
    <main className="mlb-l">
      <article className="stack center">
        <h1 className="text-3">React Scratchpad</h1>
        <Tree />
        {/* <Mock /> */}
        {/* <Fundamentals /> */}
      </article>
    </main>
  );
}

function Tree() {
  let root = data[0];
  let filesById = root.children;
  return (
    <ul>
      <Node id={root.id} data={data} />
    </ul>
  );
}

function Node({ id, data }: { id: string; data: Array<INode> }) {
  let file = data.find((node) => node.id === id);
  if (file) {
    if (file.children.length) {
      return <Directory file={file} />;
    } else {
      return <File file={file} />;
    }
  }
  return null;
}

function File({ file }: { file: INode }) {
  return (
    <li
      className={
        `mbs-xs` +
        " " +
        `${
          file.fileName.endsWith("server.tsx")
            ? "text-dark-tomato-9"
            : "text-dark-indigo-9"
        }`
      }
    >
      {file.fileName}
    </li>
  );
}

function Directory({ file }: { file: INode }) {
  let [isExpanded, setIsExpanded] = useState(true);
  return (
    <li className="mbs-xs">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="pli-2xs rounded-md bg-scheme-dark-neutral-surface-3"
      >
        {file.fileName}
      </button>
      {isExpanded ? (
        <ul>
          {file.children.map((child) => (
            <Node key={child} id={child} data={data} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default App;

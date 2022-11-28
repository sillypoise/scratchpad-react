import { useEffect, useState } from "react";
import { api } from "./data/api";
import data from "./data/data-nested.json";

interface INode {
    id: string;
    fileName: string;
    children: Array<INode> | null;
}

function App() {
    return (
        <main className="mlb-l">
            <article className="stack center">
                <h1 className="text-3">React Scratchpad</h1>
                <Tree />
            </article>
        </main>
    );
}

function Tree() {
    return (
        <ul>
            <Node node={data} />
        </ul>
    );
}

function Node({ node }: { node: INode }) {
    if (node.children === null) {
        return <File node={node} />;
    } else {
        return <Directory node={node} />;
    }
}

function File({ node }: { node: INode }) {
    return (
        <li
            className={
                `mbs-2xs` +
                " " +
                `${
                    node.fileName.endsWith("server.tsx")
                        ? `text-dark-tomato-9`
                        : `text-dark-indigo-9`
                }`
            }
        >
            {node.fileName}
        </li>
    );
}

function Directory({ node }: { node: INode }) {
    let [isExpanded, setIsExpanded] = useState(true);
    return (
        <li className="mbs-xs">
            <button
                className="bg-scheme-dark-neutral-surface-3 pli-2xs rounded-md"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {node.fileName}
            </button>
            {isExpanded ? (
                <ul>
                    {node.children?.map((child) => (
                        <Node key={child.id} node={child} />
                    ))}
                </ul>
            ) : null}
        </li>
    );
}

export default App;

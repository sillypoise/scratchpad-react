import { useEffect, useState } from "react";

function Fundamentals() {
    let [index, setIndex] = useState(0);
    let [users, setUsers] = useState([]);
    let [userName, setUserName] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users?id=3").then((res) =>
            res.json().then(setUsers)
        );
    }, []);

    return (
        <article>
            <h1 className="text-1">Fundamentals</h1>
            <p>{index}</p>
            <button onClick={() => setIndex(index + 1)}>+</button>
            <pre>{JSON.stringify(users, null, 4)}</pre>
        </article>
    );
}

export { Fundamentals };

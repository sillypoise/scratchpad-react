import { useEffect, useState, useSyncExternalStore } from "react";

type User = {
    name: {
        title: string;
        first: string;
        last: string;
    };
    picture: string;
};
type APIResponse = {
    results: Array<User>;
    info: {
        seed: string;
        results: number;
        page: number;
        version: string;
    };
};

function useIterator(url: string) {
    let [userList, setUserList] = useState(new Map());
    let [userIndex, setUserIndex] = useState(0);
    let [currentIndex, setCurrentIndex] = useState(0);
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState<null | Error>(null);
    let current = null;

    async function fetchNextUser() {
        setIsLoading(true);
        try {
            let res = await fetch(url);
            let json = await res.json();
            let [data] = json.results.map((p) => ({
                name: p.name,
                picture: p.picture.thumbnail,
            }));
            setUserList(new Map(userList).set(userIndex, data));
        } catch (err) {
            if (err instanceof Error) {
                setError(error);
            }
        } finally {
            setIsLoading(false);
            setUserIndex(userIndex + 1);
        }
    }

    useEffect(() => {
        fetchNextUser();
    }, []);

    function next() {
        if (currentIndex === userList.size - 1) {
            fetchNextUser();
        }
        setCurrentIndex(currentIndex + 1);
        return;
    }
    function previous() {
        setCurrentIndex(currentIndex - 1);
        return;
    }

    current = userList.get(currentIndex);

    return { userList, current, error, loading: isLoading, next, previous };
}

function Mock() {
    let { userList, current, loading, next, previous } = useIterator(
        "https://randomuser.me/api"
    );

    return (
        <article>
            <h2 className="text-1">Mock</h2>
            <button
                onClick={() => previous()}
                className="bg-scheme-dark-neutral-surface-2"
            >
                previous
            </button>
            <button
                onClick={() => next()}
                className="bg-scheme-dark-neutral-surface-2"
            >
                next
            </button>
            <div className="sidebar">
                <pre>{JSON.stringify(current, null, 4)}</pre>
                <pre>
                    {JSON.stringify(
                        Object.fromEntries(userList.entries()),
                        null,
                        4
                    )}
                </pre>
            </div>
        </article>
    );
}

export { Mock };

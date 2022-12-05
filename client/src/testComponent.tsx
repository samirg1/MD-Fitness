import { useEffect, useState } from "react";

function TestComp() {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div>
            <p>{!data ? "Loading..." : data}</p>
        </div>
    );
}

export default TestComp;

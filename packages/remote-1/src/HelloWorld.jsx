import { useState, version } from "react";

import { Link } from "react-router-dom";
import { useSharedContext } from "shared";
import uselessLib from "useless-lib";

export default function HelloWorld() {
    const sharedValue = useSharedContext();

    const [count, setCount] = useState(0);

    return (
        <>
            <div>Hello from remote-1 <strong>(react v{version} - useless-lib v{uselessLib.version})</strong> - <strong>{sharedValue}</strong></div>
            <button onClick={() => setCount(count + 1)}>{count}</button>
            <Link to="/about">Go to the about page</Link>
        </>
    )
}
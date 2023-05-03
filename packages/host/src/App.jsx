import { Link } from "react-router-dom";
import uselessLib from "useless-lib";
import { version } from "react";

export function App() {
    return (
        <>
            <div>Hello from host application <strong>(react v{version} - useless-lib v{uselessLib.version})</strong></div>
            <Link to="/another">Another page</Link>
        </>
    );
}
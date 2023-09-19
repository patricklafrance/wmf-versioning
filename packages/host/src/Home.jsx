import { Link } from "react-router-dom";
import uselessLib from "useless-lib";
import { version } from "react";

export function Home() {
    return (
        <>
            <div>Hello from host application <strong>(react v{version} - useless-lib v{uselessLib.version})</strong></div>
            <ul>
                <li><Link to="/another">Another page</Link></li>
                <li><Link to="/another-another">Another Another page</Link></li>
            </ul>
        </>
    );
}
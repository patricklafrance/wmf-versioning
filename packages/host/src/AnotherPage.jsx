import { Suspense, lazy } from "react";

import { Link } from "react-router-dom";
import { SharedContext } from "shared";

const Remote1HelloWorld = lazy(() => import("remote1/HelloWorld.jsx"));
const Remote2HelloWorld = lazy(() => import("remote2/HelloWorld.jsx"));

export function AnotherPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SharedContext.Provider value="Value shared from the host app through a React.context">
                <Remote1HelloWorld />
                <Remote2HelloWorld />
                <Link to="/">Back to root</Link>
            </SharedContext.Provider>
        </Suspense>
    );
}
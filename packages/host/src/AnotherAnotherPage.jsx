import { Suspense, lazy } from "react";

import { Link } from "react-router-dom";

const Remote1HelloWorld = lazy(() => import("remote1/HelloWorld.jsx"));
const Remote2HelloWorld = lazy(() => import("remote2/HelloWorld.jsx"));

export function AnotherAnotherPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Remote1HelloWorld />
            <Remote2HelloWorld />
            <Link to="/">Back to root</Link>
        </Suspense>
    );
}
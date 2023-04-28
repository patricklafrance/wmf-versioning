import { lazy } from "react";

const Remote1HelloWorld = lazy(() => import("remote1/HelloWorld.jsx"));
const Remote2HelloWorld = lazy(() => import("remote2/HelloWorld.jsx"));

export function App() {
    return (
        <>
            <div>Hello from host application</div>
            <Remote1HelloWorld />
            <Remote2HelloWorld />
        </>
    );
}
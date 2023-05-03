import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AboutPage } from "./AboutPage.jsx";
import { AnotherPage } from "./AnotherPage.jsx";
import { App } from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/another",
        element: <AnotherPage />
    },
    {
        path: "/about",
        element: <AboutPage />
    }
]);

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

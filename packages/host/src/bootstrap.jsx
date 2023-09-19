import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AboutPage } from "./AboutPage.jsx";
import { AnotherPage } from "./AnotherPage.jsx";
import { AnotherAnotherPage } from "./AnotherAnotherPage.jsx";
import { App } from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SharedContext } from "shared";

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
        path: "/another-another",
        element: <AnotherAnotherPage />
    },
    {
        path: "/about",
        element: <AboutPage />
    }
]);

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <SharedContext.Provider value="Value shared from the ROOT of the host app through a React.context">
            <RouterProvider router={router} />
        </SharedContext.Provider>
    </StrictMode>
);

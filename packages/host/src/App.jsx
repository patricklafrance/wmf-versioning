import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AboutPage } from "./AboutPage.jsx";
import { AnotherPage } from "./AnotherPage.jsx";
import { AnotherAnotherPage } from "./AnotherAnotherPage.jsx";
import { Home } from "./Home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
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

export function App() {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
        />
    );
}
import { App } from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SharedContext } from "shared";

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <SharedContext.Provider value="Value shared from the ROOT of the host app through a React.context">
            <App />
        </SharedContext.Provider>
    </StrictMode>
);

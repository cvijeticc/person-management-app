import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, initializeIcons } from "@fluentui/react";
import { defaultTheme } from "./common/theme";
import { App } from "./router";

initializeIcons();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ThemeProvider
      style={{ backgroundColor: "transparent", height: "100%" }}
      theme={defaultTheme}
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

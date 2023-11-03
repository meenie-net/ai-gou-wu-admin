import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { FocusStyleManager } from "@blueprintjs/core";
import store from "./stores/index.ts";
import { Provider } from "react-redux";
import "./i18n";

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);

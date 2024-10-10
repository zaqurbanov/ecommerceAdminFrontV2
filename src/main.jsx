import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter as Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </>
);

// Style imports.
import "normalize.css";
import "../css/main.css";

// React imports.
import React from "react";
import ReactDOM from "react-dom";

// App imports.
import BaseLayout from "./components/BaseLayout";

const baseComponent = ReactDOM.render(
    <BaseLayout />, document.body
);
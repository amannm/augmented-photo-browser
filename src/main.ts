import * as React from "react"
import * as ReactDOM from "react-dom"
import {SimpleImageBrowser} from "./imageBrowser"

ReactDOM.render(
    React.createElement("section", null, React.createElement(SimpleImageBrowser, null)),
    document.getElementById("root")
);
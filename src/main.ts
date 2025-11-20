import { App } from "./Engine";
import { MainScene } from "./Game";
import "./style.css"

window.addEventListener("DOMContentLoaded", () => {
    let app = new App(new MainScene());

    app.run();
});

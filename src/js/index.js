import App from "./components/App";

window.addEventListener("load", function() {
    const $root = document.getElementById("root");
    App($root);
});

console.info(`App is started at ${(new Date()).toLocaleString()}`);
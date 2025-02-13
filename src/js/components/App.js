import { Builder, replace, convert } from "fandom";
import { Directories } from "./Directories";
import { Picture } from "./Picture";
import { configureStore } from "store";
import { throttle, LocalStorage } from "utils";
import { Counter } from "./Counter";

const App = ($root) => {
    $root.classList.add("container");

    var initialState = {
        // TODO does it make sense to use initial state?
        // items: {}
    };
    const persistedState = LocalStorage.get("state");
    const store = configureStore({ ...initialState, ...persistedState });

    store.subscribe(throttle(() => {
        const { dirs, files, path } = store.getState();
        LocalStorage.set("state", { dirs, files, path });
    }, 1000));

    const components = {
        items: new Directories(store.dispatch),
        image: new Picture(store.dispatch),
        counter: new Counter(store.dispatch)
    };

    // const builder = new Builder();

    // for (const key in components) {
    //     builder.div({ id: key }).close();
    // }

    // const containers = builder.done();
    // const domElements = convert(containers);

    // replace($root, domElements);
    const builder = new Builder();

    builder.open("header").div({ id: "items" }).close(2);
    builder.open("main");

    builder.div({ id: "image" }).close();

    builder.close();
    builder.open("footer").div({ id: "counter" }).close(2);

    replace($root, convert(builder.done()));

    const storeSnapshot = store.getState();

    const onUpdate = (currentState) => {
        for (const key in components) {
            // const substate = currentState[key];
            const model = components[key].describe(currentState);
            const elements = convert(model);
            replace(document.getElementById(key), elements);
        }
    };

    store.subscribe(onUpdate);

    onUpdate(storeSnapshot);
};

export default App;
import { Builder, replace, convert } from "fandom";
import { Dates } from "./Dates";
import { Directories } from "./Directories";
import { Image } from "./Image";
import { fetchItemsAction } from "actions";
import { configureStore } from "store";
import { throttle, LocalStorage } from "utils";
import { Counter } from "./Counter";
import { Navigation } from "./Navigation";

const App = ($root) => {
    $root.classList.add("container");

    var initialState = {
        // TODO does it make sense to use initial state?
        // dirs: {}
    };
    const persistedState = LocalStorage.get("state");
    const store = configureStore({ ...initialState, ...persistedState });

    store.subscribe(throttle(() => {
        const { dirs, files, path } = store.getState();
        LocalStorage.set("state", { dirs, files, path });
    }, 1000));

    const components = {
        date: new Dates(store.dispatch),
        dirs: new Directories(store.dispatch),
        navigation: new Navigation(store.dispatch),
        image: new Image(store.dispatch),
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

    builder.open("header");
    builder.div({ id: "dirs" }).close();
    builder.just("hr");
    builder.div({ id: "date" }).close();
    builder.just("hr");
    builder.div({ id: "navigation" }).close();
    builder.close();
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

    store.dispatch(fetchItemsAction());
};

export default App;
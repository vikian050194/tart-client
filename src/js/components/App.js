import { Builder, replace, convert } from "fandom";
import { ItemsList } from "./ItemsList";
import { Picture } from "./Picture";
import { configureStore } from "store";
import { throttle, LocalStorage } from "utils";

const App = ($root) => {

    var initialState = {
        // TODO does it make sense to use initial state?
        // items: {}
    };
    const persistedState = LocalStorage.get("state");
    const store = configureStore({ ...initialState, ...persistedState });

    store.subscribe(throttle(() => {
        const { items } = store.getState();
        LocalStorage.set("state", { items });
    }, 1000));

    const components = {
        items: new ItemsList(store.dispatch),
        image: new Picture(store.dispatch)
    };

    const builder = new Builder();

    for (const key in components) {
        builder.div({ id: key }).close();
    }

    const containers = builder.done();
    const domElements = convert(containers);

    replace($root, domElements);

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
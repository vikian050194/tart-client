import { Builder } from "fandom";

import Button from "./Button";
import { fetchItemsAction, undoPathAndFetchItemsAction, updatePathAndFetchItemsAction } from "actions";

export class ItemsList {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
        dispatch(fetchItemsAction());
    }

    describe({ items }) {
        const onClick = (value) => this.dispatch(updatePathAndFetchItemsAction(value));
        const onBack = () => this.dispatch(undoPathAndFetchItemsAction());

        const props = { value: "< Back", onClick: onBack };
        const i = new Button();
        const im = i.describe(props);
        this.builder.push(im);

        for (let dir of items.dirs) {
            const props = { value: dir, onClick };
            const i = new Button();
            const im = i.describe(props);
            this.builder.push(im);
        }

        return this.builder.done();
    }
}

import { Builder } from "fandom";

import Button from "./Button";
import { fetchItemsAction, undoPathAndFetchItemsAction, updatePathAndFetchItemsAction } from "actions";

export class Directories {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
        dispatch(fetchItemsAction());
    }

    describe({ dirs }) {
        const onClick = (value) => this.dispatch(updatePathAndFetchItemsAction(value));
        const onBack = () => this.dispatch(undoPathAndFetchItemsAction());

        const props = { value: "< Back", onClick: onBack };
        const i = new Button();
        const im = i.describe(props);
        this.builder.push(im);

        for (let dir of dirs) {
            const props = { value: dir, onClick };
            const i = new Button();
            const im = i.describe(props);
            this.builder.push(im);
        }

        return this.builder.done();
    }
}

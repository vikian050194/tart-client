import { Builder } from "fandom";

import Button from "./Button";
import { updatePathAndFetchItemsAction } from "actions";

export class Dates {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
    }

    describe({ date }) {
        const onClick = (value) => this.dispatch(updatePathAndFetchItemsAction(value));

        for (let dir of date.possible.years) {
            const props = { value: dir, onClick };
            const i = new Button();
            const im = i.describe(props);
            this.builder.push(im);
        }

        return this.builder.done();
    }
}

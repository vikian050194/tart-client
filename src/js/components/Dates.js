import { Builder } from "fandom";

import Button from "./Button";
import { createAction, types } from "actions";

export class Dates {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
    }

    describe({ date }) {
        const onAdd = (value) => this.dispatch(createAction(types.YEAR_ADD)(value));
        const onRemove = (value) => this.dispatch(createAction(types.YEAR_REMOVE)(value));

        for (let year of date.possible.years) {
            const handler = date.selected.years.includes(year) ? onRemove : onAdd;
            const props = { value: year, onClick: handler };
            const i = new Button();
            const im = i.describe(props);
            this.builder.push(im);
        }

        return this.builder.done();
    }
}

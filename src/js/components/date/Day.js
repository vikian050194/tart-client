import { Builder } from "fandom";

import Button from "../Button";
import {
    createAction,
    types,
    fetchItemsAction
} from "actions";

export class Day {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
    }

    describe({ date }) {
        // TODO How to call two functions one by one?
        const onAddDay = (value) => this.dispatch(createAction(types.DAY_ADD)(value)) | this.dispatch(fetchItemsAction());
        const onRemoveDay = (value) => this.dispatch(createAction(types.DAY_REMOVE)(value)) | this.dispatch(fetchItemsAction());

        // this.builder.div().text("days").close();

        this.builder.div();
        for (let day of date.possible.days) {
            const handler = date.selected.days.includes(day) ? onRemoveDay : onAddDay;
            const props = { value: day, onClick: handler };
            const i = new Button();
            const im = i.describe(props);
            this.builder.push(im);
        }
        this.builder.close();

        return this.builder.done();
    }
}

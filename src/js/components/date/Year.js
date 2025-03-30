import { Builder } from "fandom";

import Button from "../Button";
import {
    createAction,
    types,
    fetchItemsAction
} from "actions";

export class Year {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
    }

    describe({ date }) {
        // TODO How to call two functions one by one?
        const onAddYear = (value) => this.dispatch(createAction(types.YEAR_ADD)(value)) | this.dispatch(fetchItemsAction());
        const onRemoveYear = (value) => this.dispatch(createAction(types.YEAR_REMOVE)(value)) | this.dispatch(fetchItemsAction());

        // this.builder.div().text("years").close();

        this.builder.div();
        for (let year of date.possible.years) {
            const handler = date.selected.years.includes(year) ? onRemoveYear : onAddYear;
            const props = { value: year, onClick: handler };
            const i = new Button();
            const im = i.describe(props);
            this.builder.push(im);
        }
        this.builder.close();

        return this.builder.done();
    }
}

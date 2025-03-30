import { Builder } from "fandom";

import Button from "../Button";
import {
    createAction,
    types,
    fetchItemsAction
} from "actions";

export class Month {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
    }

    describe({ date }) {
        // TODO How to call two functions one by one?
        const onAddMonth = (value) => this.dispatch(createAction(types.MONTH_ADD)(value)) | this.dispatch(fetchItemsAction());
        const onRemoveMonth = (value) => this.dispatch(createAction(types.MONTH_REMOVE)(value)) | this.dispatch(fetchItemsAction());

        // this.builder.div().text("months").close();

        this.builder.div();
        for (let month of date.possible.months) {
            const handler = date.selected.months.includes(month) ? onRemoveMonth : onAddMonth;
            const props = { value: month, onClick: handler };
            const i = new Button();
            const im = i.describe(props);
            this.builder.push(im);
        }
        this.builder.close();

        return this.builder.done();
    }
}

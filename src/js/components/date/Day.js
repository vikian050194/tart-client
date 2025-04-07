import { Builder } from "fandom";

import Toggle from "../Toggle";
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

        // this.builder.div();
        for (let day of date.possible.days) {
            const isSelected = date.selected.days.includes(day);
            const isEnabled = date.available.days.includes(day);
            const handler = isSelected ? onRemoveDay : onAddDay;
            const props = { value: day, onClick: handler, isSelected, isEnabled };
            const i = new Toggle();
            const im = i.describe(props);
            this.builder.push(im);
        }
        // this.builder.close();

        return this.builder.done();
    }
}

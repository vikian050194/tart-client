import { Builder } from "fandom";

import Button from "./Button";
import {
    createAction,
    types,
    fetchItemsAction
} from "actions";

export class Dates {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
    }

    describe({ date }) {
        // TODO How to call two functions one by one?
        const onAddYear = (value) => this.dispatch(createAction(types.YEAR_ADD)(value)) | this.dispatch(fetchItemsAction());
        const onRemoveYear = (value) => this.dispatch(createAction(types.YEAR_REMOVE)(value)) | this.dispatch(fetchItemsAction());

        this.builder.div().text("years").close();

        this.builder.div();
        for (let year of date.possible.years) {
            const handler = date.selected.years.includes(year) ? onRemoveYear : onAddYear;
            const props = { value: year, onClick: handler };
            const i = new Button();
            const im = i.describe(props);
            this.builder.push(im);
        }
        this.builder.close();

        const onAddMonth = (value) => this.dispatch(createAction(types.MONTH_ADD)(value)) | this.dispatch(fetchItemsAction());
        const onRemoveMonth = (value) => this.dispatch(createAction(types.MONTH_REMOVE)(value)) | this.dispatch(fetchItemsAction());

        this.builder.div().text("months").close();

        this.builder.div();
        for (let month of date.possible.months) {
            const handler = date.selected.months.includes(month) ? onRemoveMonth : onAddMonth;
            const props = { value: month, onClick: handler };
            const i = new Button();
            const im = i.describe(props);
            this.builder.push(im);
        }
        this.builder.close();

        const onAddDay = (value) => this.dispatch(createAction(types.DAY_ADD)(value)) | this.dispatch(fetchItemsAction());
        const onRemoveDay = (value) => this.dispatch(createAction(types.DAY_REMOVE)(value)) | this.dispatch(fetchItemsAction());

        this.builder.div().text("days").close();

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

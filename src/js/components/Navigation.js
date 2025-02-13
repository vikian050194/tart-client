import { Builder } from "fandom";

import Button from "./Button";
import { createAction, types } from "actions";

export class Navigation {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
    }

    describe() {
        const onFirst = () => this.dispatch(createAction(types.FIRST_IMAGE)());
        const onPrevious = () => this.dispatch(createAction(types.PREVIOUS_IMAGE)());
        const onNext = () => this.dispatch(createAction(types.NEXT_IMAGE)());
        const onLast = () => this.dispatch(createAction(types.LAST_IMAGE)());

        const first = new Button();
        const firstModel = first.describe({ value: "First", onClick: onFirst });
        this.builder.push(firstModel);

        const previous = new Button();
        const previousModel = previous.describe({ value: "Previous", onClick: onPrevious });
        this.builder.push(previousModel);

        const next = new Button();
        const nextModel = next.describe({ value: "Next", onClick: onNext });
        this.builder.push(nextModel);

        const last = new Button();
        const lastModel = last.describe({ value: "Last", onClick: onLast });
        this.builder.push(lastModel);

        return this.builder.done();
    }
}

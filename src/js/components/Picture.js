import { Builder } from "fandom";

import Button from "./Button";
import { createAction, types } from "actions";

export class Picture {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
    }

    describe({ files, path }) {
        const onPrevious = () => this.dispatch(createAction(types.PREVIOUS_IMAGE)());
        const onNext = () => this.dispatch(createAction(types.NEXT_IMAGE)());

        const previous = new Button();
        const previousModel = previous.describe({ value: "Previous", onClick: onPrevious });
        this.builder.push(previousModel);

        const next = new Button();
        const nextModel = next.describe({ value: "Next", onClick: onNext });
        this.builder.push(nextModel);

        if (files.items.length > 0) {
            const src = `api/data/${path.join("/")}/${files.items[files.index]}`;
            this.builder.just("img", { src });
        }

        return this.builder.done();
    }
}

import { Builder } from "fandom";

import Button from "./Button";

export class Copy {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
    }

    updateClipboard(newClip) {
        // TODO extract to separate file - effects?
        navigator.clipboard.writeText(newClip).then(
            () => {
                // clipboard successfully set
            },
            () => {
                // TODO dispatch error
                // clipboard write failed
            },
        );
    }

    describe({ files }) {
        const onCopy = () => {
            if (files.items.length > 0) {
                this.updateClipboard(files.items[files.index]);
            }
        };

        const copy = new Button();
        const copyModel = copy.describe({ value: "Copy name", onClick: onCopy });
        this.builder.push(copyModel);

        return this.builder.done();
    }
}

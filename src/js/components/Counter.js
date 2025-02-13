import { Builder } from "fandom";

export class Counter {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
    }

    describe({ items }) {
        const index = items.files.length > 0 ? items.index + 1 : 0;
        const length = items.files.length;
        this.builder.span().text(`${index}/${length}`).close();
        return this.builder.done();
    }
}

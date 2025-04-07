import { Builder } from "fandom";

export class Counter {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
    }

    describe({ files }) {
        const index = files.items.length > 0 ? files.index + 1 : 0;
        const length = files.items.length;
        const classList = ["counter"];
        this.builder.span({ classList }).text(`${index}/${length}`).close();
        return this.builder.done();
    }
}

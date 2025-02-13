import { Builder } from "fandom";

export class Image {
    constructor(dispatch) {
        this.builder = new Builder();
        this.dispatch = dispatch;
    }

    describe({ files, path }) {
        if (files.items.length > 0) {
            const src = `api/data/${path.join("/")}/${files.items[files.index]}`;
            this.builder.just("img", { src });
        }

        return this.builder.done();
    }
}

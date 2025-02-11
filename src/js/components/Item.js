import { Builder } from "fandom";

export class Item {
    constructor() {
        this.builder = new Builder();
    }

    describe = ({
        value,
        onClick
    }) => {
        const clickButton = () => onClick(value);

        this.builder.open("span");
        this.builder.button({}, { click: clickButton }).text(value).close();
        this.builder.close();
        return this.builder.done();
    };
}

export default Item;
import { Builder } from "fandom";

export class Button {
    constructor() {
        this.builder = new Builder();
    }

    describe = ({
        value,
        onClick
    }) => {
        const clickButton = () => onClick(value);
        const classList = ["toggle"];
        this.builder.button({ classList }, { click: clickButton }).text(value).close();
        return this.builder.done();
    };
}

export default Button;
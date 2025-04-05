import { Builder } from "fandom";

export class Button {
    constructor() {
        this.builder = new Builder();
    }

    describe = ({
        value,
        onClick,
        isSelected,
        isEnabled
    }) => {
        const clickButton = () => onClick(value);
        const classList = ["button"];
        if (isSelected) {
            classList.push("selected");
        }
        if (!isEnabled) {
            classList.push("disabled");
        }
        this.builder.button({ classList }, { click: clickButton }).text(value).close();
        return this.builder.done();
    };
}

export default Button;
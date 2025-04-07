import { Builder } from "fandom";

export class Toggle {
    constructor() {
        this.builder = new Builder();
    }

    describe = ({
        value,
        onClick,
        isSelected,
        isEnabled
    }) => {
        const clickToggle = () => onClick(value);
        const classList = ["toggle"];
        if (isSelected) {
            classList.push("selected");
        }
        if (!isEnabled) {
            classList.push("disabled");
        }
        this.builder.button({ classList }, { click: clickToggle }).text(value).close();
        return this.builder.done();
    };
}

export default Toggle;
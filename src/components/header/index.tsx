import { FunctionalComponent, h } from "preact";
import Logo from "../../assets/logo";
import * as style from "./style.css";

const Timer: FunctionalComponent = () => {
    return (
        <div class={style.container}>
            <Logo />
        </div>
    );
};

export default Timer;

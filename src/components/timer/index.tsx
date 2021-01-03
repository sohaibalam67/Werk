import { FunctionalComponent, h } from "preact";
import { secondsToClock } from "../../utils";

import * as style from "./style.css";

type TimerProps = {
    timerRotation: number;
    currentCountdownTime: number;
    isBreak: boolean;
};

const Timer: FunctionalComponent<{
    timerRotation: number;
    currentCountdownTime: number;
    isBreak: boolean;
}> = ({
    timerRotation = 0,
    currentCountdownTime = 0,
    isBreak = false
}: TimerProps) => {
    return (
        <div class={style.timerContainer}>
            <svg width="360" height="360">
                <circle
                    style={{
                        transform: `rotate(${timerRotation}deg)`,
                        transformOrigin: "center center",
                        transition: "400ms"
                    }}
                    cx="180"
                    cy="180"
                    r="130"
                    stroke="#565656"
                    // eslint-disable-next-line react/no-unknown-property
                    stroke-width="3"
                    // eslint-disable-next-line react/no-unknown-property
                    stroke-dasharray="0 13.6135"
                    // eslint-disable-next-line react/no-unknown-property
                    stroke-linecap="round"
                    fill="transparent"
                />
                <line
                    x1="180"
                    y1="60"
                    x2="180"
                    y2="180"
                    stroke={isBreak ? "#6ab04c" : "#EB3F6B"}
                    // eslint-disable-next-line react/no-unknown-property
                    stroke-width="3"
                    // eslint-disable-next-line react/no-unknown-property
                    stroke-linecap="round"
                />
            </svg>
            <span id="time" class={style.time}>
                {secondsToClock(currentCountdownTime)}
            </span>
        </div>
    );
};

export default Timer;

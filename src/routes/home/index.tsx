import { FunctionalComponent, h } from "preact";
import { useReducer } from "preact/hooks";
import { secondsToClock } from "../../utils";
import useInterval from "../../hooks/useInterval";

import * as style from "./style.css";

type ActionType = {
    type: "start" | "pause" | "reset" | "decrement_second";
};

type State = {
    sessionDuration: number;
    breakDuration: number;
    currentCountdownTime: number;
    isPaused: boolean;
    isBreak: boolean;
    timerRotation: number;
};
// Circle dots calculation
// C = 2πr
// r = 130, therefore C = 816.81
// Now we need 60 dots on C, so spacing between each dot is C/60 => 13.6135
const Home: FunctionalComponent = () => {
    const INITIAL_STATE = {
        sessionDuration: 25 * 60,
        breakDuration: 5 * 60,
        currentCountdownTime: 1 * 60,
        isPaused: false,
        isBreak: false,
        timerRotation: 0
    };

    const reducer = (state: State, action: ActionType): State => {
        switch (action.type) {
            case "start":
                return {
                    ...state,
                    isPaused: false
                };
            case "pause":
                return {
                    ...state,
                    isPaused: true
                };
            case "decrement_second":
                return {
                    ...state,
                    currentCountdownTime: Math.max(
                        0,
                        state.currentCountdownTime - 1
                    ),
                    timerRotation: (state.timerRotation + 6) % 360,
                    isPaused: state.currentCountdownTime - 1 === 0
                };
            case "reset":
                return {
                    ...state,
                    currentCountdownTime: state.isBreak
                        ? state.breakDuration
                        : state.sessionDuration
                };
            default:
                return { ...state };
        }
    };

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useInterval(
        (): void => {
            dispatch({ type: "decrement_second" });
        },
        state.isPaused ? null : 1000
    );

    return (
        <div class={style.home}>
            <div class={style.container}>
                <div class={style.timerContainer}>
                    <svg width="360" height="360">
                        <circle
                            style={{
                                transform: `rotate(${state.timerRotation}deg)`,
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
                            stroke="red"
                            // eslint-disable-next-line react/no-unknown-property
                            stroke-width="3"
                            // eslint-disable-next-line react/no-unknown-property
                            stroke-linecap="round"
                        />
                    </svg>
                    <span class={style.time}>
                        {secondsToClock(state.currentCountdownTime)}
                    </span>
                </div>
                <div class={style.statusLabel}>Werk!</div>
                <button class={style.startStopButton}>START</button>
            </div>
        </div>
    );
};

export default Home;

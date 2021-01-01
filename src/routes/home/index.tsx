import { FunctionalComponent, h } from "preact";
import { useReducer } from "preact/hooks";
import Timer from "../../components/timer";
import Header from "../../components/header";
import useInterval from "../../hooks/useInterval";

import * as style from "./style.css";

const MachineStates = {
    WORK: "WORK",
    BREAK: "BREAK"
};

const TimerStates = {
    IDLE: "IDLE",
    TICK: "TICK"
};

type State = {
    sessionDuration: number;
    breakDuration: number;
    currentCountdownTime: number;
    currentMachineState: string;
    currentTimerState: string;
    timerRotation: number;
    totalWorkSessions: number;
};

type ActionType = {
    type:
        | "START"
        | "PAUSE"
        | "RESET"
        | "DECREMENT_SECOND"
        | "SWITCH_TO_WORK"
        | "SWITCH_TO_BREAK";
};
// Circle dots calculation
// C = 2πr
// r = 130, therefore C = 816.81
// Now we need 60 dots on C, so spacing between each dot is C/60 => 13.6135
const Home: FunctionalComponent = () => {
    const INITIAL_STATE = {
        sessionDuration: 25 * 60,
        breakDuration: 5 * 60,
        currentCountdownTime: 25 * 60,
        currentMachineState: MachineStates.WORK,
        currentTimerState: TimerStates.IDLE,
        timerRotation: 0,
        totalWorkSessions: 0
    };

    const reducer = (state: State, action: ActionType): State => {
        let currentCountdownTime;

        switch (action.type) {
            case "SWITCH_TO_WORK":
                return {
                    ...state,
                    currentCountdownTime: state.sessionDuration,
                    currentTimerState: TimerStates.IDLE,
                    currentMachineState: MachineStates.WORK
                };

            case "SWITCH_TO_BREAK":
                return {
                    ...state,
                    currentCountdownTime: state.breakDuration,
                    currentTimerState: TimerStates.IDLE,
                    currentMachineState: MachineStates.BREAK,
                    totalWorkSessions: state.totalWorkSessions + 1
                };

            case "START":
                return {
                    ...state,
                    currentTimerState: TimerStates.TICK
                };
            case "PAUSE":
                return {
                    ...state,
                    currentTimerState: TimerStates.IDLE
                };
            case "DECREMENT_SECOND":
                currentCountdownTime = Math.max(
                    0,
                    state.currentCountdownTime - 1
                );

                if (currentCountdownTime === 0) {
                    if (state.currentMachineState === MachineStates.WORK) {
                        return reducer(state, {
                            type: "SWITCH_TO_BREAK"
                        });
                    } else {
                        return reducer(state, {
                            type: "SWITCH_TO_WORK"
                        });
                    }
                }

                return {
                    ...state,
                    timerRotation: (state.timerRotation + 6) % 360,
                    currentCountdownTime
                };

            case "RESET":
                return {
                    ...state,
                    currentCountdownTime:
                        state.currentMachineState === MachineStates.WORK
                            ? state.sessionDuration
                            : state.breakDuration,
                    currentTimerState: TimerStates.IDLE
                }

            default:
                return { ...state };
        }
    };

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useInterval(
        (): void => {
            dispatch({ type: "DECREMENT_SECOND" });
        },
        state.currentTimerState === TimerStates.TICK ? 1000 : null
    );

    const startOrStop = (): void => {
        if (state.currentTimerState === TimerStates.IDLE) {
            dispatch({ type: "START" });
        } else {
            dispatch({ type: "PAUSE" });
        }
    };

    const reset = (): void => {
        dispatch({ type: "RESET" });
    };

    return (
        <div class={style.home}>
            <div class={style.container}>
                <Header />
                <div class={style.statusLabel}>
                    {state.currentMachineState === MachineStates.WORK
                        ? "📌 WERK"
                        : "💆🏻‍♀️ CHILL"}
                </div>
                <Timer
                    timerRotation={state.timerRotation}
                    currentCountdownTime={state.currentCountdownTime}
                    isBreak={state.currentMachineState === MachineStates.BREAK}
                />
                <div class={style.sessionCountLabel}>
                    {`${state.totalWorkSessions} ${
                        state.totalWorkSessions > 1 ? "sessions" : "session"
                    } completed`}
                </div>
                <div class={style.buttonContainer}>
                    <button
                        onClick={startOrStop}
                        class={style.startStopButton}
                        autoFocus
                    >
                        {state.currentTimerState === TimerStates.IDLE
                            ? "START"
                            : "PAUSE"}
                    </button>
                    <button onClick={reset} class={style.resetButton} autoFocus>
                        RESET
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;

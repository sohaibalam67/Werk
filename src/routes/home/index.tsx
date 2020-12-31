import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";

import * as style from "./style.css";

// Circle dots calculation
// C = 2πr
// r = 130, therefore C = 816.81
// Now we need 60 dots on C, so spacing between each dot is C/60 => 13.6135

const Home: FunctionalComponent = () => {
    const [degree, setDegree] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDegree((degree + 6) % 360);
        }, 1000);

        return () => {
            timer && clearInterval(timer);
        };
    }, [degree]);

    return (
        <div class={style.home}>
            <div class={style.container}>
                <div class={style.timerContainer}>
                    <svg width="360" height="360">
                        <circle
                            style={{
                                transform: `rotate(${degree}deg)`,
                                transformOrigin: "center center",
                                transition: "200ms"
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
                            y1="200"
                            x2="180"
                            y2="300"
                            stroke="red"
                            // eslint-disable-next-line react/no-unknown-property
                            stroke-width="3"
                            // eslint-disable-next-line react/no-unknown-property
                            stroke-linecap="round"
                        />
                    </svg>
                    <span class={style.time}>25:00</span>
                </div>
            </div>
        </div>
    );
};

export default Home;

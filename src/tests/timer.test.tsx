import { h } from "preact";
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from "enzyme";
import Timer from "../components/timer";

describe("Initial Test of the Timer", () => {
    test("Timer renders the clock svg and time label", () => {
        const wrapper = shallow(
            <Timer
                timerRotation={0}
                currentCountdownTime={25 * 60}
                isBreak={false}
            />
        );
        expect(wrapper.find("svg")).toHaveLength(1);
        expect(wrapper.find("#time").html()).toContain("25:00");
    });
});

import { h } from "preact";
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from "enzyme";
import Home from "../routes/home";
import Header from "../components/header";
import Timer from "../components/timer";

describe("Initial Test of the Home", () => {
    test("Home renders the Header and Timer", () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find(Header)).toHaveLength(1);
        expect(wrapper.find(Timer)).toHaveLength(1);
    });
});

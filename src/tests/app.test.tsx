import { h } from "preact";
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from "enzyme";
import App from "../components/app";
import Home from "../routes/home";

describe("Initial Test of the App", () => {
    test("App renders the Home component", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Home)).toHaveLength(1);
    });
});

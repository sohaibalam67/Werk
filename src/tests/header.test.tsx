import { h } from "preact";
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from "enzyme";
import Header from "../components/header";
import Logo from "../assets/logo";

describe("Initial Test of the Header", () => {
    test("Header renders the logo", () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find(Logo)).toHaveLength(1);
    });
});

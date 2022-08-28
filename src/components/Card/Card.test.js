import { shallow } from "enzyme";
import Card from './index';

it("renders without crashing without header", () => {
    shallow( <Card hideHeader>ok</Card>);
  });
  
  it("renders with header", () => {
    const wrapper = shallow( <Card title="Henlo">ok</Card>);
    const welcome = "Henlo";
    expect(wrapper.contains(welcome)).toEqual(true);
  });
  
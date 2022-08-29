import { shallow } from "enzyme";
import Card from './index';

it("renders without crashing without header", () => {
    const props = {
      hideHeader:true,
    }
    shallow( <Card {...props}>ok</Card>);
  });
  
  it("renders with header title", () => {
    const props = {
      title:"Hi Card",
    }
    const wrapper = shallow( <Card {...props}>ok</Card>);
    const title = "Hi Card";
    expect(wrapper.contains(title)).toEqual(true);
  });
  
  it("renders with loading", () => {
    const props = {
      title:"Hi Card",
      loading: true
    }
    const wrapper = shallow( <Card {...props}>ok</Card>);
    expect(wrapper.hasClass('isLoading')).toEqual(true);
  });
  
import {shallow} from 'enzyme'
import Tabs from './index';

it("renders with options", function() {
    let options = [
        {tabName:"foo",content:"example"},
        {tabName:"bar",content:"example bar"}
    ]

    let wrapper = shallow(<Tabs options={options} />)

    expect(wrapper.text()).toContain('foo');

});

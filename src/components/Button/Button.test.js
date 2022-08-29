// import React from 'react';
import { shallow } from "enzyme";
import Button from "./index";


it("renders with primary type with click event", ()=> {
    const mockCallBack = jest.fn();
    const wrapper = shallow((<Button onClick={mockCallBack}>Click</Button>))
    wrapper.find('button').simulate('click');
    const primaryClassName = wrapper.find('.rnd-btn');



    expect(mockCallBack.mock.calls.length).toEqual(1);
    expect(primaryClassName.length).toBe(1);
})
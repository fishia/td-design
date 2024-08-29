import { shallow } from 'enzyme';
import React from 'react';
// import type { TdButtonProps } from '../index';
import TdButton from '../index';

describe('Button component', () => {
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = shallow(
      <TdButton type="link" href="https://www.baidu.com">
        Link
      </TdButton>,
    );
    const element = wrapper.first();

    expect(element.name()).toEqual('a');
    expect(element).toHaveProperty('class', 'career-btn career-btn-link');
  });

  it('should render disabled button when disabled set to true', () => {
    const wrapper = shallow(<TdButton disabled>Disabled Button</TdButton>);
    const element = wrapper.find('button');

    expect(element.prop('disabled')).toBeTruthy();
    element.simulate('click');
  });

  it('should not render as link button when href is undefined', async () => {
    const wrapper = shallow(
      <TdButton type="link" href={undefined}>
        button
      </TdButton>,
    );

    expect(wrapper.find('a').exists()).toBeFalsy();
    expect(wrapper.find('button').exists()).toBeTruthy();
  });
});

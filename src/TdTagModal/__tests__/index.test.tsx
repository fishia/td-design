import { shallow } from 'enzyme';
import React from 'react';
import TdTagModal from '../TdTagModal';

describe('TagModal component', () => {
  it('should render to be true', () => {
    const wrapper = shallow(<TdTagModal title="测试" className="TdTagModal" />);

    const element = wrapper.first();

    // eslint-disable-next-line jest/valid-expect
    expect(element).toHaveProperty('class', 'TdTagModal');
  });
});

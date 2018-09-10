import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// import ReactTestUtils from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import should from 'should';
import sinon from 'sinon';
import 'should-sinon';

import { Login }from './../../imports/ui/Login';


if (Meteor.isClient) {

  describe('Login', function() {

    it('should show error message', function() {
      const error = 'The Error';
      const wrapper = mount(<BrowserRouter><Login loginWithPassword={() => {}} redirect="/" /></BrowserRouter>)

      wrapper.find(Login).instance().setState({error});
      wrapper.update();
      wrapper.find('Alert').text().should.be.eql(error);
    });

    it('should call loginWithPassword with the form data', function() {
      const email = 'test@test.com';
      const password = '1234567890';
      const spy = sinon.spy();

      const wrapper = mount(<BrowserRouter><Login loginWithPassword={spy} redirect="/" /></BrowserRouter>);

      const inputNodes = wrapper.find('input');

      inputNodes.find({type: "email"}).instance().value = email;
      inputNodes.find({type: "password"}).instance().value = password;

      wrapper.find('form').simulate('submit');
      spy.should.be.calledWith({email}, password);
    });

    it('should set loginWithPassword callback errors', function() {
      const spy = sinon.spy();
      const reason = 'fuck you, that\'s why';
      const wrapper = mount(<BrowserRouter><Login loginWithPassword={spy} redirect="/" /></BrowserRouter>);

      wrapper.find('form').simulate('submit');

      spy.args[0][2]({reason});
      wrapper.find(Login).instance().state.error.should.be.eql(reason);

      spy.args[0][2]();
      wrapper.find(Login).instance().state.error.should.be.eql('');
    });

  });
}


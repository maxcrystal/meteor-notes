import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// import ReactTestUtils from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import should from 'should';
import sinon from 'sinon';
import 'should-sinon';

import { Signup }from './../../imports/ui/Signup';


if (Meteor.isClient) {

  describe('Signup', function() {

    it('should show error message', function() {
      const error = 'The Error';
      const wrapper = mount(<BrowserRouter><Signup createUser={() => {}} redirect="/" /></BrowserRouter>)

      wrapper.find(Signup).instance().setState({error});
      wrapper.update();
      wrapper.find('Alert').text().should.be.eql(error);
    })

    it('should call createUser with the form data', function() {
      const email = 'test@test.com';
      const password = '1234567890';
      const spy = sinon.spy();

      const wrapper = mount(<BrowserRouter><Signup createUser={spy} redirect="/" /></BrowserRouter>);

      const inputNodes = wrapper.find('input');

      inputNodes.find({type: "email"}).instance().value = email;
      inputNodes.find({type: "password"}).instance().value = password;

      wrapper.find('form').simulate('submit');
      spy.should.be.calledWith({email, password});
    });

    it('should set error if short password provided', function() {
      const email = 'test@test.com';
      const password = '123';
      const spy = sinon.spy();

      const wrapper = mount(<BrowserRouter><Signup createUser={spy} redirect="/" /></BrowserRouter>);

      const inputNodes = wrapper.find('input');

      inputNodes.find({type: "email"}).instance().value = email;
      inputNodes.find({type: "password"}).instance().value = password;

      wrapper.find('form').simulate('submit');
      wrapper.find(Signup).instance().state.error.should.not.be.eql('');
    });

    it('should set createUser callback errors', function() {
      const spy = sinon.spy();
      const password = '1234567890';
      const reason = 'fuck you, that\'s why';

      const wrapper = mount(<BrowserRouter><Signup createUser={spy} redirect="/" /></BrowserRouter>);

      const inputNodes = wrapper.find('input');
      inputNodes.find({type: "password"}).instance().value = password;

      wrapper.find('form').simulate('submit');

      spy.args[0][1]({reason});
      wrapper.find(Signup).instance().state.error.should.be.eql(reason);

      spy.args[0][1]();
      wrapper.find(Signup).instance().state.error.should.be.eql('');
    }); 

  });
}


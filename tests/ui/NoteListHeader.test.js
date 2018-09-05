import { Meteor } from 'meteor/meteor';
import React from 'react';
import moment from 'moment';

import { mount } from 'enzyme';
import should from 'should';
import sinon from 'sinon';
import 'should-sinon';

import { NoteListHeader } from './../../imports/ui/NoteListHeader';


if (Meteor.isClient) {

  describe('NoteListHeader', function() {
    it('should call meteorCall on click', function() {
      const spy = sinon.spy();
      const wrapper = mount(<NoteListHeader meteorCall={spy} />);

      wrapper.find('button').simulate('click');
      spy.should.be.calledWith('notes.insert');
    });

  });
}

import { Meteor } from 'meteor/meteor';
import React from 'react';
import moment from 'moment';

import { mount } from 'enzyme';
import should from 'should';
import sinon from 'sinon';
import 'should-sinon';

import NoteListItem from './../../imports/ui/NoteListItem';


if (Meteor.isClient) {

  describe('NoteList', function() {
    it('should render title and timestamp', function() {
      const title = 'The Title';
      const updatedAt = new Date().getTime();
      
      const wrapper = mount(<NoteListItem note={{title, updatedAt}} />);

      wrapper.find('h5').text().should.be.eql(title);
      wrapper.find('p').text().should.be.eql(moment(updatedAt).format('D.MM.Y'));
    });

    it('should render default title if not provided', function() {
      const updatedAt = new Date().getTime();
      
      const wrapper = mount(<NoteListItem note={{updatedAt}} />);

      wrapper.find('h5').text().should.be.eql('Untitled');
      wrapper.find('p').text().should.be.eql(moment(updatedAt).format('D.MM.Y'));
    });

  });
}

